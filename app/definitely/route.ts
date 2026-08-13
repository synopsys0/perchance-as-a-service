export function GET() {
  return Response.json(
    { error: "Certainty not found." },
    { status: 404 },
  );
}
