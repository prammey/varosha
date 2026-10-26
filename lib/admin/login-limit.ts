// Defense in depth for a single server process. Production must also have an
// edge/firewall login rate limit: this counter is not distributed across Vercel.
let attempts = 0;
let windowEnds = 0;
export function allowLoginAttempt(now = Date.now()) {
  if (now >= windowEnds) { attempts = 0; windowEnds = now + 15 * 60 * 1000; }
  return ++attempts <= 30;
}
