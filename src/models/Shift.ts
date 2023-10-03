import { Schema, model, models } from "mongoose"

import { ClientSchema } from "./Client"
import { DateSchema } from "./Date"
import { HourSchema } from "./Hour"
import { Summary } from "@/types/summary.types"

const ShiftSchema: Schema<Summary> = new Schema(
  {
    user: {
      type: ClientSchema,
    },
    day: {
      type: DateSchema,
    },
    hour: {
      type: HourSchema,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Shift || model<Summary>("Shift", ShiftSchema, "shifts")
