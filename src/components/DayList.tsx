"use client"

import DayItem from "./DayItem"
import { useDaysStore } from "@/store/days"
import { useEffect } from "react"

const DayList = () => {
  const { days, getDays } = useDaysStore()

  const fetchDays = async () => {
    try {
      await getDays()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDays()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      {days?.map((item) => {
        return <DayItem key={item._id} data={item} />
      })}
    </div>
  )
}

export default DayList
