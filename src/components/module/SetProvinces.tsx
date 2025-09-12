import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaMap } from "react-icons/fa";
import { provinces } from "@/constant/city&province";
import { IoIosArrowDown, IoIosArrowUp, IoIosCloseCircle } from "react-icons/io";
import Bg_Modal from "./BgModal";
import { AdvertisementType } from "@/types/dataType.type";
import { FaStarOfLife } from "react-icons/fa6";
type InputProps = {
  province?: string;
  setData: Dispatch<SetStateAction<AdvertisementType>>;
  setProvince: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
      slug: string;
      tel_prefix: string;
    }>
  >;
  alert: string;
  disabled?: boolean;
};
const SetProvinces = ({
  setData,
  setProvince,
  province,
  alert,
  disabled = true,
}: InputProps) => {
  useEffect(() => {}, []);
  const [modal, setModal] = useState<boolean>(false);
  console.log(disabled);

  return (
    <>
      <Bg_Modal modal={modal} setModal={setModal} />

      <div
        onClick={() => {
          !disabled && setModal(true);
        }}
        className={`${disabled && `!bg-gray-200`} bg-wite relative flex h-12 w-1/2 items-center justify-between rounded-[10px] border border-gray-300 px-5 !text-gray-500 outline-gray-300`}
      >
        {province ? <p className="line-clamp-1">{province}</p> : <p className="!text-black">استان</p>}
        {modal ? <IoIosArrowUp /> : <IoIosArrowDown />}
        {alert && (
          <div
            className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-red-400 transition-all ease-linear`}
          >
            <FaStarOfLife className="text-[10px]" />
            <p className="mt-0.5">{alert}</p>
          </div>
        )}
      </div>

      {modal && !disabled && (
        <div className="px- child:bg-white fixed top-0 right-0 bottom-0 left-0 z-20 mx-auto my-auto h-fit w-[calc(100%-30px)] gap-2 overflow-hidden rounded-3xl border border-gray-300 bg-white py-1 md:right-0 md:left-0 md:w-[500px]">
          <div
            className="absolute top-0 right-0 left-0 z-30 mx-auto flex h-14 w-[calc(100%)] items-center justify-between gap-2 border-b bg-white px-4 py-2 font-semibold text-gray-500"
            onClick={() => setModal(false)}
          >
            <div className="flex items-center gap-4">
              <FaMap className="text-2xl text-gray-300" />

              <p> انتخاب استان</p>
            </div>
            <IoIosCloseCircle className={`text-2xl text-gray-300`} />
          </div>

          <div className="p relative mt-12 block text-left">
            <div
              dir=""
              className={`right-0 mt-2 h-[calc(100vh-150px)] w-full overflow-y-scroll rounded-md bg-white md:max-h-[550px]`}
            >
              {provinces.map((i, index) => (
                <div
                  onClick={() => {
                    setProvince(i);
                    setModal(false);
                    setData((prev) => ({
                      ...prev,
                      province: i.name,
                      city: "",
                    }));
                  }}
                  className="block px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  key={index}
                  // value={i.id}
                >
                  {i?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetProvinces;
