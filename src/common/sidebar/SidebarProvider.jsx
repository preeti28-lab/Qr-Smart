// PATH: src/common/sidebar/SidebarProvider.jsx
import React, { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FiClock, FiAlertTriangle, FiZap } from "react-icons/fi";
import SideLink from "./SideLink";
import SliderSidebar from "./SliderSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../../redux/features/action";
import { useNavigate } from "react-router-dom";
import PlanExpireModal from "../../components/ui/PlanExpireModal";

/* Sidebar surface: a visible navy gradient pulled from the brand top-bar
   (#104cd9 → #002273) and darkened, so the panel reads as part of the same
   family instead of a flat near-black slab. */
const SIDEBAR_SURFACE =
  "linear-gradient(168deg, #10224d 0%, #0d1730 38%, #0b111f 72%, #090c16 100%)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getTimeLeft = (endDateStr) => {
  if (!endDateStr) return null;
  const diff = new Date(endDateStr) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, totalMs: 0 };
  return {
    totalMs: diff,
    days: Math.ceil(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
  };
};

const formatEndDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Trial Banner ─────────────────────────────────────────────────────────────

const TrialBanner = ({ trialEndDate, onUpgrade }) => {
  const TRIAL_TOTAL_DAYS = 7;
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(trialEndDate));

  useEffect(() => {
    if (!trialEndDate) return;
    const id = setInterval(
      () => setTimeLeft(getTimeLeft(trialEndDate)),
      60_000,
    );
    return () => clearInterval(id);
  }, [trialEndDate]);

  if (!timeLeft || timeLeft.totalMs === 0) return null;

  const percent = Math.max(
    0,
    Math.min(100, (timeLeft.days / TRIAL_TOTAL_DAYS) * 100),
  );
  const urgency = timeLeft.days <= 1;

  return (
    <div
      className={`mx-2.5 mb-3 rounded-2xl p-3 relative overflow-hidden border ${
        urgency
          ? "border-red-500/25 bg-red-950/40"
          : "border-indigo-500/25 bg-indigo-950/40"
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          urgency ? "via-red-500/50" : "via-indigo-400/50"
        }`}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {urgency ? (
            <FiAlertTriangle size={11} className="text-red-400 flex-shrink-0" />
          ) : (
            <FiClock size={11} className="text-indigo-400 flex-shrink-0" />
          )}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              urgency ? "text-red-400" : "text-indigo-400"
            }`}
          >
            Trial Plan
          </span>
        </div>

        <button
          onClick={onUpgrade}
          className="rounded-full text-[11px] font-bold text-white px-2.5 py-1 border-none cursor-pointer"
          style={{
            background: urgency
              ? "linear-gradient(131.35deg, #dc2626 0%, #991b1b 100%)"
              : "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)",
          }}
        >
          Upgrade ↑
        </button>
      </div>

      <p
        className={`text-[13px] font-bold mb-2 ${
          urgency ? "text-red-100" : "text-indigo-100"
        }`}
      >
        {timeLeft.days > 0
          ? `${timeLeft.days} day${timeLeft.days !== 1 ? "s" : ""} left`
          : "Last day of trial"}
      </p>

      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            urgency
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : "bg-gradient-to-r from-indigo-400 to-violet-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

// ─── Subscription Banner ──────────────────────────────────────────────────────

const SubscriptionBanner = ({ userData, onUpgrade }) => {
  const endDate = userData?.subscriptionEndDate;
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    if (!endDate) return;
    const id = setInterval(
      () => setTimeLeft(getTimeLeft(endDate)),
      60_000,
    );
    return () => clearInterval(id);
  }, [endDate]);

  // Backend flag is authority — only show expired if backend also confirms inactive
  const isExpired =
    (!timeLeft || timeLeft.totalMs === 0) &&
    userData?.isSubscriptionActive === false;

  const planDurationMs =
    userData?.subscriptionStartDate && endDate
      ? new Date(endDate) - new Date(userData.subscriptionStartDate)
      : null;

  const percent =
    planDurationMs && timeLeft && timeLeft.totalMs > 0
      ? Math.max(0, Math.min(100, (timeLeft.totalMs / planDurationMs) * 100))
      : userData?.isSubscriptionActive
        ? 100
        : 0;

  const formatTime = () => {
    if (!timeLeft || timeLeft.totalMs === 0) return null;
    if (timeLeft.days > 1) return `${timeLeft.days} days left`;
    if (timeLeft.days === 1) return `1 day left`;
    if (timeLeft.hours > 0) return `${timeLeft.hours}h left`;
    return "Expiring soon";
  };

  const timeDisplay = formatTime();
  const urgency =
    !isExpired && timeLeft && timeLeft.days === 0 && timeLeft.totalMs > 0;

  // ── Expired ──
  if (isExpired) {
    return (
      <div className="mx-2.5 mb-3 rounded-2xl border border-red-500/30 bg-red-950/40 p-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="flex items-center gap-1.5 mb-1.5">
          <FiAlertTriangle size={11} className="text-red-400 flex-shrink-0" />
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
            Plan Expired
          </span>
        </div>

        <p className="text-white/80 text-[12px] font-medium mb-3 leading-snug">
          {userData?.lastActivePlan?.name || "Subscription"} has ended
        </p>

        <button
          onClick={onUpgrade}
          className="w-full rounded-lg py-1.5 text-[11px] font-bold text-white border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer"
          style={{
            background: "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)",
          }}
        >
          Renew Plan →
        </button>
      </div>
    );
  }

  // ── Active ──
  return (
    <div
      className="mx-2.5 mb-3 rounded-xl p-3 relative overflow-hidden"
      style={{
        background: "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FiZap size={11} className="text-white/70 flex-shrink-0" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest truncate">
            {userData?.currentPlan?.name || "Active Plan"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 rounded-full bg-white/90" />
            <div className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
          </div>
          <span className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">
            Active
          </span>
        </div>
      </div>

      {timeDisplay && (
        <p
          className={`text-[13px] font-bold mb-1 leading-tight ${
            urgency ? "text-yellow-200" : "text-white"
          }`}
        >
          {timeDisplay}
        </p>
      )}

      <p className="text-white/70 text-[10px] mb-2.5 leading-tight">
        Expires {formatEndDate(endDate)}
      </p>

      <div className="h-1 rounded-full bg-white/15 overflow-hidden">
        <div
          className="h-full rounded-full bg-white/70 transition-all duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

// ─── Expired Subscription Banner (sidebar) ────────────────────────────────────

const ExpiredSubscriptionBanner = ({ userData, onUpgrade }) => {
  return (
    <div className="mx-2.5 mb-3 rounded-2xl border border-red-500/30 bg-red-950/40 p-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="flex items-center gap-1.5 mb-1.5">
        <FiAlertTriangle size={11} className="text-red-400 flex-shrink-0" />
        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
          Plan Expired
        </span>
      </div>

      <p className="text-white/80 text-[12px] font-medium mb-3 leading-snug">
        {userData?.lastActivePlan?.name || "Subscription"} has ended
      </p>

      <button
        onClick={onUpgrade}
        className="w-full rounded-lg py-1.5 text-[11px] font-bold text-white border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer"
        style={{
          background: "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)",
        }}
      >
        Renew Plan →
      </button>
    </div>
  );
};

// ─── Main SidebarProvider ─────────────────────────────────────────────────────

const SidebarProvider = ({ collapse, onCollapse = () => {}, links = [] }) => {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => state.action);
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCollapse = () => onCollapse(!collapse);
  const onClose = () => dispatch(setAction({ sidebar: false }));

  useEffect(() => {
    if (navigate) onClose();
  }, [navigate]);

  const MainComponent = () => {
    const [open, setOpen] = useState(false);

    // Tick every minute to re-evaluate live date conditions
    const [, setTick] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setTick((t) => t + 1), 60_000);
      return () => clearInterval(id);
    }, []);

    // ── Live date flags ──
    const now = new Date();

    const trialEnd = userData?.trialEndDate
      ? new Date(userData.trialEndDate)
      : null;
    const isTrialLive = trialEnd && now < trialEnd;

    const subEnd = userData?.subscriptionEndDate
      ? new Date(userData.subscriptionEndDate)
      : null;
    const isSubscriptionLive =
      subEnd && now < subEnd && userData?.isSubscriptionActive === true;

    // Did user ever purchase a plan?
    const everPurchased =
      userData?.lastActivePlan !== null &&
      userData?.lastActivePlan !== undefined;

    // accessType === "expired" means both trial and subscription are done
    const isFullyExpired = userData?.accessType === "expired";

    // ── What to show in sidebar ──
    const showTrialBanner = !collapse && token && isTrialLive;
    const showSubscriptionBanner = !collapse && token && isSubscriptionLive;
    // Show expired banner in sidebar only if fully expired AND purchased before
    const showExpiredBanner =
      !collapse &&
      token &&
      isFullyExpired &&
      everPurchased &&
      !isTrialLive &&
      !isSubscriptionLive;

    return (
      <>
        <div
          className="relative flex flex-col h-full w-full border-r border-white/[0.06] overflow-hidden"
          style={{ background: SIDEBAR_SURFACE }}
        >
          {/* brand glow — top-left, echoes the gradient on the header bar */}
          <div className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-[#1B57E3]/25 blur-3xl pointer-events-none" />
          {/* cooler counter-glow at the base so the panel doesn't flatten out */}
          <div className="absolute -bottom-24 -right-12 w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          {/* hairline highlight along the right edge */}
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-between px-3 pt-5 pb-3">
            {!collapse && token && (
              <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                <p className="text-sm font-semibold text-slate-100 truncate leading-tight">
                  {userData?.contactInformation?.name ||
                  userData?.contactInformation?.surname
                    ? `${userData?.contactInformation?.name || ""} ${
                        userData?.contactInformation?.surname || ""
                      }`.trim()
                    : "User"}
                </p>
              </div>
            )}

            {!collapse ? (
              <>
                <button
                  onClick={handleCollapse}
                  className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center bg-white/5 border border-white/[0.08] text-white/40 hover:bg-indigo-500/15 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-200 flex-shrink-0"
                >
                  <RxHamburgerMenu size={14} />
                </button>
                <button
                  onClick={onClose}
                  className="flex lg:hidden w-8 h-8 rounded-lg items-center justify-center bg-white/5 border border-white/[0.08] text-white/40 hover:bg-indigo-500/15 hover:border-indigo-500/30 hover:text-indigo-300 transition-all duration-200 flex-shrink-0"
                >
                  <RxCross2 size={14} />
                </button>
              </>
            ) : (
              <button
                onClick={handleCollapse}
                className="w-full flex items-center justify-center h-8"
              >
                <RxHamburgerMenu size={16} className="text-white/60" />
              </button>
            )}
          </div>

          {!collapse && (
            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          )}

          <div
            className={`flex flex-col flex-1 overflow-y-auto px-2 py-2 gap-1 ${
              collapse ? "items-center" : ""
            }`}
          >
            {links.map(
              (
                { text = "", icon, active = false, excess = true, path = "" },
                index,
              ) =>
                excess ? (
                  <SideLink
                    key={index}
                    text={collapse ? "" : text}
                    active={active}
                    icon={icon}
                    path={path}
                    collapse={collapse}
                  />
                ) : null,
            )}
          </div>

          {(showTrialBanner || showSubscriptionBanner || showExpiredBanner) && (
            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-3" />
          )}

          {showTrialBanner && (
            <TrialBanner
              trialEndDate={userData.trialEndDate}
              onUpgrade={() => setOpen(true)}
            />
          )}

          {showSubscriptionBanner && (
            <SubscriptionBanner
              userData={userData}
              onUpgrade={() => setOpen(true)}
            />
          )}

          {showExpiredBanner && (
            <ExpiredSubscriptionBanner
              userData={userData}
              onUpgrade={() => setOpen(true)}
            />
          )}

          <div className="pb-2" />
        </div>

        <PlanExpireModal
          open={open}
          onClose={() => setOpen(false)}
          onUpgrade={() => console.log("Upgrade clicked")}
        />
      </>
    );
  };

  return (
    <>
      <SliderSidebar isOpen={sidebar} setIsOpen={onClose}>
        <MainComponent />
      </SliderSidebar>

      <section
        className={`${
          collapse ? "w-[64px]" : "w-0 lg:w-[240px] xl:w-[290px]"
        } transition-all duration-300 flex flex-col h-screen sticky top-0 left-0`}
      >
        <MainComponent />
      </section>
    </>
  );
};

export default SidebarProvider;