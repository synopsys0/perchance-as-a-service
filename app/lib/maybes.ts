import corpus from "@/maybes.json";

function validateCorpus(value: unknown): asserts value is string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("maybes.json must contain a non-empty array");
  }

  const seen = new Set<string>();
  for (const entry of value) {
    if (typeof entry !== "string" || entry.trim().length === 0) {
      throw new Error("Every maybe must be a non-empty string");
    }
    if (entry.length > 280) {
      throw new Error(`Maybe exceeds 280 characters: ${entry}`);
    }
    if (seen.has(entry)) {
      throw new Error(`Duplicate maybe: ${entry}`);
    }
    seen.add(entry);
  }
}

validateCorpus(corpus);

export const maybes: readonly string[] = Object.freeze([...corpus]);

export function pickMaybe(random: () => number = Math.random): string {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError("Random source must return a number from 0 up to, but not including, 1");
  }
  return maybes[Math.floor(value * maybes.length)];
}
