import React, { Dispatch, SetStateAction } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AdvertisementType } from "@/types/dataType.type";
import Bg_Modal from "./BgModal";
import { FaStarOfLife } from "react-icons/fa6";
type InputProps = {
  data?: string;
  title?: string;
  name?: string | keyof AdvertisementType;
  alert?: string | false;
  disabled?: boolean;
  set: Dispatch<SetStateAction<AdvertisementType>>;
  style?: string;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};
const Calender = ({
  title = "",
  name = "",
  data,
  set,
  alert,
  modal,
  style = "",
  setModal,
  disabled = false,
}: InputProps) => {
  return (
    <>
      <Bg_Modal modal={modal} setModal={setModal} />
      <div
        className={`text-middle mt relative mx-auto h-8 w-full lg:col-span-6 ${style} ${
          alert && "!mb-13"
        } flex cursor-pointer items-center rounded-lg px-3 py-2`}
        onClick={() => {
          !disabled && setModal(true);
        }}
      >
        <p className="start-1 -top-3 px-2 text-sm ">
          تاریخ ساخت
        </p>

        <p className={`${disabled &&" !bg-blue-50 cursor-not-allowed !text-gray-700"} w-fit rounded-lg bg-blue-200 px-2 pt-0.5 text-gray-500`}>
          {String(data || "انتخاب تاریخ")}
        </p>

        {alert && (
          <div className="absolute start-1 -bottom-6 flex items-center gap-2 text-sm text-red-400">
            <FaStarOfLife className="text-[10px]" />
            <span className="mt-0.5">{String(alert)}</span>
          </div>
        )}
      </div>
      <Calendar
        className={`fixed top-1/4 right-0 left-0 z-[150] mx-auto !rounded-[14px] p-5 ease-in-out ${modal ? "" : "hidden"} `}
        value={data}
        // id={name}
        // name={name}
        calendar={persian}
        locale={persian_fa}
        // calendarPosition="bottom-right"
        onChange={(date) => {
          set((prev) => ({
            ...prev,
            [name]: `${date?.year}/${date?.month.number}/${date?.day}`,
          }));
          setModal(false);
        }}
      />
    </>
  );
};

export default Calender;
