import React, { useState } from "react";
import { API_BASE_URL, contentMap } from "./apiDocData";
import CodeBlock from "./CodeBlock";

// single light-tinted color source used everywhere (badge, pills, request bar)
const methodColors = {
  GET: "bg-blue-100 text-blue-700 border-blue-200",
  POST: "bg-green-100 text-green-700 border-green-200",
  PUT: "bg-orange-100 text-orange-700 border-orange-200",
  PATCH: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DELETE: "bg-red-100 text-red-700 border-red-200",
  Overview: "bg-blue-100 text-blue-700 border-blue-200",
  FAQ: "bg-amber-100 text-amber-700 border-amber-200",
};

// tinted background for the box surrounding the method pill + url
const methodBg = {
  GET: "bg-blue-50/70 border-blue-200",
  POST: "bg-green-50/70 border-green-200",
  PUT: "bg-orange-50/70 border-orange-200",
  PATCH: "bg-yellow-50/70 border-yellow-200",
  DELETE: "bg-red-50/70 border-red-200",
};

const statusColor = {
  200: "bg-green-50 text-green-700 border-green-200",
  201: "bg-green-50 text-green-700 border-green-200",
  400: "bg-amber-50 text-amber-700 border-amber-200",
  401: "bg-red-50 text-red-700 border-red-200",
  404: "bg-orange-50 text-orange-700 border-orange-200",
  422: "bg-amber-50 text-amber-700 border-amber-200",
  500: "bg-red-50 text-red-700 border-red-200",
};

// ─── Copy Button ──────────────────────────────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-blue-600 transition-colors shrink-0"
    >
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="4.5" y="4.5" width="8" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.5 9.5V2.8A1.3 1.3 0 0 1 3.8 1.5h6.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

// ─── Request Bar (used both as top quick-bar and inside REQUEST section) ─────
const RequestBar = ({ method, url }) => (
  <div className={`flex items-center gap-3 flex-wrap border rounded-xl px-3 py-2.5 ${methodBg[method] || "bg-slate-50 border-slate-200"}`}>
    <span className={`text-[11.5px] font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider border shrink-0 ${methodColors[method] || methodColors.Overview}`}>
      {method}
    </span>
    <code className="text-[13px] font-mono text-slate-700 flex-1 min-w-[200px] truncate">
      {url}
    </code>
    <CopyButton text={url} />
  </div>
);

