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
