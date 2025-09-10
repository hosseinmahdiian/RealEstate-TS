import React from "react";
type InputProps = {
  FN?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  data: boolean;
  title?: string;
  disabled?: boolean;
  style?: string;
  alert?: string;
};
const CheckBox = ({
  title = "",
  data = false,
  FN = () => {},
  disabled = false,
  name = "",
}: InputProps) => {
  return (
    <div className="items ] my-4 flex justify-between gap-3 border-gray-100 px-5">
      <p> {title}</p>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          id={name}
          disabled={disabled}
          checked={data}
          className="peer sr-only"
          onChange={FN}
          name={name}
        />
        <label
          htmlFor={name}
          className="peer relative h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
        ></label>
      </label>
    </div>
  );
};

export default CheckBox;
