"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { SECONDARY_API_URL } from "@/constants/api"
import io from "socket.io-client"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"
import { useNotificationsStore } from "@/store/notifications"
import { type Notification } from "@/types/notification.types"

const ProviderProgressBar = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore()
  const { getNotifications } = useNotificationsStore()

  const fetchNotifications = async () => {
    await getNotifications()
  }

  useEffect(() => {
    const socket = io(SECONDARY_API_URL, {
      query: {
        user: user?.name,
      },
    })
    if ("Notification" in window) {
      Notification.requestPermission()
    }
    fetchNotifications()
    socket.on("new-shift", async (data: Notification) => {
      await fetchNotifications()
      if (Notification.permission === "granted") {
        new Notification("¡Turno asignado 💈!", {
          body: `${data?.user} ha reservado un turno para el día ${data?.day} a las ${data?.time}.`,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
        })
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#D2BF9D"
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
    </>
  )
}
export default ProviderProgressBar
