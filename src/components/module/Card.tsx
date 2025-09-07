import { DateOption } from "@/constant/constant";
import { CategoryEnum } from "@/enum/enums.enum";
import { categoryFaMap, sp } from "@/function/functions";
import { CardProps } from "@/interface/interfaces.interface";
import Image from "next/image";
import Link from "next/link";
import toman from "public/images/toman.png";
import noImage from "public/images/noImage.png";
import { FaArrowRight } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
const Card = ({ ad }: CardProps) => {
  const {
    image,
    title,
    price,
    category,
    realState,
    constructionDate,
    address,
  } = ad;

  const formattedDate = constructionDate
    ? new Date(constructionDate).toLocaleDateString("fa-IR", DateOption)
    : "-";

  return (
    <Link
      href=""
      className="block h-fit overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="mx-auto mt-4 aspect-square w-9/12">
        <Image
          src={image || noImage}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full overflow-hidden rounded-lg object-cover shadow-lg"
        />
      </div>

      <div className="space- grid grid-cols-2 p-2">
        <h3 className="col-span-2 text-lg font-bold text-gray-800">{title}</h3>
        <div className="col-span-2 flex items-center justify-end gap-1">
          <p className="pt-1.5 font-medium text-gray-500">{sp(+price)} </p>
          <Image
            src={toman}
            alt="toman"
            width={40}
            height={20}
            className="w-5 object-cover"
          />
        </div>
        <div className="col-span-2 flex items-center gap-1">
          <GrLocationPin className=" " />{" "}
          <p className="line-clamp-1 w-[calc(100%-20px)] text-gray-500">
            {address}
          </p>
        </div>
        <div className="col-span-2 flex items-center gap-1 sm:col-span-1">
          <BiCategory />
          <p className="line-clamp-1 text-gray-500">
            {categoryFaMap[category as CategoryEnum]}
          </p>
        </div>
        {/* <p className="text-left"> {formattedDate}</p> */}
        <div className="col-span-2 flex items-center gap-1 sm:col-span-1">
          <FaSearchLocation />
          <p className="line-clamp-1 text-gray-500">{realState}</p>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between px-3 text-blue-500">
        <FaArrowRight />
        <p className="">دیدن آگهی</p>
      </div>
    </Link>
  );
};

export default Card;
