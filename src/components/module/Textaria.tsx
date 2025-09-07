"use client";
import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { FaStarOfLife } from "react-icons/fa6";
import Bg_Modal from "./BgModal";

type InputProps = {
  data?: string;
  title: string;
  name: string;
  alert?: string;
  style?: string;
  disabled?: boolean;
  FN?: (e: { target: { name: string; value: string } }) => void;
};

const TextAria = ({
  style = "",
  alert = "",
  name,
  title,
  data = "",
  disabled = false,
  FN = () => {},
}: InputProps) => {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <div
      className={` ${style} relative mx-auto mt-6 h-fit w-full overflow-hidden ${alert && "!mb-13"} `}
    >
      <Bg_Modal
        modal={disabled}
        setModal={() => {}}
        z="!absolute !z-[100000] top-0 !bg-gray-300 !cursor-not-allowed"
      />

      <label
        htmlFor={name}
        className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text-gray-500 transition-all ease-linear`}
      >
        {title}
      </label>
      <SimpleMDE
        id={name}
        value={value}
        onChange={(val) => {
          setValue(val);
          FN({ target: { name, value: val } });
        }}
      />
      {alert && (
        <label
          htmlFor={name}
          className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-red-400 transition-all ease-linear`}
        >
          <FaStarOfLife className="text-[10px]" />
          <p className="mt-0.5">{alert}</p>
        </label>
      )}
    </div>
  );
};

export default TextAria;
