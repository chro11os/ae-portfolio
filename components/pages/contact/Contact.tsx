"use client";
import React from "react";
import { ContactDesktop } from "./ContactDesktop";
import { ContactMobile } from "./ContactMobile";

export const Contact = () => {
  return (
    <div className="w-full">
      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <ContactMobile />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <ContactDesktop />
      </div>
    </div>
  );
};