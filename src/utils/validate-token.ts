import { verify } from "jsonwebtoken"

export const validateToken = async (token: string) => {
  const decodedToken = verify(token, process.env.JWT_SECRET_KEY as string)
  const currentDate = Date.now()

  return decodedToken?.exp * 1000 > currentDate
}
