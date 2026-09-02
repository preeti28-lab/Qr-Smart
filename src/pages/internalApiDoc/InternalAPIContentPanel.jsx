import React, { useState } from "react";
import { contentMap, API_BASE_URL } from "./InternalApidocdata";
import CodeBlock from "../apiDoc/CodeBlock";
import { getThemeByItemId } from "./apiSectionTheme";

const methodChip = {
  GET: "bg-blue-50 text-blue-700",
  POST: "bg-green-50 text-green-700",
  PUT: "bg-orange-50 text-orange-700",
  PATCH: "bg-amber-50 text-amber-700",
  DELETE: "bg-rose-50 text-rose-600",
  Overview: "bg-violet-50 text-violet-700",
};

// ─── Copy Button ──────────────────────────────────────────────────────────────
const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex shrink-0 items-center gap-2 self-stretch border-l border-slate-200 px-4 text-[13px] font-medium text-blue-600 transition-colors hover:bg-blue-50"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7.5l3 3 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="4.5"
              y="1.5"
              width="8"
              height="8"
              rx="1.6"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M1.5 4.5v7a1 1 0 001 1h7"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
};

// ─── Endpoint Bar (method + url + copy) ──────────────────────────────────────
const EndpointBar = ({ method, url }) => (
  <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white">
    <div
      className={`flex shrink-0 items-center border-r border-slate-200 px-5 ${
        methodChip[method] || methodChip.Overview
      }`}
    >
      <span className="text-[12px] font-bold uppercase tracking-wider">
        {method}
      </span>
    </div>
    <div className="flex min-w-0 flex-1 items-center overflow-x-auto px-4 py-3.5">
      <code className="whitespace-nowrap font-mono text-[13px] text-slate-700">
        {url}
      </code>
    </div>
    <CopyButton value={url} />
  </div>
);

