import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Bg_Modal from "./BgModal";
type FullModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  FN?: (item: any) => void;
  data?: Array<any>;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: string;
};
const FullModal: React.FC<FullModalProps> = ({
  modal,
  setModal,
  title,
  FN = () => {},
  data = [],
  icon = "",
  children,
  style = "",
}) => {
  return (
    <>
      <Bg_Modal modal={modal} setModal={setModal} />

      {modal && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-20 mx-auto my-auto h-fit w-[calc(100%-30px)] overflow-hidden rounded-3xl border border-gray-300 custom-bg-modal pt-1.5 md:w-[500px]">
          <div
            className="absolute top-0 right-0 left-0 z-30 mx-auto flex h-14 w-full items-center justify-between gap-2 border-b border-gray-300 custom-bg-modal px-4 py-2 font-semibold text-gray-500"
            onClick={() => setModal(false)}
          >
            <div className="flex items-center gap-4">
              {icon}
              <p>{title}</p>
            </div>
            <IoIosCloseCircle className="text-2xl text-gray-300" />
          </div>

          <div
            className={` relative mt-12 block text-leftright-0  max-h-[calc(100vh-150px)] w-full overflow-y-scroll rounded-md  bg-gray-100 dark:bg-white custom-bg-modal md:max-h-[550px] ${style} `}
          >
            {children}

            {data.map((i, index) => (
              <div
                onClick={() => FN(i)}
                className={`${
                  i?.disabled
                    ? "text"
                    : "font-bold text-gray-700 hover:bg-gray-200"
                } block border-b border-gray-300 px-4 py-1 text-right `}
                key={index}
              >
                {i?.name || i?.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FullModal;
