// models/Image.ts
import mongoose, { Schema, model, models } from "mongoose";

interface IImage {
  filename: string;
  url: string;
  createdAt: Date;
}

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Image = models.Image || model<IImage>("Image", ImageSchema);
export default Image;
