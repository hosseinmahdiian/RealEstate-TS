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
export type ProfileDataType = {
  title: string;
  image?: string;
  gallery?: string[];
  description: string;
  location: { lat: number; lng: number } | null; // 👈 اینو اضافه کن
  address: string;
  mobile: string;
  price: string | "توافقی";
  realState: string | "کاربر";
  constructionDate: Date | string;
  category?: string;
  amenities?: string[];
  rules?: string[];
};

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
