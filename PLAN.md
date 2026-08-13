# Perchance as a Service

> Enterprise-grade uncertainty over HTTP.

## The idea

**Perchance as a Service** is an intentionally over-engineered API whose only job is to say “maybe.”

The name carries both jokes:

- *Perchance* means “perhaps” or “maybe.”
- **PaaS** already means “Platform as a Service.”

This project is inspired by the simplicity and tone of [No-as-a-Service](https://github.com/hotheadhacker/no-as-a-service). It is unofficial and is not affiliated with Perchance.org.

## Product principle

Keep it tiny. The joke gets weaker as the feature list grows.

Version 1 should have one useful endpoint, one flat JSON corpus, a small server, and a disproportionately serious README. It does not need accounts, a database, an LLM, a generator language, categories, templates, or user-created content.

## API

### `GET /maybe`

Returns one random way to say “maybe.”

```json
{
  "answer": "Perchance."
}
```

Example responses:

- “Maybe.”
- “Perhaps.”
- “Perchance.”
- “Conceivably.”
- “There is a non-zero chance.”
- “Ask again when causality settles down.”
- “The committee has declined to commit.”
- “Signs point ambiguously.”

### Supporting routes

| Endpoint | Purpose |
| --- | --- |
| `GET /` | Tiny landing page and API documentation. |
| `GET /maybe` | Return a random maybe. |
| `GET /healthz` | Deployment health check. |

Return JSON by default. A `?format=text` option is acceptable if it remains trivial to implement.

## Optional jokes

These are garnish, not MVP requirements:

- Make `GET /definitely` return `404 Not Found`.
- Make `GET /yes` and `GET /no` redirect to `/maybe`.
- Occasionally return “It depends.”
- Report uptime as “probably operational” on the landing page.

Do not let gag endpoints complicate the API.

## Implementation

Use a small TypeScript web service with a React landing page and Cloudflare-compatible route handlers. This keeps local development simple and makes the same code straightforward to publish later:

```text
perchance-as-a-service/
├── maybes.json
├── app/
│   ├── page.tsx
│   ├── maybe/route.ts
│   ├── healthz/route.ts
│   └── definitely/route.ts
├── package.json
├── Dockerfile
├── README.md
└── LICENSE
```

The server should:

1. Load and validate `maybes.json` at startup.
2. Select one entry uniformly at random.
3. Return `{ "answer": "..." }` from `/maybe`.
4. Enable CORS.
5. Apply Cloudflare's native per-client edge rate limit (120 requests per minute).
6. Serve an interactive landing page from `/`.
7. Expose `/healthz` for deployments.

## Content

Start with 100–250 hand-written responses in one flat JSON array:

```json
[
  "Maybe.",
  "Perhaps.",
  "Perchance.",
  "There is a non-zero chance.",
  "The committee has declined to commit."
]
```

The writing should range from plain synonyms to unnecessarily elaborate evasions. Keep entries short, broadly usable, and safe to display anywhere. The corpus is the main creative work of the project.

## README voice

The README should treat indecision as mission-critical infrastructure.

Suggested opening:

> Ever needed a scalable, cloud-native way to avoid making a decision?
> Perchance as a Service provides enterprise-grade uncertainty over HTTP.

It should include:

- A one-command `curl` example near the top.
- The hosted base URL when available.
- JavaScript and Python examples.
- Rate-limit details.
- Local development and Docker instructions.
- A short contribution guide for adding new maybes.
- A fake testimonial or two, clearly presented as jokes.

## Build plan

### 1. Core service

- Create the Express server.
- Add `/maybe`, `/healthz`, and `/`.
- Add CORS and rate limiting.
- Add an initial corpus of at least 100 responses.

### 2. Verification

- Lint and type-check the source.
- Produce a clean production build.
- Run the service locally and exercise its routes with `curl`.

### 3. Packaging

- Add a minimal Dockerfile.
- Add a checked-in Wrangler configuration and generated binding types.
- Add an MIT license and credit No-as-a-Service as inspiration.
- Add contribution and private security-reporting guidance for the public repository.
- Write the README in the mock-enterprise voice.

### 4. Release

- Deploy the API at `https://perchance.synopsys0.workers.dev`.
- Add the live base URL to the README and landing page.
- Enable GitHub private vulnerability reporting before making the repository public.
- Publish the repository with a short demo GIF or terminal recording if useful.

## Definition of done for v1

- `curl https://<host>/maybe` returns a valid, amusing answer in under a second.
- The project starts with `npm start` and runs in Docker.
- The API has no runtime dependency on a database or external AI service.
- Invalid routes return consistent JSON errors.
- A contributor can add a response by editing only `maybes.json`.
- Lint, type checking, and the production build pass.
- The README explains the entire joke and shows a working request in its first screen.

## Scope guardrail

If a proposed feature does not make the phrase “maybe as a service” funnier or the single endpoint easier to use, leave it out.
