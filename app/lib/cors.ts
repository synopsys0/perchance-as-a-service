const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
} satisfies Record<string, string>;

export function apiHeaders(initial?: HeadersInit): Headers {
  const headers = new Headers(initial);
  for (const [name, value] of Object.entries(corsHeaders)) {
    headers.set(name, value);
  }
  return headers;
}

export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: apiHeaders() });
}
