"use client";
import React from "react";
import { PapersDesktop } from "./PapersDesktop";
import { PapersMobile } from "./PapersMobile";

export const Papers = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <PapersMobile />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <PapersDesktop />
      </div>
    </div>
  );
};