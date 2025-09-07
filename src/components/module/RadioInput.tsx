import React from "react";

type InputProps = {
  FN?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data?: string;
  name?: string;
  id?: string;
  title?: string;
  disabled?: boolean;
  style?: string;
  alert?: string;
};

const RadioInput = ({
  FN = () => {},
  data = "",
  name = "",
  id = "",
  title = "",
  disabled = false,
}: InputProps) => {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-center gap-2`}>
      <span className="text-gray-700">{title}</span>
      <input
        id={id}
        name={name}
        type="radio"
        checked={data === id} 
        disabled={disabled}
        onChange={FN}
        className={`h-4 w-4 ${
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-600"
            : "text-gray-500"
        }`}
      />
    </label>
  );
};

export default RadioInput;
