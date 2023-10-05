import Day from "@/models/Day"
import { NextResponse } from "next/server"
import { connectDB } from "@/utils/mongoose"

export const GET = async () => {
  await connectDB()

  const days = await Day.find()
  return NextResponse.json(
    {
      days,
    },
    {
      status: 200,
    }
  )
}

export const PATCH = async (req: Request) => {
  await connectDB()
  try {
    const { hour, _id, isForEnable } = await req.json()
    isForEnable
      ? await Day.updateOne(
          {
            _id,
          },
          {
            $push: {
              hours: hour,
            },
          }
        )
      : await Day.updateOne(
          {
            _id,
          },
          {
            $pull: {
              hours: hour,
            },
          }
        )

    return NextResponse.json({
      message: isForEnable ? "Hora habilitada" : "Hora deshabilitada",
      ok: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al actualizar la hora",
        ok: false,
      },
      {
        status: 500,
      }
    )
  }
}
