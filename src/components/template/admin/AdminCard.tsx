"use client";
import { CardProps, ResponseInterface } from "@/interface/interfaces.interface";
import Link from "next/link";
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { DeleteAdAPI } from "@/services/DeleteAd.api";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Card from "@/module/Card";
import { PublishedAdAPI } from "@/services/PublishedAd.api";

const AdminCard = ({ ad }: CardProps) => {
  const router = useRouter();
  const { _id } = ad;
  const { mutate: mutateEditDeleteAd, isPending: isPendingEditDeleteAd } =
    useMutation({
      mutationKey: ["DeleteAd"],
      mutationFn: DeleteAdAPI,
      onSuccess: (data: ResponseInterface) => {
        if (data?.success) {
          toast.success(String(data?.message));
          router.refresh();
        } else {
          toast.error(data.error || "خطایی رخ داده است");
        }
      },
      onError: (error) => {
        toast.error(error.message || "خطایی رخ داده است");
      },
    });

  const { mutate: mutatePublishedAd, isPending: isPendingPublishedAd } =
    useMutation({
      mutationKey: ["PublishedAd"],
      mutationFn: PublishedAdAPI,
      onSuccess: (data: ResponseInterface) => {
        if (data?.success) {
          toast.success(String(data?.message));
          router.refresh();
        } else {
          toast.error(data.error || "خطایی رخ داده است");
        }
      },
      onError: (error) => {
        toast.error(error.message || "خطایی رخ داده است");
      },
    });

  return (
    <div className="rounded-2xl border border-blue-400 p-2 shadow-lg transition-all ease-in-out hover:scale-102">
      <Card ad={ad} />
      <div className="child:w-1/2 child:text-center child:border child:rounded-lg mt-2 flex items-center gap-2">
        <button
          className="flex h-7 cursor-pointer items-center justify-center gap-1 border-green-200 bg-green-50 text-green-400 shadow shadow-green-100"
          disabled={isPendingPublishedAd}
          onClick={() => {
            mutatePublishedAd(String(_id));
          }}
        >
          {!isPendingPublishedAd ? (
            <>
              <p>انتشار</p>
              <MdOutlineDelete />
            </>
          ) : (
            <div className="relative">
              <FadeLoader
                color="#b9f8cf"
                height={8}
                margin={-12}
                radius={4}
                speedMultiplier={1}
                width={4}
                className="absolute !top-4 -right-4.5 mx-auto w-fit"
              />{" "}
            </div>
          )}
        </button>

        <button
          className="flex h-7 cursor-pointer items-center justify-center gap-1 border-red-200 bg-red-50 text-red-400 shadow shadow-red-100"
          disabled={isPendingEditDeleteAd}
          onClick={() => {
            mutateEditDeleteAd(String(_id));
          }}
        >
          {!isPendingEditDeleteAd ? (
            <>
              <p>حذف</p>
              <MdOutlineDelete />
            </>
          ) : (
            <div className="relative">
              <FadeLoader
                color="#cf2929"
                height={8}
                margin={-12}
                radius={4}
                speedMultiplier={1}
                width={4}
                className="absolute !top-4 -right-4.5 mx-auto w-fit"
              />{" "}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
