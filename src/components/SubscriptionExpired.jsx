import React from "react";
import ExpiredLayout from "./ExpiredLayout";

const SubscriptionExpired = () => (
  <ExpiredLayout
    badge="Subscription ended"
    heading="Your subscription has"
    highlight="expired"
    subtext="Your plan has come to an end. Renew now to restore full access and pick up right where you left off."
  />
);

export default SubscriptionExpired;