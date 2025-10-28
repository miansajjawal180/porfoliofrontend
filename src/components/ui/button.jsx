import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "font-semibold rounded-md transition-all duration-300 focus:outline-none";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    ghost: "bg-transparent text-white hover:text-yellow-400",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
