"use client";

import { useState, type ReactNode } from "react";

const endpoint = "https://perchance.synopsys0.workers.dev/maybe";

const examples: ReadonlyArray<{
  id: "curl" | "javascript" | "python";
  label: string;
  code: ReactNode;
}> = [
  {
    id: "curl",
    label: "cURL",
    code: (
      <>
        <span className="code-muted">$</span> curl {endpoint}{"\n\n"}
        <span className="code-muted">HTTP/2 200</span>{"\n"}
        <span className="code-key">content-type:</span> application/json{"\n\n"}
        {`{`}{"\n"}  <span className="code-key">&quot;answer&quot;</span>: <span className="code-value">&quot;Perchance.&quot;</span>{"\n"}{`}`}
      </>
    ),
  },
  {
    id: "javascript",
    label: "JavaScript",
    code: (
      <>
        <span className="code-key">const</span> response = <span className="code-key">await</span> fetch({"\n"}
        {"  "}<span className="code-value">&quot;{endpoint}&quot;</span>,{"\n"}
        );{"\n"}
        <span className="code-key">const</span> {`{ answer }`} = <span className="code-key">await</span> response.json();{"\n\n"}
        console.log(answer);
      </>
    ),
  },
  {
    id: "python",
    label: "Python",
    code: (
      <>
        <span className="code-key">import</span> requests{"\n\n"}
        response = requests.get({"\n"}
        {"  "}<span className="code-value">&quot;{endpoint}&quot;</span>,{"\n"}
        {"  "}timeout=<span className="code-value">10</span>,{"\n"}
        ){"\n\n"}
        print(response.json()[<span className="code-value">&quot;answer&quot;</span>])
      </>
    ),
  },
];

type ExampleId = (typeof examples)[number]["id"];

export function ApiExample() {
  const [activeId, setActiveId] = useState<ExampleId>("curl");
  const activeExample = examples.find((example) => example.id === activeId) ?? examples[0];

  return (
    <div className="code-window">
      <div className="code-tabs" aria-label="Code examples">
        {examples.map((example) => (
          <button
            className={example.id === activeId ? "active" : undefined}
            type="button"
            aria-pressed={example.id === activeId}
            onClick={() => setActiveId(example.id)}
            key={example.id}
          >
            {example.label}
          </button>
        ))}
      </div>
      <pre><code>{activeExample.code}</code></pre>
      <div className="code-note"><span>GET</span><code>/maybe</code><em>No API key required</em></div>
    </div>
  );
}
