import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // stop next dev from writing AGENTS.md / CLAUDE.md into the repo
  agentRules: false,
  // Old Wix URLs keep working once varosha.org points here.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/services-2", destination: "/scholarship", permanent: true },
      { source: "/members", destination: "/team", permanent: true },
      { source: "/support-us", destination: "/support", permanent: true },
      { source: "/projects-8", destination: "/events", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/copy-of-terms-conditions", destination: "/privacy", permanent: true },
      { source: "/accessibility-statement", destination: "/accessibility", permanent: true },
    ];
  },
};

export default nextConfig;
