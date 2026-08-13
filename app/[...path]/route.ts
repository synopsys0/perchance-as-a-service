import { apiHeaders, corsPreflight } from "../lib/cors";

function notFound() {
  return Response.json(
    { error: "No such certainty exists." },
    { status: 404, headers: apiHeaders({ "Cache-Control": "no-store" }) },
  );
}

export function OPTIONS() {
  return corsPreflight();
}

export const GET = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
