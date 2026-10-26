import { test, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SanityStore } from '../lib/data/sanity-store.ts';
import { getStore } from '../lib/data/store.ts';
import { validSession, sessionValue, passwordConfigured, passwordMatches } from '../lib/admin/password.ts';
import { validateUpload, MAX_UPLOAD_BYTES } from '../lib/admin/uploads.ts';
import { assertLink } from '../lib/data/validation.ts';
import * as actions from '../app/admin/actions.ts';
const baseline = JSON.parse(readFileSync(new URL('../data/site-data.json',import.meta.url),'utf8'));
const savedFetch = globalThis.fetch;
const savedEnv = { ...process.env };
let docs, calls, revision;
beforeEach(() => {
  Object.assign(process.env,{NODE_ENV:'test',CONTENT_STORAGE:'sanity',SANITY_PROJECT_ID:'testproject',SANITY_DATASET:'test',SANITY_API_TOKEN:'not-a-real-token',ADMIN_PASSWORD:'only-a-test-password',ADMIN_SESSION_SECRET:'only-a-test-secret-longer-than-32-characters'});
  docs = new Map(); calls = []; revision=0;
  globalThis.__testCookies = new Map(); globalThis.__testRevalidations=[];
  globalThis.fetch=async(url,init)=>{
    calls.push({url,init});
    if(url.includes('/data/query/')) return Response.json({result:[...docs.values()]});
    if(url.includes('/assets/')) return Response.json({document:{url:`https://cdn.sanity.io/${url.includes('/images/')?'images':'files'}/testproject/test/test-asset.${url.includes('/images/')?'png':'pdf'}`}});
    const mutation=JSON.parse(init.body).mutations[0];
    let doc;
    if(mutation.create) {
      if(docs.has(mutation.create._id)) return Response.json({}, {status:409});
      doc={...mutation.create};
    } else {
      const {id,ifRevisionID,set}=mutation.patch;
      const current=docs.get(id);
      if(!current || current._rev!==ifRevisionID) return Response.json({}, {status:409});
      doc={...current,...set};
    }
    doc._rev=`revision-${++revision}`; docs.set(doc._id,doc);
    return Response.json({results:[{document:doc}]});
  };
});
after(()=>{globalThis.fetch=savedFetch; process.env=savedEnv;});
function authenticate() { globalThis.__testCookies.set('varosha_admin',{value:sessionValue()}); }
function form(fields) {const fd=new FormData(); for(const [k,v] of Object.entries(fields)) fd.set(k,v); return fd;}
test('unedited sections retain actual current JSON; every query bypasses caches',async()=>{
  const store=new SanityStore(); const snapshot=await store.snapshot();
  assert.deepEqual(snapshot.data,baseline);
  assert.match(snapshot.revisions.site,/^initial-/);
  assert.equal(calls[0].init.cache,'no-store');
  assert.match(calls[0].url,/\.api\.sanity\.io/); assert.doesNotMatch(calls[0].url,/apicdn/);
});
test('publishes a section, preserves other sections, and a fresh store reads it',async()=>{
  const store=new SanityStore();const first=await store.snapshot();
  const site={...first.data.site,phone:'test phone'};
  const rev=await store.writeSite(site,first.revisions.site);
  const next=await new SanityStore().snapshot();
  assert.equal(next.data.site.phone,'test phone');assert.equal(next.revisions.site,rev);
  assert.deepEqual(next.data.projects,baseline.projects);
  assert.match(calls.find(c=>c.url.includes('/data/mutate/')).url,/visibility=sync/);
});
test('stale browser revision is rejected before uploading or writing',async()=>{
  authenticate();const store=new SanityStore();const before=await store.snapshot();
  await store.writeScholarship({...before.data.scholarship,deadline:'new value'},before.revisions.scholarship);
  const result=await actions.saveScholarship(null,form({revision:before.revisions.scholarship,deadline:'stale value',applyUrl:baseline.scholarship.applyUrl}));
  assert.equal(result.ok,false);assert.match(result.message,/changed since/);
  assert.equal((await store.read()).scholarship.deadline,'new value');
});
test('patch uses CAS; changes between read and mutation reject atomically',async()=>{
  const store=new SanityStore();let snap=await store.snapshot();
  await store.writeSite(snap.data.site,snap.revisions.site);snap=await store.snapshot();
  const fetchBefore=globalThis.fetch;
  globalThis.fetch=(url,init)=>{if(url.includes('/data/mutate/')) docs.get('varosha.site')._rev='raced-revision';return fetchBefore(url,init);};
  await assert.rejects(store.writeSite({...snap.data.site,phone:'lost edit'},snap.revisions.site),/changed since/);
  assert.equal(docs.get('varosha.site')._rev,'raced-revision');
});
test('concurrent first publication uses create, never unconditional replacement',async()=>{
  const store=new SanityStore();const snap=await store.snapshot();
  const result=await Promise.allSettled([store.writeSite(snap.data.site,snap.revisions.site),store.writeSite(snap.data.site,snap.revisions.site)]);
  assert.equal(result.filter(r=>r.status==='fulfilled').length,1);
  assert.equal(result.filter(r=>r.status==='rejected').length,1);
});
test('an explicitly empty collection remains empty, rather than resurrecting seed content',async()=>{
  const store=new SanityStore();const snap=await store.snapshot();
  await store.writeCollection('projects',[],snap.revisions.projects);
  assert.deepEqual((await new SanityStore().read()).projects,[]);
});
test('bad credentials and outages do not silently fall back or reveal response secrets',async()=>{
  for(const status of [401,403,429,500]){
    globalThis.fetch=async()=>new Response('private-server-information',{status});
    await assert.rejects(new SanityStore().read(),e=>!e.message.includes('private-server-information'));
  }
});
test('damaged stored content fails visibly',async()=>{
  docs.set('varosha.site',{_id:'varosha.site',_rev:'bad',content:'{broken'});
  await assert.rejects(new SanityStore().read(),/damaged/);
});
test('missing Sanity configuration fails closed, without local fallback',async()=>{
  delete process.env.SANITY_API_TOKEN;
  await assert.rejects(getStore(),/not configured/);
});
test('every content action rejects missing or forged sessions before accessing storage',async()=>{
  for(const cookie of [undefined,'admin:NaN:forged','admin:9999999999999:wrong']){
    if(cookie)globalThis.__testCookies.set('varosha_admin',{value:cookie});else globalThis.__testCookies.clear();
    for(const name of ['saveProject','savePerson','saveNewsletter','saveEvent','saveScholarship','saveSite']) await assert.rejects(actions[name](null,new FormData()),/REDIRECT:\/admin\/login/);
    await assert.rejects(actions.saveListState('projects',[],''),/REDIRECT/);
    await assert.rejects(actions.deleteItem('projects','x',''),/REDIRECT/);
  }
  assert.equal(calls.length,0);
});
test('production password configuration, session tampering, expiry and credential rotation',()=>{
  const env={...process.env,NODE_ENV:'production'};
  assert.equal(passwordConfigured(env),true);
  assert.equal(passwordConfigured({...env,ADMIN_PASSWORD:'short'}),false);
  const shortEnv={...env,ADMIN_PASSWORD:'testpass'};
  assert.equal(passwordConfigured(shortEnv),true);
  assert.equal(passwordMatches('testpass',shortEnv),true);
  assert.equal(validSession(sessionValue(1000000000000,shortEnv),1000000000000,shortEnv),true);
  assert.equal(passwordConfigured({...env,ADMIN_SESSION_SECRET:''}),false);
  assert.equal(passwordMatches(env.ADMIN_PASSWORD,env),true);
  const now=Date.now(),token=sessionValue(now,env);
  assert.equal(validSession(token,now,env),true);
  for(const malformed of [token+'x',token+':extra',token.replace(/\d{13}/,'NaN'),token.replace(/\d{13}/,'9999999999999'),'admin:1234567890123:'+'é'.repeat(64)]) assert.equal(validSession(malformed,now,env),false);
  assert.equal(validSession(token,now+8*24*3600000,env),false);
  assert.equal(validSession(token,now,{...env,ADMIN_PASSWORD:'another-long-password'}),false);
  assert.equal(validSession(token,now,{...env,ADMIN_SESSION_SECRET:'a-completely-different-secret-longer-than-32'}),false);
});
test('image and PDF uploads use correct Sanity endpoints after auth; published URLs persist',async()=>{
  authenticate();const store=new SanityStore();let snap=await store.snapshot();
  const png=new File([Buffer.from('89504e470d0a1a0a00000000','hex')],'test.png',{type:'image/png'});
  const person=snap.data.people[0];
  const result=await actions.savePerson(null,form({revision:snap.revisions.people,id:person.id,name:person.name,role:person.role,bio:person.bio,photoFile:png}));
  assert.equal(result.ok,true);assert.match((await store.read()).people[0].photo,/cdn\.sanity\.io\/images/);
  snap=await store.snapshot();const pdf=new File(['%PDF-1.7\nTest fixture'],'test.pdf',{type:'application/pdf'});
  const newsletter=await actions.saveNewsletter(null,form({revision:snap.revisions.newsletters,year:'2099',pdfFile:pdf}));
  assert.equal(newsletter.ok,true);assert.match((await new SanityStore().read()).newsletters[0].file,/cdn\.sanity\.io\/files/);
  assert.deepEqual(globalThis.__testRevalidations,['/','/']);
});
test('image spoofing, SVG, oversized files and executable links are rejected',()=>{
  assert.throws(()=>validateUpload('image','image/png',Buffer.from('<svg/>')),/valid/);
  assert.throws(()=>validateUpload('image','image/svg+xml',Buffer.from('<svg/>')),/valid/);
  assert.throws(()=>validateUpload('pdf','application/pdf',new Uint8Array(MAX_UPLOAD_BYTES+1)),/3 MB/);
  for(const link of ['javascript:alert(1)','data:text/html,test','//evil.test']) assert.throws(()=>assertLink(link,true),/http/);
});
test('list ordering and visibility persist; stale deletes fail safely',async()=>{
  authenticate();const store=new SanityStore();const snap=await store.snapshot();
  const entries=[...snap.data.projects].reverse().map((p,i)=>({id:p.id,hidden:i===0}));
  const saved=await actions.saveListState('projects',entries,snap.revisions.projects);
  assert.equal(saved.ok,true);
  const next=await store.snapshot();assert.equal(next.data.projects[0].id,entries[0].id);assert.equal(next.data.projects[0].hidden,true);
  const stale=await actions.deleteItem('projects',entries[0].id,snap.revisions.projects);
  assert.equal(stale.ok,false);assert.equal((await store.read()).projects.length,baseline.projects.length);
  const removed=await actions.deleteItem('projects',entries[0].id,next.revisions.projects);
  assert.equal(removed.ok,true);assert.equal((await store.read()).projects.length,baseline.projects.length-1);
});
test('invalid collection names cannot write settings through list actions',async()=>{
  authenticate();const result=await actions.saveListState('site',[],'invalid');
  assert.equal(result.ok,false);assert.match(result.message,/Unknown/);
  assert.equal(calls.filter(c=>c.init.method==='POST').length,0);
});

test('temporary read outages retry safely; ambiguous writes are never retried',async()=>{
  const successfulFetch=globalThis.fetch;let failures=0;
  globalThis.fetch=(url,init)=>{
    if(url.includes('/data/query/') && failures++===0)throw new Error('temporary network problem');
    return successfulFetch(url,init);
  };
  const store=new SanityStore();const snap=await store.snapshot();assert.deepEqual(snap.data,baseline);
  let writes=0;
  globalThis.fetch=(url,init)=>{
    if(init.method==='POST'){writes++;throw new Error('ambiguous mutation timeout');}
    return successfulFetch(url,init);
  };
  await assert.rejects(store.writeSite(snap.data.site,snap.revisions.site),/Could not reach/);
  assert.equal(writes,1);
});

test('Next dynamic rendering signals pass through without network retries',async()=>{
  const signal = Object.assign(new Error('Dynamic server usage'), {digest:'DYNAMIC_SERVER_USAGE'});
  let attempts=0;
  globalThis.fetch=async()=>{attempts++;throw signal;};
  await assert.rejects(()=>new SanityStore().snapshot(),error=>error===signal);
  assert.equal(attempts,1);
});
