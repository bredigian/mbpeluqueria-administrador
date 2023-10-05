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
