import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    //   creator: { type: Schema.Types.ObjectId, ref: "User" },
    creator: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    notifyBefore: { type: Number, required: true },
  },
  { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);

export default Event;
