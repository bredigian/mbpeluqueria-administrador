import { NextResponse } from "next/server"
import Token from "@/models/Token"
import { connectDB } from "@/utils/mongoose"
import { type Token as TokenType } from "@/types/token.types"
import { validateToken } from "@/utils/validate-token"

export const POST = async (req: Request) => {
  await connectDB()
  const token = await req.json()

  try {
    const tokenDB: TokenType | null = await Token.findOne({ value: token })
    if (tokenDB) {
      const isValid = await validateToken(tokenDB?.value)
      if (isValid) {
        return NextResponse.json(
          {
            message: "Token válido",
            isValid: true,
            user: tokenDB?.user,
          },
          {
            status: 200,
            statusText: "OK",
          }
        )
      }
    }
    return NextResponse.json(
      {
        message: "Token inválido",
        isValid: false,
      },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Token inválido y/o inexistente",
        isValid: false,
      },
      {
        status: 404,
        statusText: "Token Not Found",
      }
    )
  }
}