// ─── Authorization Block ──────────────────────────────────────────────────────
const AuthorizationBlock = ({ auth }) => (
  <div className="mb-8">
    <SectionHeading dot="bg-violet-500">Authorizations</SectionHeading>
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-start gap-4 bg-white px-5 py-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
            <rect
              x="2"
              y="6"
              width="10"
              height="7"
              rx="1.5"
              stroke="#64748b"
              strokeWidth="1.3"
            />
            <path
              d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
              stroke="#64748b"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="7" cy="9.5" r="1" fill="#64748b" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-semibold text-slate-800">
              {auth.name}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              {auth.type || "Bearer Token (JWT)"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-slate-500">
            <span className="font-medium text-slate-600">
              Header parameter name:
            </span>
            <code className="rounded bg-violet-50 px-1.5 py-0.5 font-mono text-[12px] text-violet-700">
              {auth.headerParam}
            </code>
          </div>
          {auth.headerParam === "X-API-Key" && (
            <div className="mt-2 text-[12px] text-slate-500">
              Pass your API key in every request:{" "}
              <code className="rounded bg-violet-50 px-1.5 py-0.5 font-mono text-violet-700">
                X-API-Key: qrs_live_xxxxxxxxxxxxxxxx
              </code>
            </div>
          )}
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
      <tr className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60">
        <td className="px-5 py-4 align-top">
          <div
            className="flex items-center gap-1"
            style={{ paddingLeft: indent }}
          >
            {hasChildren ? (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex h-4 w-4 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-blue-600"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`transition-transform ${expanded ? "rotate-90" : ""}`}
                >
                  <path
                    d="M3 2l4 3-4 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : depth > 0 ? (
              <span className="flex w-4 shrink-0 items-center">
                <span className="ml-1 h-px w-2 bg-slate-300" />
              </span>
            ) : null}
            <code className="font-mono text-[13px] text-slate-800">
              {param.name}
            </code>
            {param.required && (
              <span
                className="ml-1 text-[12px] font-bold text-rose-500"
                title="required"
              >
                *
              </span>
            )}
          </div>
        </td>
        <td className="w-44 px-5 py-4 align-top">
          <span className="font-mono text-[13px] font-medium text-blue-600">
            {param.type}
          </span>
          {param.example !== undefined &&
            param.example !== "-" &&
            param.example !== null && (
              <div className="mt-1 text-[12px] text-slate-400">
                e.g. <code className="text-slate-500">{String(param.example)}</code>
              </div>
            )}
        </td>
        <td className="px-5 py-4 align-top text-[13px] leading-relaxed text-slate-600">
          {param.desc || "—"}
          {hasChildren && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="ml-2 text-[11px] font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              {expanded ? "collapse" : "expand"} properties
            </button>
          )}
        </td>
      </tr>
      {hasChildren &&
        expanded &&
        param.properties.map((child) => (
          <SchemaRow
            key={`${param.name}.${child.name}`}
            param={child}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

// ─── Schema Table ─────────────────────────────────────────────────────────────
const SchemaTable = ({ schema }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-5 py-3 transition-colors hover:bg-slate-100/70"
      >
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
          <span className="font-mono text-[13px] leading-none">{"{ }"}</span>
          application/json
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-slate-400 transition-transform duration-200 ${
            open ? "" : "rotate-180"
          }`}
        >
          <path
            d="M2 7.5l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="w-52 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Parameter
                  </th>
                  <th className="w-44 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Type / Example
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {schema.map((param) => (
                  <SchemaRow key={param.name} param={param} depth={0} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-2.5">
            <span className="text-[11px] text-slate-400">
              <span className="font-bold text-rose-500">*</span> Required field
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Response Status Block ────────────────────────────────────────────────────
const ResponseBlock = ({ responses }) => {
  const [activeStatus, setActiveStatus] = useState(responses[0].status);
  const current = responses.find((r) => r.status === activeStatus);

  const statusColor = {
    200: "bg-green-50 text-green-700 border-green-200",
    201: "bg-green-50 text-green-700 border-green-200",
    304: "bg-slate-50 text-slate-600 border-slate-200",
    400: "bg-amber-50 text-amber-700 border-amber-200",
    401: "bg-rose-50 text-rose-600 border-rose-200",
    403: "bg-orange-50 text-orange-700 border-orange-200",
    404: "bg-orange-50 text-orange-700 border-orange-200",
    422: "bg-amber-50 text-amber-700 border-amber-200",
    429: "bg-amber-50 text-amber-700 border-amber-200",
    500: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        {responses.map((r) => {
          const isActive = activeStatus === r.status;

          return (
            <button
              key={r.status}
              onClick={() => setActiveStatus(r.status)}
              className={`rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all ${
                statusColor[r.status] ||
                "bg-slate-50 text-slate-600 border-slate-200"
              } ${
                isActive
                  ? "shadow-[0_6px_16px_-10px_rgba(15,23,42,0.6)]"
                  : "opacity-55 hover:opacity-100"
              }`}
            >
              {r.status} {r.label}
            </button>
          );
        })}
      </div>
      {current && (
        <div>
          {current.description && (
            <p className="mb-4 text-[13.5px] leading-relaxed text-slate-500">
              {current.description}
            </p>
          )}
          {current.sample && (
            <CodeBlock code={current.sample} lang="json" label="Response sample" />
          )}
        </div>
      )}
    </div>
  );
};

const Divider = () => <hr className="my-8 border-slate-100" />;

const SectionHeading = ({ children, dot = "bg-blue-500" }) => (
  <h2 className="mb-4 flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-500">
    <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
    {children}
  </h2>
);

// ─── Note Block ───────────────────────────────────────────────────────────────
const NoteBlock = ({ note }) => (
  <div className="mb-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-amber-500"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v4M8 5v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <p className="text-[13px] leading-relaxed text-amber-700">{note}</p>
  </div>
);

// ─── Main Panel ───────────────────────────────────────────────────────────────
const InternalAPIContentPanel = ({ activeId }) => {
  const content = contentMap[activeId];

  if (!content) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-24 text-slate-400">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="mb-4 opacity-40"
        >
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

  const theme = getThemeByItemId(activeId);
  const PanelIcon = theme.panelIcon;
  const fullUrl = `${API_BASE_URL}${content.requestUrl || ""}`;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-9">
      {/* Endpoint bar */}
      {content.requestUrl ? (
        <EndpointBar method={content.badge} url={fullUrl} />
      ) : (
        <span
          className={`inline-block rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
            methodChip[content.badge] || methodChip.Overview
          }`}
        >
          {content.badge}
        </span>
      )}

      {/* Header */}
      <div className="mt-7 flex items-start gap-4">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
          <PanelIcon size={22} className="text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] font-bold leading-tight text-slate-900">
            {content.title}
          </h1>
          {content.description && (
            <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
              {content.description}
            </p>
          )}
        </div>
      </div>

      {/* Dev note */}
      {content.note && (
        <div className="mt-7">
          <NoteBlock note={content.note} />
        </div>
      )}

      {/* Authorization block */}
      {content.authorization && (
        <div className="mt-7">
          <AuthorizationBlock auth={content.authorization} />
        </div>
      )}

      {/* No auth notice */}
      {content.authorization === null && (
        <div className="mt-7 flex items-center gap-3.5 rounded-xl border border-blue-100 bg-blue-50/70 px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#fff" strokeWidth="1.4" />
              <path
                d="M1.6 8h12.8M8 1.5c1.7 1.9 2.6 4.1 2.6 6.5S9.7 12.6 8 14.5C6.3 12.6 5.4 10.4 5.4 8S6.3 3.4 8 1.5z"
                stroke="#fff"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <p className="text-[13.5px] font-medium text-blue-700">
            No authentication required for this endpoint.
          </p>
        </div>
      )}

      {/* Request Method + URL */}
      {content.requestMethod && (
        <>
          <Divider />
          <div>
            <SectionHeading dot="bg-green-500">Request</SectionHeading>
            <EndpointBar
              method={content.requestMethod}
              url={`${API_BASE_URL}${content.requestUrl}`}
            />
          </div>
        </>
      )}

      {/* Request Body Schema */}
      {content.requestBody && content.requestBody.length > 0 && (
        <>
          <Divider />
          <div>
            <SectionHeading dot="bg-blue-500">
              Request Body / Parameters
            </SectionHeading>
            <SchemaTable schema={content.requestBody} />
          </div>
        </>
      )}

      {/* Responses */}
      {content.responses && (
        <>
          <Divider />
          <SectionHeading dot="bg-green-500">Responses</SectionHeading>
          <ResponseBlock responses={content.responses} />
        </>
      )}
    </div>
  );
};

export default InternalAPIContentPanel;
