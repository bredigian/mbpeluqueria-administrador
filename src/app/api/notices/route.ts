import { NextResponse } from "next/server"
import Notice from "@/models/Notice"
import { connectDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  await connectDB()

  try {
    const notices = await Notice.find()
    return NextResponse.json(
      {
        notices: notices.length > 0 ? notices : null,
        isNotices: notices.length > 0 ?? false,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const notice = await req.json()
    if (!notice)
      throw new Error("Ocurrió un error al obtener el valor de la noticia")

    await connectDB()

    const newNotice = new Notice({ title: notice })
    await newNotice.save()

    const notices = await Notice.find()

    return NextResponse.json(
      {
        message: "Noticia agregada correctamente",
        notices: notices.length > 0 ? notices : null,
        isNotices: notices.length > 0 ?? false,
      },
      {
        status: 201,
        statusText: "Created",
      }
    )
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    })
  }
}

export const DELETE = async (req: Request) => {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) throw new Error("Ocurrió un error al obtener el ID")

    await connectDB()

    try {
      await Notice.findByIdAndDelete(id)

      const notices = await Notice.find()

      return NextResponse.json(
        {
          message: "Noticia eliminada correctamente",
          notices: notices.length > 0 ? notices : null,
          isNotices: notices.length > 0 ?? false,
        },
        {
          status: 200,
          statusText: "OK",
        }
      )
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    )
  }
}
