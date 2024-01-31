import { Notification } from "@/types/notification.types"
import { URL_API } from "@/constants/api"
import { create } from "zustand"

export const useNotificationsStore = create((set: any, get: any) => ({
  notifications: [] as Notification[],

  unreaded: null as unknown as number,

  readNotification: async (id: string) => {
    const response = await fetch(`${URL_API}/notifications?id=${id}`, {
      method: "PATCH",
      cache: "no-store",
    })
    const { message } = await response.json()
    if (!response.ok) throw new Error(message)

    get().getNotifications()
  },

  getNotifications: async () => {
    const response = await fetch(`${URL_API}/notifications`, {
      method: "GET",
      cache: "no-store",
    })
    const {
      message,
      notifications,
    }: { message: any; notifications: Notification[] } = await response.json()
    if (!response.ok) throw new Error(message)

    const unreaded = notifications.filter(
      (notification) => !notification.readed
    ).length

    set({ notifications, unreaded })
  },

  clearNotifications: async () => {
    const response = await fetch(`${URL_API}/notifications`, {
      method: "DELETE",
      cache: "no-store",
    })
    const { message } = await response.json()
    if (!response.ok) throw new Error(message)

    get().getNotifications()
  },
}))
