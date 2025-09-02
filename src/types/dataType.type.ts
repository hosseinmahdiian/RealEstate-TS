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
};

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
