"use client"

import HourItem from "@/components/HourItem"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { WorkHour } from "@/types/hour.types"
import { toast } from "sonner"
import { useDaysStore } from "@/store/days"
import { useEffect } from "react"

const DeleteHour = () => {
  const { hours, getHours, deleteHour } = useDaysStore()

  const handleDeleteHour = async (hour: WorkHour) => {
    try {
      toast.promise(
        async () => {
          await deleteHour(hour)
        },
        {
          loading: "Eliminando horario...",
          success: "Horario eliminado",
          error: "Ocurrió un error al eliminar el horario",
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHours = async () => {
    await getHours()
  }

  useEffect(() => {
    fetchHours()
  }, [])

  return (
    <Screen style="gap-12">
      <Title>Eliminar horario</Title>
      <Subtitle>Eliminá el horario que desees</Subtitle>
      <div className="flex flex-col gap-4">
        {hours.map((hour) => {
          return (
            <HourItem
              key={hour.value}
              data={hour}
              isForDelete
              deleteHour={() => handleDeleteHour(hour)}
            />
          )
        })}
      </div>
    </Screen>
  )
}

export default DeleteHour
