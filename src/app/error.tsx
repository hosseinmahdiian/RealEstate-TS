"use client";

import { useEffect } from "react";

export const metadata = {
  title: "مشکلی پیش آمده",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {/* <Alert className="h-10 w-10" /> */}
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-800">
        اوه! یه مشکلی پیش اومد
      </h2>

      <p className="mb-6 max-w-md text-gray-500">
        متأسفیم، در پردازش درخواست شما خطایی رخ داد. لطفاً دوباره امتحان کنید.
      </p>

      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
