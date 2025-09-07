import { InputChangeEvent, AdvertisementType } from "@/types/dataType.type";
import React, { Dispatch, SetStateAction } from "react";
import Input from "./input";
import { MdLibraryAdd, MdOutlineDeleteForever } from "react-icons/md";
type InputProps = {
  data?: AdvertisementType;
  title: string;
  name?: string;
  type: keyof AdvertisementType;
  alert?: string;
  style?: string;
  disabled?: boolean;
  set: Dispatch<SetStateAction<AdvertisementType>>;
};

const InputTextList = ({
  title = "",
  data,
  name = "",
  type,
  set,
  disabled = false,
  style = "",
}: InputProps) => {
  const mainList = Array.isArray(data?.[type])
    ? [...(data?.[type] as string[])]
    : [];

  const onChangeHandler = (e: InputChangeEvent, index: number) => {
    const { value } = e.target;
    const updatedList = [...mainList];
    updatedList[index] = value;
    set((prev) => ({ ...prev, [type]: updatedList }));
  };

  const deleteHandler = (index: number) => {
    if (disabled) return;

    const updatedList = mainList.filter((_, i) => i !== index);
    set((prev) => ({ ...prev, [type]: updatedList }));
  };

  const addHandler = () => {
    if (disabled) return;

    set((prev) => ({ ...prev, [type]: [...mainList, ""] }));
  };

  return (
    <div className={`flex w-full flex-col gap-2 ${style}`}>
      <div className="flex w-full items-center justify-between">
        <h2>{title}</h2>
        <button
          type="button"
          onClick={addHandler}
          className={`text-s flex cursor-pointer items-center gap-1 rounded-2xl bg-blue-200 px-2 py-1 text-gray-500 ${disabled && "!cursor-not-allowed !bg-blue-50 !text-gray-700"}`}
        >
          <span>افزودن</span>
          <MdLibraryAdd className="" />
        </button>
      </div>
      {mainList.map((item, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between gap-2"
        >
          <Input
            FN={(e) => onChangeHandler(e, index)}
            data={item}
            name={String(index)}
            disabled={disabled}
            style="!mt-0 "
          />

          <button
            type="button"
            onClick={() => deleteHandler(index)}
            className={`flex h-13 cursor-pointer items-center gap-1 rounded-[14px]  bg-red-500 px-2 py-1 text-sm text-white ${disabled && "!cursor-not-allowed !bg-red-50 !text-gray-700"}`}
          >
            <span>حذف</span>
            <MdOutlineDeleteForever className="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default InputTextList;
