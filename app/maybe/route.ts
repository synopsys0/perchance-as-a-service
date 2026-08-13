import { pickMaybe } from "../lib/maybes";
import { checkRateLimit } from "../lib/rate-limit";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: Request) {
  const allowed = await checkRateLimit(request);
  const headers = {
    ...corsHeaders,
    "Cache-Control": "no-store",
  };

  if (!allowed) {
    return Response.json(
      { error: "Too many possibilities. Please remain uncertain for a moment." },
      {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": "60",
        },
      },
    );
  }

  const format = new URL(request.url).searchParams.get("format") ?? "json";
  if (format !== "json" && format !== "text") {
    return Response.json(
      { error: "Unsupported format. The possibilities are json and text." },
      { status: 400, headers },
    );
  }

  const answer = pickMaybe();
  if (format === "text") {
    return new Response(`${answer}\n`, {
      headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return Response.json({ answer }, { headers });
}
