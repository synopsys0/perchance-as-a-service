/**
 * Validate the response corpus before it reaches either CI or the Worker.
 *
 * @param {unknown} value
 * @returns {asserts value is string[]}
 */
export function validateCorpus(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("maybes.json must contain a non-empty array");
  }

  const seen = new Set();
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
