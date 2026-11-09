import { useState } from "react";
import { Icon } from "./Icon.jsx";

function AnswerBody({ answer }) {
  const blocks = Array.isArray(answer) ? answer : [answer];
  return (
    <div className="space-y-3 text-sm leading-relaxed text-ink-600 sm:text-[0.9375rem]">
      {blocks.map((block, i) => {
        if (typeof block === "string") return <p key={i}>{block}</p>;
        if (block.note) {
          return (
            <div
              key={i}
              className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-ink-700"
            >
              {block.note}
            </div>
          );
        }
        if (block.steps) {
          return (
            <ol
              key={i}
              className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-brand-700"
            >
              {block.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
          );
        }
        if (block.list) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-brand-600">
              {block.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-200 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-ink-900 hover:text-brand-700"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <Icon
          name="ChevronDown"
          className={`h-5 w-5 shrink-0 text-ink-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <AnswerBody answer={answer} />
        </div>
      )}
    </div>
  );
}

export function Accordion({ items }) {
  return (
    <div className="divide-y divide-ink-200 rounded-xl border border-ink-200 bg-surface">
      {items.map((item, i) => (
        <div key={i} className="px-5">
          <AccordionItem question={item.q} answer={item.a} />
        </div>
      ))}
    </div>
  );
}
