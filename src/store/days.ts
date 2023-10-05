import { Day } from "@/types/days.types"
import { URL_API } from "@/constants/api"
import { WorkHour } from "@/types/hour.types"
import axios from "axios"
import { create } from "zustand"

export const useDaysStore = create((set: any, get: any) => ({
  days: [] as Day[],
  hours: [] as WorkHour[],

  getDays: async () => {
    try {
      const response = await axios.get(`${URL_API}/days`)
      if (response.status === 200) {
        const { days } = response.data
        set({ days })
      }
    } catch (error) {
      throw new Error("Ocurrío un error al obtener los días")
    }
  },

  getHours: async () => {
    try {
      const response = await axios.get(`${URL_API}/hours`)
      if (response.status === 200) {
        const { hours } = response.data
        set({ hours })
      }
    } catch (error) {
      throw new Error("Ocurrío un error al obtener las horas de trabajo")
    }
  },

  handleHour: async (hour: WorkHour, _id: string, isForEnable: boolean) => {
    try {
      const response = await axios.patch(
        `${URL_API}/days`,
        { hour, _id, isForEnable },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        get().getDays()
      }
    } catch (error) {
      throw new Error(
        `Ocurrió un error al ${
          isForEnable ? "habilitar" : "deshabilitar"
        } la hora`
      )
    }
  },

  addHour: async (hour: string, minutes: string) => {
    try {
      const isHourAlreadyAdded = get().hours.find(
        (h: WorkHour) => h.value === `${hour}:${minutes}`
      )
      if (isHourAlreadyAdded) {
        throw new Error("La hora ya fue agregada")
      }

      const response = await axios.post(
        `${URL_API}/hours`,
        { hour, minutes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        get().getHours()
      }
    } catch (error) {
      throw new Error("Ocurrió un error al agregar la hora")
    }
  },
}))
