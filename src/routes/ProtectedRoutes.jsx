import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({
  children,
  redirect,
  isAuthenticated,
  paidPlan,
  trialPlanUsed,
  role,
}) => {
  if (!isAuthenticated || (!trialPlanUsed === true && paidPlan === false)) {
    return <Navigate to={redirect} />;
  } else if (role === "user") {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;

// to understand this condition use gpt to give chart
