import { BsCalendarDate, BsClock } from "react-icons/bs"

import MenuItem from "./MenuItem"

const Menu = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <MenuItem href="/shifts">
        <BsCalendarDate className="w-8 h-8 text-yellow-regular" />
        <span className="text-yellow-regular text-lg font-medium">Turnos</span>
      </MenuItem>
      <MenuItem href="/hours">
        <BsClock className="w-8 h-8 text-yellow-regular" />
        <span className="text-yellow-regular text-lg font-medium">
          Horarios
        </span>
      </MenuItem>
    </div>
  )
}

export default Menu
