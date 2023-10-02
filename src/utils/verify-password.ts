import { compare } from "bcrypt"

export const verifyPassword = (password: string, dbPassword: string) => {
  return compare(password, dbPassword)
}
