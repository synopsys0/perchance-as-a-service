type TestGlobal = typeof globalThis & {
  __PERCHANCE_RATE_LIMIT_ALLOWED__?: () => boolean;
};

const testGlobal = globalThis as TestGlobal;

// The Cloudflare Vite plugin checks these runtime exports while bundling.
export class WorkerEntrypoint {}
export class DurableObject {}
export class WorkflowEntrypoint {}

export const env = {
  MAYBE_RATE_LIMITER: {
    async limit(): Promise<{ success: boolean }> {
      return { success: testGlobal.__PERCHANCE_RATE_LIMIT_ALLOWED__?.() ?? true };
    },
  },
};
