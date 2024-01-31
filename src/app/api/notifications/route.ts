import NotificationM from "@/models/Notification"
import { connectDB } from "@/utils/mongoose"

export const GET = async (_: Request) => {
  try {
    await connectDB()

    const notifications = await NotificationM.find()

    notifications.sort((a, b) => b.createdAt - a.createdAt)

    notifications.sort((a, b) => a.readed - b.readed)

    return Response.json(
      {
        notifications,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return Response.json(
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

export const PATCH = async (req: Request) => {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) throw new Error("No se recibió el ID")

    await connectDB()

    await NotificationM.findByIdAndUpdate(id, {
      readed: true,
    })

    return Response.json(
      {
        message: "Notificación marcada como leída",
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return Response.json(
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

export const DELETE = async (_: Request) => {
  try {
    await connectDB()

    await NotificationM.deleteMany()

    return Response.json(
      {
        message: "Notificaciones eliminadas",
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return Response.json(
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
