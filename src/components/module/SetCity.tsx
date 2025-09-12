import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosCloseCircle } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { FaMap } from "react-icons/fa";
import { setStateClickHadneler } from "@/constant/city&province";
import Bg_Modal from "./BgModal";
import { AdvertisementType } from "@/types/dataType.type";
import { FaStarOfLife } from "react-icons/fa6";
type InputProps = {
  setData: Dispatch<SetStateAction<AdvertisementType>>;
  city?: string;
  province: {
    id: number;
    name: string;
    slug: string;
    tel_prefix: string;
  };
  alert: string;
  disabled?: boolean;
};

const SetCities = ({
  setData,
  province,
  city,
  alert,
  disabled = false,
}: InputProps) => {
  const [modal, setModal] = useState<boolean>(false);

  const [cities, setCities] = useState<
    {
      id: number;
      name: string;
      slug: string;
      province_id: string;
    }[]
  >([]);
  useEffect(() => {
    !!province && setStateClickHadneler(province?.id, setCities);
  }, [province]);

  return (
    <>
      <Bg_Modal modal={modal} setModal={() => {}} />

      <div
        onClick={() => (province?.name && !disabled) && setModal(true)}
        className={`${!(!province?.name || !disabled) && `!bg-gray-200`} relative flex h-12 w-1/2 items-center justify-between rounded-[10px] border border-gray-300 bg-white px-5 outline-gray-300`}
      >
        {city ? (
          <p className={`line-clamp-1 !text-gray-500`}>{city}</p>
        ) : (
          <p
            className={`${province?.name ? `!text-black` : `!text-gray-500`} `}
          >
            شهر
          </p>
        )}
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
        <div className="child:bg-white fixed top-0 right-0 bottom-0 left-0 z-[20] mx-auto my-auto h-fit w-[calc(100%-30px)] gap-2 overflow-hidden rounded-3xl border border-gray-300 bg-white py-1 md:right-0 md:left-0 md:w-[400px]">
          <div
            className="absolute top-0 right-0 left-0 z-30 mx-auto flex h-14 w-[calc(100%)] items-center justify-between gap-2 border-b bg-white px-4 py-2 font-semibold text-gray-500"
            onClick={() => setModal(false)}
          >
            <div className="flex items-center gap-4">
              <FaMap className="text-2xl text-gray-300" />
              <p> انتخاب شهر</p>
            </div>
            <IoIosCloseCircle className={`text-2xl`} />
          </div>

          <div
            className={`s right-0 z-10 mt-10 h-[calc(100vh-150px)] w-full origin-top-right overflow-y-scroll rounded-md bg-white py-1 focus:outline-none md:max-h-[550px]`}
          >
            {cities &&
              cities?.map((i, index) => (
                <div
                  onClick={() => {
                    setData((data) => ({ ...data, city: i.name }));
                    setModal(false);
                  }}
                  className="block px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  key={index}
                >
                  {i.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SetCities;
