"use client"

import ButtonBack from "./ButtonBack"
import { motion } from "framer-motion"

const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-6 py-10 px-8 ${style}`}
    >
      <ButtonBack />
      {children}
    </motion.main>
  )
}

export default Screen
