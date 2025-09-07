import { IImage } from "@/types/dataType.type";
import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Image = models.Image || model<IImage>("Image", ImageSchema);
export default Image;
