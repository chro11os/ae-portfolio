import { useState } from "react";

interface Social {
  label: string;
  url: string;
}

interface ContactConfig {
  email: string;
  socials: Social[];
  [key: string]: any;
}

export const useContactForm = (contactConfig: ContactConfig) => {
  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });
  
  const filteredSocials = contactConfig.socials.filter(
    (social: Social) => !["behance", "github"].includes(social.label.toLowerCase())
  );
  
  // ... rest same ...

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const mailtoLink = `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}

Message:
${message}`)}`;
    window.location.href = mailtoLink;
  };

  return { formData, handleChange, handleSubmit, filteredSocials };
};