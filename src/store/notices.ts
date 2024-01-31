import { Notice } from "@/types/notice.types"
import { URL_API } from "@/constants/api"
import { create } from "zustand"

export const useNotices = create((set: any) => ({
  notices: null as Notice[] | null,
  isNotices: false,

  getNotices: async () => {
    const response = await fetch(`${URL_API}/notices`, {
      method: "GET",
      cache: "no-store",
    })
    const { notices, message, isNotices } = await response.json()
    if (!response.ok) throw new Error(message)

    set({ notices, isNotices })
  },

  postNotice: async (notice: string) => {
    const response = await fetch(`${URL_API}/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(notice),
    })
    const { message, notices, isNotices } = await response.json()
    if (!response.ok) throw new Error(message)

    set({ isNotices, notices })
  },

  deleteNotice: async (_id: string) => {
    const response = await fetch(`${URL_API}/notices?id=${_id}`, {
      method: "DELETE",
      cache: "no-store",
    })
    const { message, notices, isNotices } = await response.json()
    if (!response.ok) throw new Error(message)

    set({ isNotices, notices })
  },
}))
