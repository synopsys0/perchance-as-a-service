import corpus from "@/maybes.json";
import { validateCorpus } from "./validate-corpus.js";

validateCorpus(corpus);

export const maybes: readonly string[] = Object.freeze([...corpus]);

export function pickMaybe(random: () => number = Math.random): string {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError("Random source must return a number from 0 up to, but not including, 1");
  }
  return maybes[Math.floor(value * maybes.length)];
}
