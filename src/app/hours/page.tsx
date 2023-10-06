"use client"

import DayList from "@/components/DayList"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import { TbClockPlus } from "react-icons/tb"
import Title from "@/components/Title"
import { useRouter } from "next-nprogress-bar"

const Hours = () => {
  const { push } = useRouter()

  const onHandleAdd = () => {
    push("/hours/add")
  }

  return (
    <Screen>
      <div className="flex flex-col gap-2 relative">
        <Title>Horarios</Title>
        <Subtitle>
          Acá podrás seleccionar los horarios que desees para cada día
        </Subtitle>
        <TbClockPlus
          onClick={onHandleAdd}
          className="text-yellow-regular text-2xl absolute right-0 top-[2px] cursor-pointer"
        />
      </div>
      <DayList />
    </Screen>
  )
}

export default Hours
