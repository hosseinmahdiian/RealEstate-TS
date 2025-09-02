import { useState, type FC } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
type InputProps = {
  FN?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data?: string;
  name?: string;
  type?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: string;
  alert?: string;
};
const Input: FC<InputProps> = ({
  FN = () => {},
  data = "",
  name = "",
  type = "text",
  inputMode = "none",
  title = "",
  placeholder = "",
  disabled = false,
  style = "",
  alert = "",
}) => {
  const [eye, setEye] = useState<boolean>(true);

  return (
    <div
      className={` ${style} relative mx-auto mt-6 h-13 w-full ${alert && "!mb-13"} `}
    >
      <label
        htmlFor={name}
        className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text-gray-500 transition-all ease-linear`}
      >
        {title}
      </label>
      <input
        className={`${
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-600"
            : "text-gray-500"
        } peer h-full w-full rounded-[14px] border border-gray-300 px-5 placeholder-gray-400 outline-gray-300 focus:placeholder-transparent`}
        id={name}
        name={name}
        disabled={disabled}
        type={type === "password" ? (eye ? "password" : "text") : type}
        value={data}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={FN}
      />

      {alert && (
        <label
          htmlFor={name}
          className={`absolute start-1 -bottom-6 !h-fit flex items-center gap-2  text-sm text-red-400 transition-all ease-linear`}
        >
          <FaStarOfLife className="text-[10px]" />
          <p className="mt-0.5">{alert}</p>
        </label>
      )}
      {type === "password" && (
        <label
          className={`absolute end-1 mt-1 h-full w-10 px-2 pt-2.5 text-xl text-gray-400`}
          onClick={() => {
            setEye((i) => !i);
          }}
        >
          {eye ? <IoMdEyeOff /> : <IoMdEye />}
        </label>
      )}
    </div>
  );
};
export default Input;
