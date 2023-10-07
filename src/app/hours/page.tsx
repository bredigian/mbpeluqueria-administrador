"use client"

import { TbClockPlus, TbClockX } from "react-icons/tb"

import DayList from "@/components/DayList"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { useRouter } from "next-nprogress-bar"

const Hours = () => {
  const { push } = useRouter()

  const onHandleAdd = () => {
    push("/hours/add")
  }

  const onHandleDelete = () => {
    push("/hours/delete")
  }

  return (
    <Screen>
      <div className="flex flex-col gap-2 relative">
        <Title>Horarios</Title>
        <Subtitle>
          Acá podrás seleccionar los horarios que desees para cada día
        </Subtitle>
        <div className="absolute right-0 top-[2px] flex items-center gap-4">
          <TbClockPlus
            onClick={onHandleAdd}
            className="text-yellow-regular text-2xl cursor-pointer"
          />
          <TbClockX
            onClick={onHandleDelete}
            className="text-yellow-regular text-2xl cursor-pointer"
          />
        </div>
      </div>
      <DayList />
    </Screen>
  )
}

export default Hours
