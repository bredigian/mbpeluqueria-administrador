import { Client } from "@/types/client.types"
import { Schema } from "mongoose"

export const ClientSchema: Schema<Client> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
})
