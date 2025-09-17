"use client";

import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";

type ButtonProps = {
  FN?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title: string;
  style?: string;
  isLoading?: boolean;
  type?: "button" | "reset" | "submit";
};

const Button: React.FC<ButtonProps> = ({
  FN = () => {},
  disabled = false,
  title,
  isLoading = false,
  style = "",
  type = "button",
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // قبل از mount چیزی render نشه

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={FN}
      className={`${
        !isLoading && !disabled ? "button-Active" : "button-DiActive"
      } mt-6 block h-12 w-full rounded-[14px] ${style}`}
    >
      {isLoading ? (
        <BeatLoader color="#3b82f6" size={15} className="mt-2" />
      ) : (
        <p className="font-bold">{title}</p>
      )}
    </button>
  );
};

export default Button;
