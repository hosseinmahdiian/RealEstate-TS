import React, { Dispatch, SetStateAction } from "react";
import RadioInput from "../module/RadioInput";
import { FaStarOfLife } from "react-icons/fa6";
import { onChengRadioHandel } from "@/function/functions";
import { AdvertisementType } from "@/types/dataType.type";
import { CategoryEnum } from "@/enum/enums.enum";
type RadioProps = {
  data?: string;
  title: string;
  alert?: string | false;
  disabled?: boolean;
  set: Dispatch<SetStateAction<AdvertisementType>>;
  style?: string;
};
const RadioCateGoresList = ({
  title,
  alert,
  disabled = false,
  style,
  set,
  data,
}: RadioProps) => {
  return (
    <div
      className={`relative mx-auto mt-6 h-13 w-full ${alert && "!mb-13"} ${style} `}
    >
      <label
        className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text-gray-500 transition-all ease-linear`}
      >
        {title}
      </label>
      <div
        className={`m relative mx-auto flex h-13 w-full items-center justify-between`}
      >
        <RadioInput
          title="ویلا"
          FN={(e) => onChengRadioHandel(set, e)}
          name="category"
          id={CategoryEnum.Villa}
          disabled={disabled}
          data={data}
        />
        <RadioInput
          title="آپارتمان"
          FN={(e) => onChengRadioHandel(set, e)}
          name="category"
          id={CategoryEnum.Apartment}
          disabled={disabled}
          data={data}
        />
        <RadioInput
          title="دفتر"
          FN={(e) => onChengRadioHandel(set, e)}
          name="category"
          id={CategoryEnum.Office}
          disabled={disabled}
          data={data}
        />
        <RadioInput
          title="مغازه"
          FN={(e) => onChengRadioHandel(set, e)}
          name="category"
          id={CategoryEnum.Store}
          disabled={disabled}
          data={data}
        />
      </div>

      {alert && (
        <label
          className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-red-400 transition-all ease-linear`}
        >
          <FaStarOfLife className="text-[10px]" />
          <p className="mt-0.5">{alert}</p>
        </label>
      )}
    </div>
  );
};

export default RadioCateGoresList;
