import React, { useEffect } from "react";
type BgModalProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  z?: string;
  FN?: () => void;
};
const Bg_Modal: React.FC<BgModalProps> = ({
  modal,
  setModal,
  z = "z-20",
  FN = () => {},
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (modal) document.documentElement.classList.add("!overflow-y-hidden");
    }, 100);
    return () => {
      document.documentElement.classList.remove("!overflow-y-hidden");
    };
  }, [modal]);

  return (
    modal && (
      <div
        onClick={() => {
          setModal(false);
          FN();
          console.log("//");
        }}
        className={`fixed -top-0 right-0 left-0 h-full w-full bg-black ${z} opacity-30`}
      />
    )
  );
};
export default Bg_Modal;
