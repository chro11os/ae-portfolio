import React from "react";

// Renders the mobile layout below lg and the desktop layout from lg up.
// Both stay mounted (CSS-hidden), so they don't share state.
export const Responsive = ({ mobile, desktop }: { mobile: React.ReactNode; desktop: React.ReactNode }) => (
  <>
    <div className="lg:hidden">{mobile}</div>
    <div className="hidden lg:block">{desktop}</div>
  </>
);
