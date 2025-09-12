import { UserType } from "@/types/dataType.type";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  mobile: { type: String },
  role: { type: String, default: "USER" },
  profile: { type: String },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});
const User = models?.User || model<UserType>("User", UserSchema);
export default User;
