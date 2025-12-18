"use client";
import React from "react";
import { AboutDesktop } from "./AboutDesktop";
import { AboutMobile } from "./AboutMobile";

export const About = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW (Visible on screens smaller than lg) */}
      <div className="block lg:hidden">
        <AboutMobile />
      </div>

      {/* DESKTOP VIEW (Visible on lg screens and up) */}
      <div className="hidden lg:block">
        <AboutDesktop />
      </div>
    </div>
  );
};