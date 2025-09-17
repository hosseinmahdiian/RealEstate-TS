"use client";

import { useTheme } from "next-themes";
import CheckBox from "./checkBox";
import { AiFillSun } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-5">
      <AiFillSun className="text-gray-500 dark:text-white" />
      <CheckBox
        name="mode"
        FN={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        data={theme === "dark" ? true : false}
      />
      <BsMoonFill className="text-gray-500 dark:text-white" />{" "}
    </div>
  );
}
