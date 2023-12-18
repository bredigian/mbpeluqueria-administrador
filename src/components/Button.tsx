import { motion } from "framer-motion"

const Button = ({
  style,
  type,
  children,
  onClick,
  delay,
  textColor,
  isDisabled,
}: {
  style?: string
  type: "button" | "submit" | "reset" | undefined
  children: React.ReactNode
  onClick?: () => void
  delay?: number
  textColor?: string
  isDisabled?: boolean
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: delay || 0 }}
      onClick={!isDisabled ? onClick : undefined}
      type={type}
      className={`${style} hover:cursor-pointer ${
        textColor ?? "text-yellow-regular"
      } bg-dark-regular px-4 py-3 text-sm font-bold rounded-full ${
        isDisabled
          ? "bg-opacity-40 text-opacity-40"
          : "bg-opacity-100 text-opacity-100"
      }`}
    >
      {children}
    </motion.button>
  )
}

export default Button
