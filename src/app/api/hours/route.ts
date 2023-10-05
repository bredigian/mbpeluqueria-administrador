import { NextResponse } from "next/server"
import WorkHour from "@/models/WorkHour"
import { connectDB } from "@/utils/mongoose"

export const GET = async () => {
  await connectDB()
  const hours = await WorkHour.find()

  return NextResponse.json(
    {
      hours,
    },
    {
      status: 200,
    }
  )
}

export const POST = async (req: Request) => {
  await connectDB()
  try {
    const { hour, minutes } = await req.json()
    const value = `${hour}:${minutes}`
    const newHour = new WorkHour({ value: value })
    const savedNewHour = await newHour.save()

    return NextResponse.json(
      {
        message: "Hora agregada correctamente",
        ok: true,
        savedNewHour,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ocurrió un error al agregar la hora",
        ok: false,
      },
      {
        status: 400,
      }
    )
  }
}
