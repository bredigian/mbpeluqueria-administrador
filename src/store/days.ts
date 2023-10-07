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
        const sortedDays = days.sort((a: Day, b: Day) => {
          return a.weekday < b.weekday ? -1 : a.weekday > b.weekday ? 1 : 0
        })
        set({ days: sortedDays })
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
        const sortedHours = hours.sort((a: WorkHour, b: WorkHour) => {
          const [hourA, minutesA] = a.value.split(":")
          const [hourB, minutesB] = b.value.split(":")
          if (hourA < hourB) return -1
          if (hourA > hourB) return 1
          if (minutesA < minutesB) return -1
          if (minutesA > minutesB) return 1
          return 0
        })
        set({ hours: sortedHours })
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

  deleteHour: async (hour: WorkHour) => {
    try {
      const response = await axios.delete(`${URL_API}/hours/`, {
        data: hour,
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        get().getHours()
      }
    } catch (error) {
      throw new Error("Ocurrió un error al eliminar la hora")
    }
  },
}))
