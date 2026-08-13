import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

let rateLimitAllowed = true;
globalThis.__PERCHANCE_RATE_LIMIT_ALLOWED__ = () => rateLimitAllowed;

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

function request(path, { headers = {}, method = "GET" } = {}) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      method,
      headers: { accept: "application/json", ...headers },
    }),
    env,
    context,
  );
}

test("the corpus contains unique, bounded strings", async () => {
  const raw = await readFile(new URL("../maybes.json", import.meta.url), "utf8");
  const maybes = JSON.parse(raw);

  assert.ok(Array.isArray(maybes));
  assert.ok(maybes.length >= 100);
  assert.ok(maybes.length <= 250);
  assert.equal(new Set(maybes).size, maybes.length);

  for (const maybe of maybes) {
    assert.equal(typeof maybe, "string");
    assert.ok(maybe.trim().length > 0);
    assert.ok(maybe.length <= 280);
  }
});

test("server-renders the finished landing page", async () => {
  const response = await request("/", { headers: { accept: "text/html" } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Perchance as a Service<\/title>/i);
  assert.match(html, /Enterprise-grade uncertainty over HTTP/i);
  assert.match(html, /One endpoint\. Zero commitments\./i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("GET /maybe returns a maybe with public CORS headers", async () => {
  const response = await request("/maybe", {
    headers: { "cf-connecting-ip": "192.0.2.10" },
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.equal(response.headers.get("cache-control"), "no-store");

  const body = await response.json();
  assert.deepEqual(Object.keys(body), ["answer"]);
  assert.equal(typeof body.answer, "string");
  assert.ok(body.answer.length > 0);
});

test("GET /maybe supports plain text", async () => {
  const response = await request("/maybe?format=text", {
    headers: { "cf-connecting-ip": "192.0.2.11" },
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.ok((await response.text()).trim().length > 0);
});

test("GET /maybe rejects unknown formats", async () => {
  const response = await request("/maybe?format=crystal-ball", {
    headers: { "cf-connecting-ip": "192.0.2.12" },
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Unsupported format/);
});

test("OPTIONS /maybe advertises CORS support", async () => {
  const response = await request("/maybe", { method: "OPTIONS" });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.match(response.headers.get("access-control-allow-methods") ?? "", /GET/);
});

test("GET /healthz is probably operational", async () => {
  const response = await request("/healthz");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "probably operational" });
});

test("GET /definitely cannot locate certainty", async () => {
  const response = await request("/definitely");
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Certainty not found." });
});

test("unknown routes return JSON errors", async () => {
  const response = await request("/absolutely-not-a-route");
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "No such certainty exists." });
});

test("GET /maybe applies its per-client rate limit", async () => {
  rateLimitAllowed = false;
  try {
    const limited = await request("/maybe", {
      headers: { "cf-connecting-ip": "198.51.100.42" },
    });
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get("retry-after"), "60");
  } finally {
    rateLimitAllowed = true;
  }
});
