"use client";
import React from "react";
import { WorksDesktop } from "./WorksDesktop";
import { WorksMobile } from "./WorksMobile";

export const Works = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <WorksMobile />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <WorksDesktop />
      </div>
    </div>
  );
};