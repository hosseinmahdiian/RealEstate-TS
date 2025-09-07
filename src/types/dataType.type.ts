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
  image?: string;
  gallery?: string[];
  description: string;
  location?: { lat: number | string; lng: number | string } | null;
  address: string;
  mobile: string;
  price: string | "توافقی";
  realState: string | "کاربر";
  constructionDate: Date | string;
  category?: CategoryEnum;
  amenities?: string[];
  rules?: string[];
  userID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
};

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
