import { BsWhatsapp } from "react-icons/bs"
import Button from "./Button"
import { Summary } from "@/types/summary.types"
import { motion } from "framer-motion"

const ShiftItem = ({
  data,
  isActive,
  handleActive,
  handleModal,
  delay,
}: {
  data: Summary
  isActive: boolean
  handleActive: () => void
  handleModal: () => void
  delay: number
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
      onClick={!isPast ? handleActive : undefined}
      className={`${
        !isPast
          ? "bg-dark-regular cursor-pointer"
          : "bg-dark-light cursor-not-allowed"
      } flex flex-col items-center gap-4 w-full py-8 px-10 rounded-[33px] duration-200 ease-in-out ${
        !isActive ? "h-[90px]" : "h-[200px]"
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
      <div className="flex items-center justify-between w-full mt-4">
        <Button
          onClick={handleModal}
          style={`bg-dark-regular text-xs ${
            !isActive ? "invisible opacity-0" : "visible opacity-100"
          } duration-200 ease-in-out`}
          textColor="text-white-semi-light"
          type="button"
        >
          Cancelar
        </Button>
        <a
          href={`https://api.whatsapp.com/send?phone=${data.user.phone}&text=¡Hola%20👋!%0ATe%20recuerdo%20que%20tenés%20un%20turno%20el%20día%20*${data.day.dateString}*%20a%20las%20*${data.hour.hour}hs*%0ASi%20deseás%20cancelar%20el%20turno,%20podrás%20solicitarlo%20desde%20la%20página%20de%20turnos.%0A¡Muchas%20gracias,%20te%20espero!%20💈`}
          target="_blank"
        >
          <Button
            style={`flex items-center gap-2 bg-white-semi-light text-dark-bold text-xs ${
              !isActive ? "invisible opacity-0" : "visible opacity-100"
            } duration-200 ease-in-out`}
            type="button"
            textColor="text-dark-bold"
          >
            <BsWhatsapp className="text-base" />
            Recordar
          </Button>
        </a>
      </div>
    </motion.div>
  )
}

export default ShiftItem
