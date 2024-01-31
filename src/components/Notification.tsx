import { type Notification } from "@/types/notification.types"
import React from "react"
import Button from "./Button"
import { useNotificationsStore } from "@/store/notifications"
import { toast } from "sonner"

const Notification = ({ data }: { data: Notification }) => {
  const { readNotification } = useNotificationsStore()

  const handleRead = async () => {
    try {
      toast.promise(async () => await readNotification(data._id), {
        loading: "Marcando como leido...",
        success: "Notificación marcada como leida",
        error: "Ha ocurrido un error al marcar la notificación como leida",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`flex flex-col gap-4 items-center bg-dark-regular p-4 rounded-2xl ${
        !data?.readed ? "opacity-100" : "opacity-30 -z-10"
      }`}
    >
      <p className="text-yellow-regular text-sm">
        <strong>{data?.user}</strong> ha reservado un turno para el día{" "}
        <strong>{data?.day}</strong> a las <strong>{data?.time}</strong>.
      </p>
      <Button
        onClick={!data?.readed ? handleRead : undefined}
        isDisabled={data?.readed}
        type="button"
        style="text-xs bg-yellow-light w-full"
      >
        Marcar como leido
      </Button>
    </div>
  )
}

export default Notification
