import { Schema, model, models } from "mongoose"

import { Token } from "@/types/token.types"
import { User } from "@/types/user.types"

const UserForTokenSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

const TokenSchema = new Schema<Token>({
  user: {
    type: UserForTokenSchema,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

export default models.Token || model<Token>("Token", TokenSchema, "tokens")
