# Perchance as a Service

Ever needed a way to say “maybe”?

This API returns random, generic, creative, and sometimes needlessly elaborate ways to avoid committing to an answer. Perfect for personal plans, professional roadmaps, pull requests, production deploys, or deciding where to eat.

Built for decisions you know damn well you'd rather make later.

<p align="center">
  <img src="./assets/imgs/you-cant-just-say-perchance.png" alt="You can't just say perchance" width="422">
</p>

You can now.

---

## 🚀 API usage

**Base URL**

```text
https://perchance.synopsys0.workers.dev/maybe
```

- **Method:** `GET`
- **Rate limit:** `120 requests per minute per client`
- **Commitment level:** negligible

### 🔄 Example request

```bash
curl https://perchance.synopsys0.workers.dev/maybe
```

### ✅ Example response

```json
{
  "answer": "The committee has declined to commit."
}
```

Use it in apps, bots, Slack integrations, roadmaps, relationship conversations, or anywhere a firm answer would create unnecessary accountability.

Want fewer curly braces in your life?

```bash
curl 'https://perchance.synopsys0.workers.dev/maybe?format=text'
```

```text
Past possibility is not indicative of future maybe.
```

No account. No API key. No artificial intelligence. No decision.

---

## 🎰 Possible possibilities

There are **200+** unique responses, including:

- `Maybe.`
- `Perhaps.`
- `Perchance.`
- `There is a non-zero chance.`
- `The stars have opened a ticket.`
- `Fuck if I know`
- `The committee has declined to commit.`
- `The roadmap includes an optional yes.`
- `Ask again when causality settles down.`

The complete catalog of indecision lives in [`maybes.json`](./maybes.json).

---

## 🩺 Probably operational

Need to know whether the indecision machine is alive?

```bash
curl https://perchance.synopsys0.workers.dev/healthz
```

```json
{
  "status": "probably operational"
}
```

Need certainty instead?

```bash
curl https://perchance.synopsys0.workers.dev/definitely
```

That returns `404`. Certainty could not be found.

---

## 🛠️ Self-hosting

Want to run your own uncertainty department? Bold choice.

### 1. Clone the repository

```bash
git clone https://github.com/synopsys0/perchance-as-a-service.git
cd perchance-as-a-service
```

### 2. Install dependencies

Requires Node.js 22.13 or newer.

```bash
npm install
```

### 3. Start avoiding decisions

```bash
npm run dev
```

The API will probably be live at [`localhost:3000/maybe`](http://localhost:3000/maybe).

### 4. Check everything, if you must

```bash
npm run check
npm run audit:production
```

Docker is also available for enterprise-grade containerized hesitation (if you really want that):

```bash
docker build -t perchance-as-a-service .
docker run --rm -p 3000:3000 perchance-as-a-service
```

---

## ☁️ Deploying

The public service runs on a Cloudflare Worker (unpaid of course). To deploy your own:

```bash
npx wrangler login
npm run deploy:dry-run
npm run deploy
```

The edge rate limiter lives in [`wrangler.jsonc`](./wrangler.jsonc), where it can contemplate excessive traffic.

---

## 📁 Project structure

```text
perchance-as-a-service/
├── app/                 # Website and API routes
├── assets/imgs/         # Documentary evidence
├── maybes.json          # 200+ ways to avoid a straight answer
├── worker/              # Cloudflare Worker entry point
└── wrangler.jsonc       # Edge-flavored configuration
```

There is no database, account system, LLM, or user-generated content. Adding any of those would require a meeting, and the meeting has been tentatively postponed.

---

## 🙋 Frequently avoided questions

### Is this production-ready?

Mayhaps.

### Can I depend on it for important decisions?

You can depend on it to return a string.

### Why does `/definitely` return `404`?

We looked everywhere.

### Is this affiliated with Perchance.org?

No. Well, definitely no. This project is unofficial and unaffiliated.

---

## 🤝 Contributing

Have another way to say maybe? Add it to [`maybes.json`](./maybes.json), then read [`CONTRIBUTING.md`](./CONTRIBUTING.md) to determine whether you should open a pull request.

Please report suspected vulnerabilities privately using [`SECURITY.md`](./SECURITY.md). Security is one area where “maybe” is an unhelpful answer.

---

## 🐧 Testimonials

> “We asked the API whether to migrate our production database. It said ‘The roadmap includes an optional yes.’ Transformational.”
>
> — A platform engineer, probably

> “Finally, a decision system aligned with leadership.”
>
> — Leadership, allegedly

---

## 👤 Attribution

Inspired by [No-as-a-Service](https://github.com/hotheadhacker/no-as-a-service), created by [hotheadhacker](https://github.com/hotheadhacker).

Released under the [`MIT License`](./LICENSE) — perhaps you should use it.
