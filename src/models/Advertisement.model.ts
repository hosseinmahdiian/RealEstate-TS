import { AdvertisementType } from "@/types/dataType.type";
import { Schema, Types, model, models } from "mongoose";

const AdvertisementSchema = new Schema<AdvertisementType>(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    price: { type: String, required: true },
    rent: { type: String },
    description: { type: String, required: true },
    constructionDate: { type: String, required: true },
    category: { type: String, required: true },
    realState: { type: String, required: true },
    typeOf: { type: Boolean, default: false },
    view: { type: Number, default: 0 },
    city: { type: String },
    province: { type: String },
    image: { type: String },
    gallery: [{ type: String || Number }],
    amenities: [{ type: String || Number }],
    location: {
      lat: { type: Number },
      lng: { type: Number },
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
