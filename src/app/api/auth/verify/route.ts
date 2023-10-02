import { NextResponse } from "next/server"
import Token from "@/models/Token"
import { connectDB } from "@/utils/mongoose"
import { type Token as TokenType } from "@/types/token.types"
import { validateToken } from "@/utils/validate-token"

export const POST = async (req: Request) => {
  await connectDB()
  const token = await req.json()

  const tokenDB: TokenType | null = await Token.findOne({ value: token })

  const isValid = validateToken(token)

  if (!isValid) {
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
  }

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
