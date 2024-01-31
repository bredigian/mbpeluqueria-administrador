import { Schema, model, models } from "mongoose"

import { Notification } from "../types/notification.types"

const NotificationSchema = new Schema<Notification>(
  {
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    readed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Notification ||
  model("Notification", NotificationSchema, "notifications")
