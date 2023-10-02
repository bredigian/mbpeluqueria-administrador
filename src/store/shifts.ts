import { Summary } from "@/types/summary.types"
import { URL_API } from "@/constants/api"
import axios from "axios"
import { create } from "zustand"

export const useShiftsStore = create((set: any) => ({
  shifts: [] as Summary[],

  getShifts: async () => {
    try {
      const response = await axios.get(`${URL_API}/shifts`)
      if (response.status === 200) {
        const shifts: Summary[] = response.data.data
        set({ shifts })
      }
    } catch (error) {
      throw new Error("Ocurró un error al obtener los turnos")
    }
  },
}))
