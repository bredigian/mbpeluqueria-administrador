import Button from "./Button"
import { Summary } from "@/types/summary.types"

const ShiftItem = ({
  data,
  isActive,
  handleActive,
  handleModal,
}: {
  data: Summary
  isActive: boolean
  handleActive: () => void
  handleModal: () => void
}) => {
  const isLongName = data.user.name.length > 16

  const hour = parseInt(data?.hour.hour.split(":")[0])
  const minutes = parseInt(data?.hour.hour.split(":")[1])
  const isPast =
    Date.now() >
    new Date(
      data?.day.year,
      data?.day.month,
      data?.day.day,
      hour,
      minutes
    ).getTime()

  return (
    <div
      onClick={!isPast ? handleActive : undefined}
      className={`${
        !isPast ? "bg-dark-bold" : "bg-dark-light"
      } flex flex-col items-center gap-4 w-full py-8 px-10 rounded-[33px] duration-200 ease-in-out ${
        !isActive ? "h-[90px]" : "h-[180px]"
      } overflow-hidden`}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className={`${
            !isPast ? "text-yellow-regular" : "text-yellow-light"
          } font-bold text-xl`}
        >
          {data.hour.hour}
        </span>
        <h5
          className={`${
            !isPast ? "text-yellow-regular" : "text-yellow-light"
          } font-semibold ${!isLongName ? "text-base" : "text-sm"}`}
        >
          {data.user.name}
        </h5>
      </div>
      <div
        className={`flex items-center justify-between w-full ${
          !isActive ? "invisible opacity-0" : "visible opacity-100"
        } duration-200 ease-in-out`}
      >
        <span className="text-white-semi-light text-sm">Tel.</span>
        <a
          href={`https://wa.me/${data.user.phone}`}
          target="_blank"
          className="text-white-semi-light text-sm underline"
        >
          {data.user.phone}
        </a>
      </div>
      <Button
        onClick={handleModal}
        style={`bg-dark-regular text-xs ${
          !isActive ? "invisible opacity-0" : "visible opacity-100"
        } duration-200 ease-in-out`}
        type="button"
      >
        Cancelar
      </Button>
    </div>
  )
}

export default ShiftItem
