import { AdvertisementType } from "@/types/dataType.type";
import { Schema, Types, model, models } from "mongoose";

const AdvertisementSchema = new Schema<AdvertisementType>(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    constructionDate: { type: String, required: true },
    category: { type: String, required: true },
    realState: { type: String, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    location: {
      lat: { type: Schema.Types.Mixed, required: true }, // می‌تونه string یا number باشه
      lng: { type: Schema.Types.Mixed, required: true },
    },
    rules: [{ type: String }],
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //   createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Advertisement =
  models.Advertisement ||
  model<AdvertisementType>("Advertisement", AdvertisementSchema);

export default Advertisement;
