import { motion } from "framer-motion"

const Button = ({
  style,
  type,
  children,
  onClick,
  delay,
}: {
  style?: string
  type: "button" | "submit" | "reset" | undefined
  children: React.ReactNode
  onClick?: () => void
  delay?: number
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: delay || 0 }}
      onClick={onClick}
      type={type}
      className={`${style} hover:cursor-pointer text-yellow-regular bg-dark-bold px-4 py-3 text-sm font-bold rounded-full`}
    >
      {children}
    </motion.button>
  )
}

export default Button
