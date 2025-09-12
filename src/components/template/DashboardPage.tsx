"use client";
type Props = {
  fullName?: string;
  email?: string;
  mobile?: string;
  createdAt?: string;
  role?: string;
};
const DashboardPage = ({
  mobile,
  email,
  fullName,
  createdAt,
  role = "USER",
}: Props) => {
  return (
    <div className="w-full">
      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold"> نام کامل:</span>{" "}
          {fullName || "ثبت نشده"}
        </p>
        <p>
          <span className="font-semibold"> ایمیل:</span> {email}
        </p>
        <p>
          <span className="font-semibold"> موبایل:</span> {mobile || "ثبت نشده"}
        </p>
        <p>
          <span className="font-semibold"> تاریخ عضویت:</span> {createdAt}
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
          onClick={() => console.log("ویرایش کلیک شد")}
        >
          ✏️ ویرایش اطلاعات
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
