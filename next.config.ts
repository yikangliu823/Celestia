import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep instruction files under explicit control for the Issue #3 experiment.
  agentRules: false,
};

export default nextConfig;
