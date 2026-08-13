import { apiHeaders, corsPreflight } from "../lib/cors";
import { pickMaybe } from "../lib/maybes";
import { checkRateLimit } from "../lib/rate-limit";

export function OPTIONS() {
  return corsPreflight();
}

export async function GET(request: Request) {
  const allowed = await checkRateLimit(request);
  const headers = apiHeaders({ "Cache-Control": "no-store" });

  if (!allowed) {
    return Response.json(
      { error: "Too many possibilities. Please remain uncertain for a moment." },
      {
        status: 429,
        headers: apiHeaders({
          "Cache-Control": "no-store",
          "Retry-After": "60",
        }),
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
      headers: apiHeaders({
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      }),
    });
  }

  return Response.json({ answer }, { headers });
}
