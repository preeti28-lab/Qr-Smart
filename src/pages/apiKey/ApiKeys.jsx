// PATH: src/pages/apiKey/ApiKeys.jsx
import React, { useState, useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Tooltip, message } from "antd";
import {
  BsKey,
  BsShieldLock,
  BsClipboard,
  BsClipboardCheck,
  BsTrash,
  BsPlus,
  BsArrowRight,
} from "react-icons/bs";
import { MdOutlineWarningAmber, MdCheckCircleOutline, MdCheck } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import { HiOutlineCode } from "react-icons/hi";
import {
  generateApiKey,
  getAllApiKeys,
  revokeApiKey,
} from "../../redux/features/apikey";

const BRAND_GRADIENT = "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)";

const MODULE_TEXTURE = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

const ApiKeys = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  // ── Keys State ──────────────────────────────────────────────
  const [apiKeys, setApiKeys] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [maxAllowed, setMaxAllowed] = useState(5);
  const [loading, setLoading] = useState(false);

  // ── Generate Modal ──────────────────────────────────────────
  const [generateModal, setGenerateModal] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [generating, setGenerating] = useState(false);

  // ── Reveal Modal (shown once after generation) ──────────────
  const [revealModal, setRevealModal] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [copied, setCopied] = useState(false);

  // ── Revoke Modal ────────────────────────────────────────────
  const [revokeModal, setRevokeModal] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState(null);
  const [revoking, setRevoking] = useState(false);

  // ── Subscription Check (matches AppViewer.jsx logic) ────────
  const subscriptionEnd = userData?.subscriptionEndDate
    ? new Date(userData.subscriptionEndDate)
    : null;
  const isSubscriptionActive =
    userData?.isSubscriptionActive &&
    subscriptionEnd &&
    new Date() <= subscriptionEnd;
  const isTrial = userData?.isTrial;
  const canAccessApi = isSubscriptionActive && !isTrial;

  useEffect(() => {
    if (canAccessApi) {
      fetchKeys();
    }
  }, [canAccessApi]);

  const fetchKeys = () => {
    setLoading(true);
    dispatch(
      getAllApiKeys((success, data) => {
        setLoading(false);
        if (success && data) {
          setApiKeys(data.keys || []);
          setActiveCount(data.activeCount ?? 0);
          setMaxAllowed(data.maxAllowed ?? 5);
        }
      })
    );
  };

  const handleGenerate = () => {
    if (!keyName.trim()) {
      message.warning("Please enter a name for your API key");
      return;
    }
    if (keyName.trim().length > 100) {
      message.warning("Key name must be 100 characters or less");
      return;
    }
    setGenerating(true);
    dispatch(
      generateApiKey({ name: keyName.trim() }, (success, data) => {
        setGenerating(false);
        if (success && data) {
          setNewlyCreatedKey(data);
          setGenerateModal(false);
          setKeyName("");
          setRevealModal(true);
          fetchKeys();
        }
      })
    );
  };

  const handleRevoke = () => {
    if (!keyToRevoke) return;
    setRevoking(true);
    dispatch(
      revokeApiKey(keyToRevoke._id, (success) => {
        setRevoking(false);
        if (success) {
          message.success("API key revoked successfully");
          setRevokeModal(false);
          setKeyToRevoke(null);
          fetchKeys();
        }
      })
    );
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const timeAgo = (date) => {
    if (!date) return "Never";
    const diff = Date.now() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const isGenerateLimitReached = activeCount >= maxAllowed;

  // ── Upgrade Gate ──────────────────────────────────────────────
  if (!canAccessApi) {
    const perks = [
      "Generate and manage API keys",
      "Create QR codes programmatically",
      "All 15+ QR types available over the API",
      "Real-time scan analytics",
      "Rate limits based on your plan",
    ];

    return (
      <AppViewer>
        <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB] py-8 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-y-5">
            {/* Header band */}
            <div
              className="relative overflow-hidden rounded-2xl px-6 py-8 sm:px-8"
              style={{ background: BRAND_GRADIENT }}
            >
              <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />

              <div className="relative flex flex-col items-start gap-y-4 max-w-lg">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/12 border border-white/15 backdrop-blur text-white">
                  <RiVipCrownLine size={24} />
                </span>

                <div className="flex flex-col gap-y-2">
                  <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                    {isTrial
                      ? "API access comes with a paid plan"
                      : "Renew to restore API access"}
                  </h1>
                  <p className="text-[13.5px] font-medium text-blue-100/80 leading-relaxed">
                    {isTrial
                      ? "API keys aren't part of the free trial. Move to any paid plan to generate a key and build QR Smart into your own apps."
                      : "Your subscription has ended, so API keys are paused. Renew your plan and your existing integrations pick up where they left off."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/plans-and-payments")}
                    className="flex items-center gap-x-2 rounded-full bg-white text-slate-900 text-[13.5px] font-bold px-6 py-2.5
                      hover:bg-blue-50 transition-colors active:scale-[0.99]"
                  >
                    {isTrial ? "See plans" : "Renew plan"}
                    <BsArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/builder")}
                    className="rounded-full border border-white/25 text-white text-[13.5px] font-semibold px-6 py-2.5
                      hover:bg-white/10 transition-colors"
                  >
                    Back to building QR codes
                  </button>
                </div>
              </div>
            </div>

            {/* Perks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="flex items-baseline gap-x-2.5 mb-4">
                <h2 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
                  What a paid plan unlocks
                </h2>
                <span className="text-[12px] font-medium text-slate-400">
                  on every plan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {perks.map((item, i) => (
                  <div key={i} className="flex items-start gap-x-2.5">
                    <span className="shrink-0 grid place-items-center w-4 h-4 rounded-full bg-blue-50 text-blue-600 mt-[2px]">
                      <MdCheck size={11} />
                    </span>
                    <span className="text-[13px] text-slate-700 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to="/docs/QR"
                  className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Read the API documentation first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AppViewer>
    );
  }

  // ── Main Page ──────────────────────────────────────────────────
  const usagePercent = maxAllowed > 0 ? (activeCount / maxAllowed) * 100 : 0;

  return (
    <AppViewer>
      <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB]">
        <div className="py-5 px-4 sm:px-6 max-w-[1200px] mx-auto flex flex-col gap-y-5">
          {/* ── Header band ── */}
          <div
            className="relative overflow-hidden rounded-2xl px-5 py-6 sm:px-7"
            style={{ background: BRAND_GRADIENT }}
          >
            <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />

            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-y-1.5 max-w-lg">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-200/90">
                  Developers
                </span>
                <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                  API keys
                </h1>
                <p className="text-[13.5px] font-medium text-blue-100/80 leading-snug">
                  Create QR codes and pull scan data straight from your own apps.
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-2.5 min-w-[210px]">
                {/* usage meter — makes the 5-key ceiling visible before you hit it */}
                <div className="rounded-xl bg-white/10 border border-white/15 backdrop-blur px-3.5 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200/90">
                      Active keys
                    </span>
                    <span className="text-[12px] font-bold text-white">
                      {loading ? "—" : `${activeCount} / ${maxAllowed}`}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white/80 transition-all duration-500"
                      style={{ width: `${Math.min(100, usagePercent)}%` }}
                    />
                  </div>
                </div>

                <Tooltip
                  title={
                    isGenerateLimitReached
                      ? `Maximum ${maxAllowed} active keys allowed. Revoke a key to generate a new one.`
                      : ""
                  }
                >
                  <span>
                    <button
                      type="button"
                      onClick={() => setGenerateModal(true)}
                      disabled={isGenerateLimitReached}
                      className="w-full flex items-center justify-center gap-1.5 rounded-full bg-white text-slate-900
                        text-[13.5px] font-bold px-5 py-2.5 hover:bg-blue-50 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                    >
                      <BsPlus size={18} />
                      Generate new key
                    </button>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* ── Security note ── */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-x-3">
            <span className="shrink-0 grid place-items-center w-8 h-8 rounded-xl bg-amber-100 text-amber-700">
              <BsShieldLock size={15} />
            </span>
            <div className="flex flex-col gap-y-0.5">
              <p className="text-[13.5px] font-bold text-amber-900">
                Keep your keys out of the browser
              </p>
              <p className="text-[12.5px] font-medium text-amber-800/90 leading-snug">
                Call the API from your server and store keys in environment
                variables. A key is shown in full only once, right after you
                generate it.
              </p>
              <Link
                to="/docs/QR"
                className="text-[12.5px] font-bold text-amber-900 underline underline-offset-2 mt-1 w-fit hover:text-amber-950"
              >
                Read the documentation
              </Link>
            </div>
          </div>

          {/* ── Keys ── */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[84px] bg-slate-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center flex flex-col items-center">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mb-4">
                <HiOutlineCode size={22} />
              </span>
              <p className="text-[15px] font-bold text-slate-800 mb-1">
                No API keys yet
              </p>
              <p className="text-[13px] text-slate-500 mb-5 max-w-sm">
                Generate your first key to start creating QR codes from your own
                code.
              </p>
              <button
                type="button"
                onClick={() => setGenerateModal(true)}
                className="flex items-center gap-1.5 text-white px-5 rounded-full py-2.5 text-[13.5px] font-semibold
                  shadow-[0_8px_20px_-10px_rgba(16,76,217,0.9)] hover:brightness-110 transition-all active:scale-[0.99]"
                style={{ background: BRAND_GRADIENT }}
              >
                <BsPlus size={16} />
                Generate API key
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {apiKeys.map((key) => (
                <div
                  key={key._id}
                  className={`rounded-2xl border bg-white px-5 py-4 flex items-center justify-between gap-4 flex-wrap
                    transition-all duration-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                    ${key.isActive
                      ? "border-slate-200 hover:border-slate-300"
                      : "border-slate-200 opacity-70"}`}
                >
                  <div className="flex items-center gap-x-3.5 min-w-0">
                    <span
                      className={`shrink-0 grid place-items-center w-10 h-10 rounded-xl
                        ${key.isActive
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-400"}`}
                    >
                      <BsKey size={17} />
                    </span>
                    <div className="flex flex-col gap-y-0.5 min-w-0">
                      <div className="flex items-center gap-x-2 flex-wrap">
                        <p className="text-[14.5px] font-bold text-slate-900 tracking-[-0.01em] truncate">
                          {key.name}
                        </p>
                        <span
                          className={`px-2 py-[2px] rounded-full text-[10.5px] font-bold uppercase tracking-wide border ${
                            key.isActive
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                        >
                          {key.isActive ? "Active" : "Revoked"}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-400 font-mono">
                        {key.prefix}···
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-x-6 gap-y-2 flex-wrap ml-auto">
                    {[
                      ["Created", formatDate(key.createdAt)],
                      ["Last used", timeAgo(key.lastUsedAt)],
                      ["Today", `${key.dailyRequests || 0} reqs`],
                      ["This month", `${key.monthlyRequests || 0} reqs`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-y-0.5">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          {label}
                        </span>
                        <span className="text-[12.5px] font-semibold text-slate-700">
                          {value}
                        </span>
                      </div>
                    ))}

                    {key.isActive && (
                      <Tooltip title="Revoke key">
                        <button
                          type="button"
                          onClick={() => {
                            setKeyToRevoke(key);
                            setRevokeModal(true);
                          }}
                          className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                        >
                          <BsTrash size={15} />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Generate Key Modal ──────────────────────────────── */}
      <Modal
        open={generateModal}
        onCancel={() => {
          setGenerateModal(false);
          setKeyName("");
        }}
        footer={null}
        centered
        width={460}
        closable={false}
        styles={{ content: { padding: 0, borderRadius: 18, overflow: "hidden" } }}
      >
        <div className="h-1 w-full" style={{ background: BRAND_GRADIENT }} />
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-x-3 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
              <BsKey size={16} />
            </span>
            <div className="flex flex-col gap-y-0.5">
              <h2 className="font-bold text-slate-900 text-[16.5px] tracking-[-0.02em]">
                Generate API key
              </h2>
              <p className="text-[12.5px] font-medium text-slate-500">
                Name it after where you'll use it.
              </p>
            </div>
          </div>

          <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
            Key name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Production server"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-slate-800
              placeholder:text-slate-400 placeholder:font-normal outline-none
              hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            maxLength={100}
          />
          <p className="text-[11.5px] font-medium text-slate-400 mt-1 text-right">
            {keyName.length}/100
          </p>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                setGenerateModal(false);
                setKeyName("");
              }}
              className="flex-1 border border-slate-200 text-slate-600 text-[13.5px] font-semibold py-2.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating || !keyName.trim()}
              className="flex-1 rounded-full text-white text-[13.5px] font-semibold py-2.5 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
              style={{ background: BRAND_GRADIENT }}
            >
              {generating ? "Generating…" : "Generate key"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Reveal Key Modal ─────────────────────────────────── */}
      <Modal
        open={revealModal}
        onCancel={() => {
          setRevealModal(false);
          setNewlyCreatedKey(null);
          setCopied(false);
        }}
        footer={null}
        centered
        width={520}
        closable={false}
        maskClosable={false}
        styles={{ content: { padding: 0, borderRadius: 18, overflow: "hidden" } }}
      >
        <div className="h-1 w-full bg-emerald-500" />
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-x-3 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600">
              <MdCheckCircleOutline size={19} />
            </span>
            <h2 className="font-bold text-slate-900 text-[16.5px] tracking-[-0.02em]">
              Your API key
            </h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4 flex items-start gap-x-2.5">
            <MdOutlineWarningAmber className="text-amber-600 mt-[1px] shrink-0" size={16} />
            <p className="text-[12.5px] text-amber-900 leading-relaxed font-medium">
              Copy this key now. This is the only time it's shown in full — if you
              lose it, you'll need to generate a new one.
            </p>
          </div>

          <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
            {newlyCreatedKey?.name}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 rounded-xl px-3.5 py-3 font-mono text-[12.5px] text-emerald-400 overflow-x-auto whitespace-nowrap">
              {newlyCreatedKey?.key}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(newlyCreatedKey?.key)}
              className="shrink-0 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-colors"
            >
              {copied ? (
                <BsClipboardCheck size={16} className="text-emerald-500" />
              ) : (
                <BsClipboard size={16} />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-[12px] font-semibold text-emerald-600 mt-1.5 flex items-center gap-1">
              <MdCheckCircleOutline size={13} /> Copied to clipboard
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setRevealModal(false);
              setNewlyCreatedKey(null);
              setCopied(false);
            }}
            className="w-full mt-5 text-white text-[13.5px] font-semibold py-2.5 rounded-full hover:brightness-110 transition-all"
            style={{ background: BRAND_GRADIENT }}
          >
            I've copied my key
          </button>
        </div>
      </Modal>

      {/* ── Revoke Confirm Modal ─────────────────────────────── */}
      <Modal
        open={revokeModal}
        onCancel={() => {
          setRevokeModal(false);
          setKeyToRevoke(null);
        }}
        footer={null}
        centered
        width={440}
        closable={false}
        styles={{ content: { padding: 0, borderRadius: 18, overflow: "hidden" } }}
      >
        <div className="h-1 w-full bg-red-500" />
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-x-3 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-red-50 text-red-600">
              <BsTrash size={15} />
            </span>
            <h2 className="font-bold text-slate-900 text-[16.5px] tracking-[-0.02em]">
              Revoke this key?
            </h2>
          </div>

          <p className="text-[13.5px] text-slate-600 font-medium mb-1.5">
            You're revoking{" "}
            <span className="font-bold text-slate-900">
              “{keyToRevoke?.name}”
            </span>
            .
          </p>
          <p className="text-[13px] text-slate-500 font-medium mb-5 leading-relaxed">
            Any app using this key stops working immediately, and it can't be
            restored afterwards.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setRevokeModal(false);
                setKeyToRevoke(null);
              }}
              className="flex-1 border border-slate-200 text-slate-600 text-[13.5px] font-semibold py-2.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              Keep it
            </button>
            <button
              type="button"
              onClick={handleRevoke}
              disabled={revoking}
              className="flex-1 bg-red-600 text-white text-[13.5px] font-semibold py-2.5 rounded-full
                hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {revoking ? "Revoking…" : "Yes, revoke"}
            </button>
          </div>
        </div>
      </Modal>
    </AppViewer>
  );
};

export default ApiKeys;