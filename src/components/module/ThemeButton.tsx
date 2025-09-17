"use client";

import { useTheme } from "next-themes";
import CheckBox from "./checkBox";
import { AiFillSun } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-5">
      {theme === "light" ? (
        <AiFillSun
          className="text-gray-500 dark:text-white"
          onClick={() => {
            setTheme(String(theme) === "dark" ? "light" : "dark");
          }}
        />
      ) : (
        <BsMoonFill
          className="text-gray-500 dark:text-white"
          onClick={() => {
            setTheme(String(theme) === "dark" ? "light" : "dark");
          }}
        />
      )}
    </div>
  );
}
