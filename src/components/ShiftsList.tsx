"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"

import Button from "./Button"
import Modal from "./Modal"
import { Month } from "@/types/enums.types"
import ShiftItem from "./ShiftItem"
import Subtitle from "./Subtitle"
import { Summary } from "@/types/summary.types"
import Title from "./Title"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useShiftsStore } from "@/store/shifts"

const ShiftsList = () => {
  const [currentDay, setCurrentDay] = useState(new Date())
  const [filteredShifts, setFilteredShifts] = useState<Summary[]>([])

  const { cancelShift } = useShiftsStore()
  const [activeShift, setActiveShift] = useState<Summary | null>(null)

  const [showModal, setShowModal] = useState(false)

  const handleModal = (e?: Event) => {
    if (e) e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleCancel = async () => {
    try {
      toast.promise(
        async () => {
          await cancelShift(activeShift?._id as string)
        },
        {
          loading: "Cancelando turno...",
          success: "Turno cancelado con éxito",
          error: "Hubo un error al cancelar el turno",
        }
      )
      handleModal()
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleActiveShift = (shift: Summary) => {
    if (shift !== activeShift) {
      setActiveShift(shift)
    } else {
      setActiveShift(null)
    }
  }

  const { shifts, getShifts } = useShiftsStore()

  const filterShifts = () => {
    setFilteredShifts(
      shifts
        ?.filter((shift: Summary) => {
          return (
            shift.day.day === currentDay.getDate() &&
            shift.day.month === currentDay.getMonth() &&
            shift.day.year === currentDay.getFullYear()
          )
        })
        .sort((a: Summary, b: Summary) => {
          const time = a.hour.hour.split(":")
          const hourA = parseInt(time[0])
          const minA = parseInt(time[1])
          const timeB = b.hour.hour.split(":")
          const hourB = parseInt(timeB[0])
          const minB = parseInt(timeB[1])
          return hourA > hourB ? 1 : hourA < hourB ? -1 : minA > minB ? 1 : -1
        })
    )
  }

  const fetchShifts = async () => {
    try {
      await getShifts()
    } catch (error) {
      toast.error(error as string)
    }
  }

  useEffect(() => {
    fetchShifts()
  }, [])

  useEffect(() => {
    filterShifts()
  }, [shifts, currentDay])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full gap-8"
    >
      <div className="flex items-center justify-between w-full">
        <ChevronLeftIcon
          width={40}
          color="#FFFFFF50"
          className="cursor-pointer"
          onClick={() => {
            setCurrentDay(
              new Date(currentDay.setDate(currentDay.getDate() - 1))
            )
          }}
        ></ChevronLeftIcon>
        <Title>
          {currentDay.getDate()} de {Month[currentDay.getMonth()]}
        </Title>
        <ChevronRightIcon
          width={40}
          color="#FFFFFF50"
          className="cursor-pointer"
          onClick={() => {
            setCurrentDay(
              new Date(currentDay.setDate(currentDay.getDate() + 1))
            )
          }}
        ></ChevronRightIcon>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center w-full gap-6"
      >
        {filteredShifts?.length === 0 ? (
          <Subtitle>No hay turnos reservados</Subtitle>
        ) : (
          filteredShifts?.map((shift: Summary) => {
            const isActive = activeShift?.hour.hour === shift.hour.hour
            const delay = filteredShifts?.indexOf(shift) * 0.25
            return (
              <ShiftItem
                delay={delay}
                key={shift.hour.hour}
                data={shift}
                isActive={isActive}
                handleActive={() => handleActiveShift(shift)}
                handleModal={handleModal}
              />
            )
          })
        )}
      </motion.div>
      {showModal && (
        <Modal>
          <div className="bg-dark-regular flex flex-col items-center gap-4 p-8 w-[300px] rounded-[55px]">
            <Title>¿Estás seguro?</Title>
            <Button onClick={handleCancel} type="button" style="w-[140px] mt-2">
              Cancelar
            </Button>
            <Button onClick={handleModal} type="button" style="w-[140px]">
              Mantener
            </Button>
          </div>
        </Modal>
      )}
    </motion.div>
  )
}

export default ShiftsList
