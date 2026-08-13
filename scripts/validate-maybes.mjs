import { readFile } from "node:fs/promises";
import { validateCorpus } from "../app/lib/validate-corpus.js";

const corpusUrl = new URL("../maybes.json", import.meta.url);
const corpus = JSON.parse(await readFile(corpusUrl, "utf8"));

validateCorpus(corpus);
console.log(`Validated ${corpus.length} unique maybes.`);
