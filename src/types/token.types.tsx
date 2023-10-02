import { User } from "./user.types"

export interface Token {
  user: User
  value: string
}
