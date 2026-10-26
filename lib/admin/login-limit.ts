// Defense in depth for a single server process. The Vercel project also limits
// POST /admin/login to 20 requests per IP per 10 minutes at the firewall.
// This in-process counter is additional protection, not a distributed counter.
let attempts = 0;
let windowEnds = 0;
export function allowLoginAttempt(now = Date.now()) {
  if (now >= windowEnds) { attempts = 0; windowEnds = now + 15 * 60 * 1000; }
  return ++attempts <= 30;
}
