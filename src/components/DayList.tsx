"use client"

import { useEffect, useState } from "react"

import DayItem from "./DayItem"
import { Pulsar } from "@uiball/loaders"
import { useDaysStore } from "@/store/days"

const DayList = () => {
  const { days, getDays } = useDaysStore()
  const [loading, setLoading] = useState(false)

  const fetchDays = async () => {
    setLoading(true)
    try {
      await getDays()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDays()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <div className="grid place-items-center w-full h-44">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      ) : (
        days?.map((item) => {
          return <DayItem key={item._id} data={item} />
        })
      )}
    </div>
  )
}

export default DayList
