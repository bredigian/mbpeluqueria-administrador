"use client"

import { useEffect, useState } from "react"

import { IoMdAddCircleOutline } from "react-icons/io"
import Notice from "@/components/Notice"
import { Pulsar } from "@uiball/loaders"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useNotices } from "@/store/notices"
import { useRouter } from "next-nprogress-bar"

const Notices = () => {
  const { getNotices, isNotices, postNotice, notices } = useNotices()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      await getNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Screen>
      <section className="flex items-center justify-between w-full">
        <Title>Avisos</Title>
        <IoMdAddCircleOutline
          onClick={() => push("/notices/add")}
          className="text-yellow-regular text-2xl cursor-pointer"
        />
      </section>
      <Subtitle>
        Acá podrás crear y eliminar los avisos que desees comunicar.
      </Subtitle>
      {loading ? (
        <div className="grid place-items-center">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      ) : !isNotices ? (
        <p className="text-yellow-regular text-base font-medium self-center">
          No hay ningún aviso publicado
        </p>
      ) : (
        <ul className="flex flex-col items-start gap-4">
          {notices?.map((notice) => {
            return <Notice key={notice._id} data={notice} />
          })}
        </ul>
      )}
    </Screen>
  )
}

export default Notices
