import { JwtPayload, verify } from "jsonwebtoken"

export const validateToken = async (token: string) => {
  const decodedToken = verify(token, process.env.JWT_SECRET_KEY as string) as
    | string
    | JwtPayload
  const currentDate = Date.now()

  return typeof decodedToken === "string"
    ? false
    : (decodedToken.exp as number) * 1000 > currentDate
}
