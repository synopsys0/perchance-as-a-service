"use client";

import { useState } from "react";

type MaybeMachineProps = {
  initialAnswer: string;
};

export function MaybeMachine({ initialAnswer }: MaybeMachineProps) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function ask() {
    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch("/maybe", { cache: "no-store" });
      if (!response.ok) throw new Error("The uncertainty service was unusually certain about failing.");
      const data = (await response.json()) as { answer: string };
      setAnswer(data.answer);
    } catch {
      setAnswer("Maybe later.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="machine">
      <div className="machine-meta">
        <span><i /> LIVE RESPONSE</span>
        <span>mode: noncommittal</span>
      </div>
      <div className="answer" aria-live="polite" aria-busy={loading}>
        <span className="quote-mark">“</span>
        <p>{loading ? "Consulting the ambiguity layer…" : answer}</p>
      </div>
      <div className="machine-actions">
        <button className="ask-button" type="button" onClick={ask} disabled={loading}>
          <span>{loading ? "Considering…" : "Ask again"}</span>
          <span aria-hidden="true">↻</span>
        </button>
        <button className="copy-button" type="button" onClick={copy} aria-label="Copy the current answer">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="latency">Response generated in a theoretically finite amount of time.</p>
    </div>
  );
}
