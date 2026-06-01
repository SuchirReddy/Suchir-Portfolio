"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SubmitButton({ 
  children, 
  className = "", 
  variant = "primary",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "primary" | "secondary" | "danger" | "ghost" 
}) {
  const { pending } = useFormStatus();
  const [showSaved, setShowSaved] = useState(false);
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
      setShowSaved(false);
    } else if (wasPending.current && !pending) {
      wasPending.current = false;
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [pending]);

  // Determine base styles from variant
  const baseStyles = variant === "primary" 
    ? "bg-lime-300 text-black hover:bg-lime-400"
    : variant === "secondary"
    ? "border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
    : variant === "danger"
    ? "border border-red-400/30 text-red-200 hover:bg-red-400/10"
    : variant === "ghost"
    ? "bg-transparent hover:bg-white/10 text-white"
    : "";

  return (
    <button
      {...props}
      disabled={pending || props.disabled}
      className={`relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${baseStyles} ${pending ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : showSaved ? (
        <Check className={`h-4 w-4 ${variant === 'primary' ? 'text-black' : 'text-lime-400'}`} />
      ) : null}
      
      {showSaved && !pending ? "Saved!" : children}
    </button>
  );
}
