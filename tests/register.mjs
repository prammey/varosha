// Test-only loader: transpile TypeScript and replace Next request context with a
// controlled cookie jar. Nothing here is imported by the website or production.
import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
const root = fileURLToPath(new URL('../', import.meta.url));
const virtual = {
  'server-only': 'export {};',
  'next/headers': `export async function cookies(){ return {get:(k)=>globalThis.__testCookies?.get(k),set:(k,v,o)=>{globalThis.__testCookies?.set(k,{value:v,options:o})},delete:(k)=>globalThis.__testCookies?.delete(k)};}`,
  'next/navigation': `export { unstable_rethrow } from '${import.meta.resolve('next/dist/client/components/unstable-rethrow.js')}'; export function redirect(path){throw new Error('REDIRECT:'+path)}`,
  'next/cache': `export function revalidatePath(path){globalThis.__testRevalidations?.push(path)}`,
};
registerHooks({
  resolve(specifier, context, next) {
    if (virtual[specifier]) return {url:'data:text/javascript,'+encodeURIComponent(virtual[specifier]),shortCircuit:true};
    let file = specifier.startsWith('@/') ? root+specifier.slice(2) : specifier.startsWith('.') && context.parentURL?.startsWith('file:') ? fileURLToPath(new URL(specifier,context.parentURL)) : null;
    if(file) for(const candidate of [file,file+'.ts',file+'/index.ts']) if(candidate.endsWith('.ts') && existsSync(candidate)) return {url:pathToFileURL(candidate).href,shortCircuit:true};
    return next(specifier,context);
  },
  load(url,context,next) {
    if(url.startsWith('file:') && url.endsWith('.ts')) return {format:'module',source:ts.transpileModule(readFileSync(fileURLToPath(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText,shortCircuit:true};
    return next(url,context);
  },
});
