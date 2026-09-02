import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../common/sidebar/Sidebar";
import AppNavbar from "../common/appNavbar/AppNavbar";
import TrialExpired from "../components/TrialExpired";
import SubscriptionExpired from "../components/SubscriptionExpired";

const AppViewer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Tick every minute to re-evaluate live date conditions
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const location = useLocation();
  const { userData } = useSelector((state) => state.user);

  const restrictedRoutes = ["/builder", "/bulk-qr-code-generator"];
  const isRestrictedRoute = restrictedRoutes.includes(location.pathname);

  // Live date checks
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

  // If either is still live — show content, no walls
  const hasAccess = isTrialLive || isSubscriptionLive;

  // Use accessType + lastActivePlan to determine WHICH expired wall to show.
  // Priority: if user ever purchased a plan → SubscriptionExpired
  //           if only trial was used → TrialExpired
  const everPurchased =
    userData?.lastActivePlan !== null && userData?.lastActivePlan !== undefined;

  const isExpiredState =
    isRestrictedRoute && !hasAccess && userData?.accessType === "expired";

  const renderContent = () => {
    if (!isRestrictedRoute) return children;
    if (hasAccess) return children;

    if (isExpiredState) {
      // They purchased a plan before → show subscription expired
      if (everPurchased) return <SubscriptionExpired />;
      // Only ever used trial → show trial expired
      return <TrialExpired />;
    }

    return children;
  };

  return (
    <div className="w-full flex justify-start items-start">
      <Sidebar collapse={isOpen} onCollapse={setIsOpen} />
      <div className="w-full min-w-0">
        <AppNavbar />
        {renderContent()}
      </div>
    </div>
  );
};

export default AppViewer;
