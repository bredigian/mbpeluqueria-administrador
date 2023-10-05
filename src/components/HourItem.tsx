import { WorkHour } from "@/types/hour.types"

const HourItem = ({
  data,
  enabled,
  enable,
  disable,
}: {
  data: WorkHour
  enabled: boolean
  enable: () => void
  disable: () => void
}) => {
  return (
    <div
      className={`${
        !enabled ? "bg-dark-bold-transparent" : "bg-dark-bold"
      } flex items-center justify-between px-10 py-4 w-full rounded-full`}
    >
      <span
        className={`${
          !enabled ? "text-yellow-light" : "text-yellow-regular"
        } text-lg font-medium`}
      >
        {data?.value}
      </span>
      <span
        onClick={!enabled ? enable : disable}
        className={`${
          !enabled ? "text-white-semi-light" : "text-white-regular"
        } text-sm hover:underline cursor-pointer`}
      >
        {!enabled ? "Activar" : "Desactivar"}
      </span>
    </div>
  )
}

export default HourItem