// ─── Authorization Block ──────────────────────────────────────────────────────
const AuthorizationBlock = ({ auth }) => (
  <div className="mb-8">
    <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-3">
      Authorizations
    </h2>
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-start gap-4 px-5 py-4 bg-white">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#2563eb" strokeWidth="1.3" />
            <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#2563eb" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="1" fill="#2563eb" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[14px] font-semibold text-slate-800">{auth.name}</span>
            <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
              API Key
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
            <span className="font-medium text-slate-600">Header parameter name:</span>
            <code className="font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[12px]">
              {auth.headerParam}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Schema Row (expandable nested) ──────────────────────────────────────────
const SchemaRow = ({ param, depth = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = param.properties && param.properties.length > 0;
  const indent = depth * 20;

  return (
    <>
      <tr className="border-b border-slate-100 last:border-0 hover:bg-blue-50/40 transition-colors">
        <td className="px-4 py-3 align-top">
          <div className="flex items-center gap-1" style={{ paddingLeft: indent }}>
            {hasChildren ? (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors shrink-0"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${expanded ? "rotate-90" : ""}`}>
                  <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : depth > 0 ? (
              <span className="w-4 shrink-0 flex items-center">
                <span className="w-2 h-px bg-slate-300 ml-1" />
              </span>
            ) : null}
            <code className="text-[12.5px] font-mono text-slate-800">{param.name}</code>
            {param.required && (
              <span className="ml-1 text-rose-500 text-[11px] font-bold" title="required">*</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 align-top w-40">
          <span className="text-[12px] font-mono font-semibold text-blue-600">{param.type}</span>
          {param.example !== undefined && param.example !== "-" && param.example !== null && (
            <div className="text-[11px] text-slate-400 mt-0.5">
              e.g. <code className="text-slate-500">{String(param.example)}</code>
            </div>
          )}
        </td>
        <td className="px-4 py-3 align-top text-[13px] text-slate-600 leading-relaxed">
          {param.desc || "—"}
          {hasChildren && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="ml-2 text-[11px] text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
            >
              {expanded ? "collapse" : "expand"} properties
            </button>
          )}
        </td>
      </tr>
      {hasChildren && expanded && param.properties.map((child) => (
        <SchemaRow key={`${param.name}.${child.name}`} param={child} depth={depth + 1} />
      ))}
    </>
  );
};

// ─── Schema Table ─────────────────────────────────────────────────────────────
const SchemaTable = ({ schema, contentType = "application/json" }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 mb-8">
    <div className="bg-blue-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
        {contentType}
      </span>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-white border-b border-slate-200">
          <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-52">Parameter</th>
          <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-40">Type / Example</th>
          <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Description</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {schema.map((param) => (
          <SchemaRow key={param.name} param={param} depth={0} />
        ))}
      </tbody>
    </table>
    <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
      <span className="text-[11px] text-slate-400">
        <span className="text-rose-500 font-bold">*</span> Required field
      </span>
    </div>
  </div>
);

// ─── Response Status Block ────────────────────────────────────────────────────
const ResponseBlock = ({ responses }) => {
  const [activeStatus, setActiveStatus] = useState(responses[0].status);
  const current = responses.find((r) => r.status === activeStatus);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {responses.map((r) => (
          <button
            key={r.status}
            onClick={() => setActiveStatus(r.status)}
            className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
              statusColor[r.status] || "bg-blue-50 text-blue-700 border-blue-200"
            } ${activeStatus === r.status ? "ring-2 ring-offset-1 ring-current" : "opacity-60 hover:opacity-100"}`}
          >
            {r.status} {r.label}
          </button>
        ))}
      </div>
      {current && (
        <div>
          {current.description && (
            <p className="text-[13px] text-slate-500 mb-3">{current.description}</p>
          )}
          {current.sample && (
            <CodeBlock code={current.sample} lang="json" label="Response sample" />
          )}
        </div>
      )}
    </div>
  );
};

// ─── Legacy Params Table ──────────────────────────────────────────────────────
const ParamsTable = ({ params }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 mb-8">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-blue-50 border-b border-slate-200">
          <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-44">Parameter</th>
          <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-24">Type</th>
          <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-20">Required</th>
          <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p, i) => (
          <tr key={p.name} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
            <td className="px-4 py-3">
              <code className="text-[12px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{p.name}</code>
            </td>
            <td className="px-4 py-3"><span className="text-[12px] font-mono text-slate-500">{p.type}</span></td>
            <td className="px-4 py-3">
              {p.required
                ? <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">required</span>
                : <span className="text-[11px] text-slate-400">optional</span>}
            </td>
            <td className="px-4 py-3 text-[13px] text-slate-600">{p.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const FAQSection = ({ faqs }) => (
  <div className="space-y-4">
    {faqs.map((item, i) => (
      <details key={i} className="group rounded-xl border border-slate-200 overflow-hidden">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none bg-white hover:bg-slate-50 transition-colors">
          <span className="text-[14px] font-medium text-slate-800">{item.q}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50">
          <p className="text-[13.5px] text-slate-600 leading-relaxed">{item.a}</p>
        </div>
      </details>
    ))}
  </div>
);

const Divider = () => <hr className="border-slate-100 my-8" />;
const SectionHeading = ({ children }) => (
  <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-3">{children}</h2>
);

// ─── Main Panel ───────────────────────────────────────────────────────────────
const APIContentPanel = ({ activeId }) => {
  const content = contentMap[activeId];

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4 opacity-40 text-blue-300">
          <rect x="8" y="8" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="26" y="8" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="8" y="26" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="28" y="28" width="4" height="4" fill="currentColor" />
          <rect x="36" y="28" width="4" height="4" fill="currentColor" />
          <rect x="28" y="36" width="4" height="4" fill="currentColor" />
          <rect x="36" y="36" width="4" height="4" fill="currentColor" />
        </svg>
        <p className="text-sm">Select a topic from the sidebar</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-8">

      {/* Top quick request bar (matches image's bar right under tabs) */}
      {content.requestMethod && (
        <div className="mb-6">
          <RequestBar method={content.requestMethod} url={`${API_BASE_URL}${content.requestUrl}`} />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${methodColors[content.badge] || methodColors.Overview}`}>
            {content.badge}
          </span>
          {content.endpoint && (
            <code className="text-[13px] font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              {content.endpoint}
            </code>
          )}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">{content.title}</h1>
        {content.description && (
          <p className="text-[14.5px] text-slate-600 leading-relaxed">{content.description}</p>
        )}
      </div>

      {/* Auth note / info callout */}
      {content.authNote && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8">
          <span className="w-6 h-6 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-500 text-[12px] font-bold shrink-0">
            i
          </span>
          <p className="text-[13.5px] text-blue-700 font-medium">{content.authNote}</p>
        </div>
      )}

      {/* Authorization block */}
      {content.authorization && (
        <>
          <Divider />
          <AuthorizationBlock auth={content.authorization} />
        </>
      )}

      {/* Request Method + URL (REQUEST section) */}
      {content.requestMethod && (
        <>
          <Divider />
          <div className="mb-6">
            <SectionHeading>Request</SectionHeading>
            <RequestBar method={content.requestMethod} url={content.requestUrl} />
          </div>
        </>
      )}

      {/* Request Body Schema */}
      {content.requestBody && (
        <>
          <Divider />
          <div className="mb-6">
            <SectionHeading>Request Body / Parameters</SectionHeading>
            <SchemaTable schema={content.requestBody} />
          </div>
        </>
      )}

      {/* Legacy simple params */}
      {content.params && (
        <>
          <Divider />
          <SectionHeading>Parameters</SectionHeading>
          <ParamsTable params={content.params} />
        </>
      )}

      {/* Details table (overview) */}
      {content.details && (
        <div className="rounded-xl border border-slate-200 overflow-hidden mb-8">
          {content.details.map((d, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-3.5 ${i < content.details.length - 1 ? "border-b border-slate-100" : ""} ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
            >
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider w-36 shrink-0">{d.label}</span>
              {d.code
                ? <code className="text-[13px] font-mono text-blue-700">{d.value}</code>
                : <span className="text-[13px] text-slate-700">{d.value}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Responses (multi-status) */}
      {content.responses && (
        <>
          <Divider />
          <SectionHeading>Responses</SectionHeading>
          <ResponseBlock responses={content.responses} />
        </>
      )}

      {/* Legacy single response */}
      {content.response && !content.responses && (
        <>
          <Divider />
          <SectionHeading>Response</SectionHeading>
          <CodeBlock code={content.response} lang="json" label="JSON" />
        </>
      )}

      {/* FAQ */}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </div>
  );
};

export default APIContentPanel;