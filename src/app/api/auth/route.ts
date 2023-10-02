import { NextResponse } from "next/server"
import Token from "@/models/Token"
import User from "@/models/User"
import { UserDatabase } from "@/types/user.types"
import { connectDB } from "@/utils/mongoose"
import { sign } from "jsonwebtoken"
import { verifyPassword } from "@/utils/verify-password"

export const POST = async (req: Request) => {
  await connectDB()

  const { username, password } = await req.json()
  const user: UserDatabase | null = await User.findOne({
    "user.username": username,
  })

  if (!user) {
    console.log("Usuario no encontrado")
    return NextResponse.json(
      {
        message: "Usuario no encontrado",
      },
      {
        status: 404,
      }
    )
  }

  const isPasswordMatch = await verifyPassword(
    password,
    user?.user?.password as string
  )
  if (!isPasswordMatch) {
    console.log("Contraseña incorrecta")
    return NextResponse.json(
      {
        message: "Contraseña incorrecta",
        ok: false,
      },
      {
        status: 400,
      }
    )
  }
  const token = sign(
    { username: user.user.username },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  )
  const tokenToCreate = new Token({
    user: user.user,
    value: token,
  })
  await tokenToCreate.save()

  return NextResponse.json(
    {
      message: "Inicio de sesión exitoso",
      user: {
        name: user.user.name,
        username: user.user.username,
      },
      token,
      ok: true,
    },
    {
      status: 201,
      statusText: "Logged OK",
    }
  )
}

export const DELETE = async (req: Request) => {
  try {
    await connectDB()
    const url = new URL(req.url)
    const token = url.searchParams.get("token")

    const tokenToDelete = await Token.findOneAndDelete({ value: token })

    if (!tokenToDelete) {
      return NextResponse.json(
        {
          message: "Token no encontrado",
          ok: false,
        },
        {
          status: 404,
        }
      )
    }
    return NextResponse.json(
      {
        message: "Cierre de sesión exitoso",
        ok: true,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al cerrar sesión",
        ok: false,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
