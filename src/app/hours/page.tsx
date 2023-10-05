import DayList from "@/components/DayList"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"

const Hours = () => {
  return (
    <Screen>
      <div className="flex flex-col gap-2">
        <Title>Horarios</Title>
        <Subtitle>
          Acá podrás seleccionar los horarios que desees para cada día
        </Subtitle>
      </div>
      <DayList />
    </Screen>
  )
}

export default Hours
