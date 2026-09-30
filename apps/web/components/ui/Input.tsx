"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-muted mb-2 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`
              w-full bg-bg-card border border-border rounded-lg
              px-4 py-3 text-text-main placeholder:text-text-muted/50
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
              transition-colors duration-200
              ${icon ? "pl-10" : ""}
              ${isPassword ? "pr-10" : ""}
              ${error ? "border-error focus:border-error focus:ring-error/30" : ""}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
