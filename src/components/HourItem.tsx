import { WorkHour } from "@/types/hour.types"
import { motion } from "framer-motion"

const HourItem = ({
  data,
  enabled,
  enable,
  disable,
  delay,
}: {
  data: WorkHour
  enabled: boolean
  enable: () => void
  disable: () => void
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      className={`${
        !enabled ? "bg-dark-transparent" : "bg-dark-regular"
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
    </motion.div>
  )
}

export default HourItem
