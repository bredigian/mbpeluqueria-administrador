import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"

const HourSelector = ({
  hour,
  minutes,
  onHandleHourDown,
  onHandleHourUp,
  onHandleMinutesDown,
  onHandleMinutesUp,
}: {
  hour: string
  minutes: string
  onHandleHourDown: () => void
  onHandleHourUp: () => void
  onHandleMinutesDown: () => void
  onHandleMinutesUp: () => void
}) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex flex-col items-center gap-8">
        <BiSolidUpArrow
          onClick={onHandleHourDown}
          className="text-white-semi-light text-xl cursor-pointer"
        />
        <span className="w-28 text-center py-4 text-6xl font-medium bg-dark-bold text-yellow-regular rounded-xl">
          {hour}
        </span>
        <BiSolidDownArrow
          onClick={onHandleHourUp}
          className="text-white-semi-light text-xl cursor-pointer"
        />
      </div>
      <span className="text-yellow-regular text-4xl font-bold">:</span>
      <div className="flex flex-col items-center gap-8">
        <BiSolidUpArrow
          onClick={onHandleMinutesDown}
          className="text-white-semi-light text-xl cursor-pointer"
        />
        <span className="w-28 text-center py-4 text-6xl font-medium bg-dark-bold text-yellow-regular rounded-xl">
          {minutes}
        </span>
        <BiSolidDownArrow
          onClick={onHandleMinutesUp}
          className="text-white-semi-light text-xl cursor-pointer"
        />
      </div>
    </div>
  )
}

export default HourSelector
