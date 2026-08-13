import { ApiExample } from "./api-example";
import { MaybeMachine } from "./maybe-machine";
import { maybes, pickMaybe } from "./lib/maybes";

export const dynamic = "force-dynamic";

export default function Home() {
  const initialAnswer = pickMaybe();

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Perchance as a Service home">
          <span className="brand-mark">P</span>
          <span>Perchance as a Service</span>
        </a>
        <div className="nav-links">
          <a href="#api">API</a>
          <a href="#principles">Principles</a>
          <a
            href="https://github.com/synopsys0/perchance-as-a-service"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub ↗
          </a>
          <span className="status"><i /> Probably operational</span>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>
            PERCHANCE.
            <span>AS A</span>
            SERVICE.
          </h1>
          <p className="lede">
            A scalable, cloud-native way to avoid making a decision.
            One endpoint. Zero commitments.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#console">Consult the API</a>
            <a className="text-link" href="#api">Read the documentation <span>↘</span></a>
          </div>
        </div>

        <div className="hero-panel" id="console">
          <div className="panel-bar">
            <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>decision-console</span>
            <span className="panel-secure">TLS-ish</span>
          </div>
          <MaybeMachine initialAnswer={initialAnswer} />
        </div>
      </section>

      <section className="metrics" aria-label="Service metrics">
        <div><strong>99.9-ish%</strong><span>uncertainty uptime</span></div>
        <div><strong>0</strong><span>decisions finalized</span></div>
        <div><strong>∞</strong><span>plausible deniability</span></div>
        <div><strong>{maybes.length}</strong><span>curated maybes</span></div>
      </section>

      <section className="api-section" id="api">
        <div className="section-heading">
          <p className="eyebrow">The complete API</p>
          <h2>One endpoint.<br />You’ll manage.</h2>
          <p>Send a request. Receive a professionally noncommittal response. Continue avoiding the issue at scale.</p>
        </div>
        <ApiExample />
      </section>

      <section className="principles" id="principles">
        <article>
          <span className="principle-number">01</span>
          <h3>Utterly stateless</h3>
          <p>We don’t remember your question, your answer, or why you thought an API would help.</p>
        </article>
        <article>
          <span className="principle-number">02</span>
          <h3>Globally indecisive</h3>
          <p>Deploy uncertainty close to your users for low-latency hesitation anywhere on Earth.</p>
        </article>
        <article>
          <span className="principle-number">03</span>
          <h3>Radically bounded</h3>
          <p>No accounts, database, prompts, or AI. Just a curated corpus of maybes and impeccable timing.</p>
        </article>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Ready to not decide?</p>
        <h2>The answer is waiting.<br /><em>Probably.</em></h2>
        <a className="button button-light" href="#console">Ask the maybe machine</a>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">P</span><span>Perchance as a Service</span></div>
        <div className="footer-links">
          <a href="https://github.com/synopsys0/perchance-as-a-service" target="_blank" rel="noreferrer">View on GitHub ↗</a>
          <a href="https://github.com/synopsys0/perchance-as-a-service" target="_blank" rel="noreferrer">Star the repo ↗</a>
          <p>Not affiliated with Perchance.org.<br />Inspired by No-as-a-Service.</p>
        </div>
        <p className="footer-note">Built with conviction.<br />Deployed with uncertainty.</p>
      </footer>
    </main>
  );
}
