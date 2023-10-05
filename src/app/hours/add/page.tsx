"use client"

import Button from "@/components/Button"
import HourSelector from "@/components/HourSelector"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useDaysStore } from "@/store/days"
import { useState } from "react"

const AddHour = () => {
  const { addHour, getHours } = useDaysStore()
  const [hour, setHour] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const formatNumber = (nro: number) => {
    return nro.toString().padStart(2, "0")
  }

  const onHandleHourUp = () => {
    if (hour === 23) {
      setHour(0)
    } else setHour((prev) => prev + 1)
  }
  const onHandleHourDown = () => {
    if (hour === 0) {
      setHour(23)
    } else setHour((prev) => prev - 1)
  }
  const onHandleMinutesUp = () => {
    if (minutes === 45) {
      setMinutes(0)
    } else setMinutes((prev) => prev + 15)
  }
  const onHandleMinutesDown = () => {
    if (minutes === 0) {
      setMinutes(45)
    } else setMinutes((prev) => prev - 15)
  }

  const onHandleAdd = async () => {
    try {
      await getHours()
      toast.promise(
        async () => {
          await addHour(formatNumber(hour), formatNumber(minutes))
        },
        {
          loading: "Agregando horario...",
          success: "Horario agregado",
          error: "El horario ya existe u ocurrió un error al agregarlo",
        }
      )
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <Screen style="gap-12">
      <div className="flex flex-col gap-2">
        <Title>Añadir horario</Title>
        <Subtitle>
          Agregá el horario que desees eligiendo la hora y los minutos
        </Subtitle>
      </div>
      <HourSelector
        hour={formatNumber(hour)}
        minutes={formatNumber(minutes)}
        onHandleHourDown={onHandleHourDown}
        onHandleHourUp={onHandleHourUp}
        onHandleMinutesDown={onHandleMinutesDown}
        onHandleMinutesUp={onHandleMinutesUp}
      />
      <Button onClick={onHandleAdd} type="button" style="w-32 self-center">
        Agregar
      </Button>
    </Screen>
  )
}

export default AddHour
