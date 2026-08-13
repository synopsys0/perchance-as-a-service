export function GET() {
  return Response.json(
    { status: "probably operational" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
