import { Day } from "@/types/days.types"
import Link from "next/link"
import { motion } from "framer-motion"

const DayItem = ({ data, delay }: { data: Day; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: delay }}
      className="bg-dark-bold py-4 w-full rounded-full"
    >
      <Link href={`/hours/${data.path}`} className="flex justify-center">
        <span className="text-yellow-regular text-lg font-medium">
          {data.value}
        </span>
      </Link>
    </motion.div>
  )
}

export default DayItem
