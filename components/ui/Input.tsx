import React from "react";

const baseStyles = "w-full bg-white/40 backdrop-blur-xl border border-white/40 text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-pink/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: "xl" | "2xl";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", rounded = "xl", ...props }, ref) => {
    const radius = rounded === "xl" ? "rounded-xl" : "rounded-2xl";
    return (
      <input
        ref={ref}
        className={`${baseStyles} ${radius} px-5 py-3 md:px-6 md:py-4 text-sm md:text-base ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rounded?: "xl" | "2xl";
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", rounded = "xl", ...props }, ref) => {
    const radius = rounded === "xl" ? "rounded-xl" : "rounded-2xl";
    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${radius} px-5 py-3 md:px-6 md:py-4 text-sm md:text-base resize-none ${className}`}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";