import { NextResponse } from "next/server"
import Shift from "@/models/Shift"
import { connectDB } from "@/utils/mongoose"

export const GET = async () => {
  await connectDB()

  const shifts = await Shift.find()
  return NextResponse.json(
    {
      data: shifts,
    },
    {
      status: 200,
    }
  )
}

export const DELETE = async (req: Request) => {
  await connectDB()
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    const shift = await Shift.findByIdAndDelete(id)

    if (!shift) {
      return NextResponse.json(
        {
          message: "Turno no encontrado",
          ok: false,
        },
        {
          status: 404,
        }
      )
    }
    return NextResponse.json(
      {
        message: "Turno cancelado",
        ok: true,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al cancelar el turno",
        ok: false,
      },
      {
        status: 500,
      }
    )
  }
}
