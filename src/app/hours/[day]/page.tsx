"use client"

import { useEffect, useState } from "react"

import Screen from "@/components/Screen"
import { useDaysStore } from "@/store/days"
import { Day } from "@/types/days.types"
import { useRouter } from "next-nprogress-bar"
import ScreenLoader from "@/components/ScreenLoader"
import HourItem from "@/components/HourItem"
import { WorkHour } from "@/types/hour.types"
import { toast } from "sonner"

const Day = ({ params }: { params: { day: string } }) => {
  const { days, hours, getHours, handleHour } = useDaysStore()
  const [day, setDay] = useState<Day | null>()

  const [loading, setLoading] = useState(false)

  const { push } = useRouter()

  const filterDay = () => {
    setLoading(true)
    const day = days?.find((item) => item.path === params.day)
    if (!day) {
      push("/hours")
    } else {
      setDay(day)
      setLoading(false)
    }
  }

  const fetchHours = async () => {
    await getHours()
    setLoading(false)
  }

  const onHandlerHour = async (
    hour: WorkHour,
    _id: string,
    isForEnable: boolean
  ) => {
    try {
      toast.promise(
        async () => {
          await handleHour(hour, _id, isForEnable)
        },
        {
          loading: `${isForEnable ? "Habilitando" : "Deshabilitando"} hora...`,
          success: `¡Hora ${isForEnable ? "habilitada" : "deshabilitada"}!`,
          error: `Ocurrió un error al ${
            isForEnable ? "habilitar" : "deshabilitar"
          } la hora`,
        }
      )
    } catch (error) {
      toast.error(
        `Ocurrió un error al ${
          isForEnable ? "habilitar" : "deshabilitar"
        } la hora`
      )
    }
  }

  useEffect(() => {
    filterDay()
  }, [])

  useEffect(() => {
    filterDay()
  }, [onHandlerHour])

  useEffect(() => {
    fetchHours()
  }, [day])

  if (loading) return <ScreenLoader />

  return (
    <Screen>
      {hours?.map((hour) => {
        const isEnabled = day?.hours.find((item) => item.value === hour.value)
        return (
          <HourItem
            key={hour.value}
            data={hour}
            enabled={!isEnabled ? false : true}
            enable={() => onHandlerHour(hour, day?._id as string, true)}
            disable={() => onHandlerHour(hour, day?._id as string, false)}
          />
        )
      })}
    </Screen>
  )
}

export default Day
