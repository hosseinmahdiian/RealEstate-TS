import React from "react";
import { BeatLoader } from "react-spinners";
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
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={FN}
      className={`${
        !isLoading && !disabled
          ? "bg-blue-500 text-white"
          : "cursor-not-allowed bg-gray-200 text-gray-600"
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
