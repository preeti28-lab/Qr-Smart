import React, { useState } from "react";

const highlightJSON = (code) => {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-emerald-400"; // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "text-sky-300" : "text-emerald-400"; // key vs string value
      } else if (/^(true|false)$/.test(match)) {
        cls = "text-purple-400";
      } else if (match === "null") {
        cls = "text-rose-400";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
};

const CodeBlock = ({ code, lang = "json", label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#1b2547] shadow-[0_16px_40px_-24px_rgba(15,23,42,0.7)]">
      <div className="flex items-center justify-between bg-[#182042] px-4 py-3">
        <div className="flex items-center gap-2.5 text-slate-300">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L2.5 8 6 12M10 4l3.5 4L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {label && <span className="text-[12.5px] font-medium">{label}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-300 transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="4.5" y="1.5" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 4.5v7a1 1 0 001 1h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-gradient-to-br from-[#131c3d] to-[#0b1029] p-5 font-mono text-[13px] leading-relaxed text-slate-100">
        {lang === "json" ? (
          <code dangerouslySetInnerHTML={{ __html: highlightJSON(code) }} />
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;