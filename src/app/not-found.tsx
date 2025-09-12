import Link from "next/link";
export const metadata = {
  title: "404",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        صفحه پیدا نشد
      </h2>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
