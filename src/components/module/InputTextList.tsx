import { InputChangeEvent, ProfileDataType } from "@/types/dataType.type";
import React, { Dispatch, SetStateAction } from "react";
import Input from "./input";
import { MdLibraryAdd, MdOutlineDeleteForever } from "react-icons/md";
type InputProps = {
  data?: ProfileDataType;
  title: string;
  name?: string;
  type: keyof ProfileDataType;
  alert?: string;
  style?: string;
  disabled?: boolean;
  set: Dispatch<SetStateAction<ProfileDataType>>;
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
    const updatedList = mainList.filter((_, i) => i !== index);
    set((prev) => ({ ...prev, [type]: updatedList }));
  };

  const addHandler = () => {
    set((prev) => ({ ...prev, [type]: [...mainList, ""] }));
  };

  return (
    <div className={`flex w-full flex-col gap-2 ${style}`}>
      <div className="flex w-full items-center justify-between">
        <h2>{title}</h2>
        <button
          type="button"
          onClick={addHandler}
          className="flex items-center gap-1 rounded-2xl border bg-blue-500 px-2 py-1 text-sm text-white"
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
            className="flex h-13 items-center gap-1 rounded-[14px] border bg-red-500 px-2 py-1 text-sm text-white"
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
