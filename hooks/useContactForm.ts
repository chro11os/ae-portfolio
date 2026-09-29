import { useState } from "react";

// Contact form state; submitting opens the visitor's mail client via mailto.
export const useContactForm = (email: string) => {
  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const body = `Name: ${name}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return { formData, handleChange, handleSubmit };
};
