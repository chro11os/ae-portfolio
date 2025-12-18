"use client";
import React from "react";
import { SkillsDesktop } from "./SkillsDesktop";
import { SkillsMobile } from "./SkillsMobile";

export const Skills = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <SkillsMobile />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <SkillsDesktop />
      </div>
    </div>
  );
};