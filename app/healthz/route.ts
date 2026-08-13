import { apiHeaders, corsPreflight } from "../lib/cors";

export function OPTIONS() {
  return corsPreflight();
}

export function GET() {
  return Response.json(
    { status: "probably operational" },
    { headers: apiHeaders({ "Cache-Control": "no-store" }) },
  );
}
