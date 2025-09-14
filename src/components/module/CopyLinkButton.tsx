"use client"; // بالای فایل

import { toast } from "react-hot-toast";

export default function CopyLinkButton() {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک کپی شد!");
    }
  };

  return <button onClick={handleCopy}>کپی لینک</button>;
}
