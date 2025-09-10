import { CategoryEnum } from "@/enum/enums.enum";

export type ChildrenType = {
  children: React.ReactNode;
};
export type LogInType = {
  email: string;
  password: string;
};
export type SignUpType = LogInType & {
  confirmPassword: string;
  fullName: string;
  mobile?: string;
  profile?: string;
};
export type UserType = LogInType & {
  fullName: string;
  mobile?: string;
  profile?: string;
  createdAt?: Date;
};
export type IImage = {
  filename: string;
  data: Buffer;
  contentType: string;
  createdAt?: Date;
};
export type AdvertisementType = {
  title: string;
  mobile: string;
  address: string;
  description: string;
  price: string | "توافقی";
  realState: string | "کاربر";
  constructionDate: Date | string;
  typeOf: boolean;
  city: string;
  province: string;
  view: number;
  _id?: string;
  image?: string;
  userID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  rules?: string[];
  gallery?: string[];
  amenities?: string[];
  category?: CategoryEnum;
  rent?: string | "توافقی";
  location?: { lat: number | string; lng: number | string } | null;
};

export type ParamsAndSearchPramsType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] };
};

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
