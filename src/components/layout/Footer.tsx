
const Footer = () => {
  return (
   <div className="absolute -bottom-40 w-full inset-x-0   rounded-2xl bg-blue-500 px-6 py-4 text-white shadow-lg md:flex md:items-center md:justify-between">
  {/* متن معرفی */}
  <div className="text-center md:text-right">
    <h3 className="text-xl font-bold">سامانه خرید و اجاره ملک</h3>
    <p className="text-sm opacity-90">خرید و اجاره آسان ملک را با ما تجربه کنید</p>
  </div>

  {/* لیست امکانات */}
  <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:mt-0 md:justify-end">
    <li>تعرفه قانونی</li>
    <li>دسترسی سریع</li>
    <li>مشاورین خبره</li>
    <li>قولنامه محضری</li>
  </ul>
</div>

  );
};

export default Footer;
