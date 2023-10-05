import { Day } from "@/types/days.types"
import Link from "next/link"

const DayItem = ({ data }: { data: Day }) => {
  return (
    <Link
      href={`/hours/${data.path}`}
      className="flex justify-center bg-dark-bold py-4 w-full rounded-full"
    >
      <span className="text-yellow-regular text-lg font-medium">
        {data.value}
      </span>
    </Link>
  )
}

export default DayItem
