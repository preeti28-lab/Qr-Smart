import React from "react";
import ExpiredLayout from "./ExpiredLayout";

const TrialExpired = () => (
  <ExpiredLayout
    badge="Trial ended"
    heading="Your 7-day trial has"
    highlight="expired"
    subtext="You've explored everything — now make it yours. Upgrade to keep your data, workflows, and access fully intact."
  />
);

export default TrialExpired;