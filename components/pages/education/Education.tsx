"use client";
import React from "react";
import { EducationDesktop } from "./EducationDesktop";
import { EducationMobile } from "./EducationMobile";

export const Education = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <EducationMobile />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <EducationDesktop />
      </div>
    </div>
  );
};