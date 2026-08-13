# Perchance as a Service

> Enterprise-grade uncertainty over HTTP.

Ever needed a scalable, cloud-native way to avoid making a decision? Perchance as a Service provides a carefully curated “maybe” through one tiny API.

```bash
curl https://perchance.synopsys0.workers.dev/maybe
```

```json
{
  "answer": "Perchance."
}
```

No account. No API key. No artificial intelligence. No commitment.

## API

### `GET /maybe`

Returns one random way to say “maybe.”

```http
GET /maybe HTTP/1.1
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"answer":"The committee has declined to commit."}
```

Pass `?format=text` for plain text:

```bash
curl 'https://perchance.synopsys0.workers.dev/maybe?format=text'
```

All responses include permissive CORS headers. The default rate limit is 120 requests per minute per client.

### `GET /healthz`

```json
{
  "status": "probably operational"
}
```

### `GET /definitely`

Returns `404`. Certainty is not available at this time.

## Usage

### JavaScript

```js
const response = await fetch("https://perchance.synopsys0.workers.dev/maybe");
const { answer } = await response.json();
console.log(answer);
```

### Python

```python
import requests

answer = requests.get(
    "https://perchance.synopsys0.workers.dev/maybe",
    timeout=5,
).json()["answer"]
print(answer)
```

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production-style local build:

```bash
npm run build
npm start
```

## Rate limiting

The public API uses Cloudflare's native edge rate limiter: 120 requests per minute per client. The limit is intentionally best-effort; this is indecision infrastructure, not a bank.

The binding is configured in `wrangler.jsonc`. After changing bindings, regenerate the checked-in TypeScript definitions with:

```bash
npm run types
```

## Deploy to Cloudflare

Authenticate once, validate the upload, then deploy the generated Worker bundle:

```bash
npx wrangler login
npm run deploy:dry-run
npm run deploy
```

The deployment uses the free `workers.dev` route by default and does not require a custom domain.

## Docker

```bash
docker build -t perchance-as-a-service .
docker run --rm -p 3000:3000 perchance-as-a-service
```

## Development

```bash
npm run lint
npm test
```

The project is deliberately small:

```text
app/                 Landing page and HTTP routes
maybes.json          The complete uncertainty corpus
tests/               Rendered-app and API tests
worker/              Cloudflare-compatible entry point
```

To add a response, edit `maybes.json`. Entries must be unique, non-empty strings no longer than 280 characters. See [CONTRIBUTING.md](CONTRIBUTING.md) before submitting one.

## Privacy

Perchance as a Service does not include accounts, cookies, application analytics, persistent application storage, or a database. Persisted Worker logs and traces are disabled in the checked-in production configuration. Cloudflare still provides delivery, best-effort rate limiting, and platform-level operational metadata outside the application's control. The API does not retain questions because it never accepts any.

## Attribution

Inspired by [No-as-a-Service](https://github.com/hotheadhacker/no-as-a-service), created by [hotheadhacker](https://github.com/hotheadhacker).

This project is unofficial and is not affiliated with Perchance.org.

## License

[MIT](LICENSE) — perhaps you should use it.

## Testimonials

> “We asked the API whether to migrate our production database. It said ‘The roadmap includes an optional yes.’ Transformational.”
>
> — A platform engineer, probably

> “Finally, a decision system aligned with leadership.”
>
> — Leadership, allegedly
