"use client";
import { CardProps, ResponseInterface } from "@/interface/interfaces.interface";
import Card from "./Card";
import Link from "next/link";
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { DeleteAdAPI } from "@/services/DeleteAd.api";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const DashboardCard = ({ ad }: CardProps) => {
  const router = useRouter();
  const { _id, published } = ad;
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

  return (
    <div className="relative rounded-2xl border border-blue-200 bg-white p-2 text-gray-800 shadow-lg transition-all ease-in-out hover:scale-102 dark:border-blue-700 dark:bg-blue-950 dark:text-white">
      {/* Status */}
      <div className="absolute top-5 right-3 z-10 text-xs">
        {published ? (
          <p className="rounded-xl border border-green-400 bg-green-50 px-3 text-green-600 dark:border-green-600 dark:bg-green-800 dark:text-green-300">
            منتشر شده
          </p>
        ) : (
          <p className="rounded-xl border border-orange-400 bg-orange-50 px-3 text-orange-600 dark:border-orange-600 dark:bg-orange-800 dark:text-orange-300">
            در انتظار تایید
          </p>
        )}
      </div>

      {/* Card */}
      <Card ad={ad} />

      {/* Actions */}
      <div className="child:w-1/2 child:text-center child:border child:rounded-lg mt-2 flex items-center gap-2">
        <Link
          href={`myAd/edit/${_id}`}
          className="flex h-7 items-center justify-center gap-1 border-green-200 bg-green-50 text-green-600 shadow shadow-green-100 dark:border-green-600 dark:bg-green-800 dark:text-green-300 dark:shadow-none"
        >
          <p>ویرایش</p>
          <MdOutlineEditNote />
        </Link>

        <button
          className="flex h-7 cursor-pointer items-center justify-center gap-1 border-red-200 bg-red-50 text-red-600 shadow shadow-red-100 dark:border-red-600 dark:bg-red-800 dark:text-red-300 dark:shadow-none"
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
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
