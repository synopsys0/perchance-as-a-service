import { apiHeaders, corsPreflight } from "../lib/cors";

export function OPTIONS() {
  return corsPreflight();
}

export function GET() {
  return Response.json(
    { error: "Certainty not found." },
    { status: 404, headers: apiHeaders({ "Cache-Control": "no-store" }) },
  );
}
