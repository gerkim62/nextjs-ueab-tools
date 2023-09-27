import { Schema, model, models } from "mongoose";

const browserlessTokenSchema = new Schema(
  {
    apiKey: {
      type: String,
      required: [true, "api key is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    remainingUnits: {
        type: Number,
        required: [true, "units remaining is required"],
      },
  },
  { timestamps: true }
);

const BrowserlessToken = models.BrowserlessToken || model("BrowserlessToken", browserlessTokenSchema);

export default BrowserlessToken;
