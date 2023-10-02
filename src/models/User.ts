import { Schema, model, models } from "mongoose"
import { User, UserDatabase } from "@/types/user.types"

const UserDatabaseSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const UserSchema = new Schema<UserDatabase>({
  user: {
    type: UserDatabaseSchema,
  },
})

export default models.User || model<User>("User", UserSchema, "users")
