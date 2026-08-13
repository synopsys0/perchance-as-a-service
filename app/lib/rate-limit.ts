import { env } from "cloudflare:workers";

export function clientKey(request: Request): string {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "local";
}

export async function checkRateLimit(request: Request): Promise<boolean> {
  const result = await env.MAYBE_RATE_LIMITER.limit({ key: clientKey(request) });
  return result.success;
}
