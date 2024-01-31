"use client"

import React, { useState } from "react"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import Notification from "@/components/Notification"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useNotificationsStore } from "@/store/notifications"

const Notifications = () => {
  const { notifications, clearNotifications } = useNotificationsStore()

  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleClear = async () => {
    try {
      toast.promise(async () => await clearNotifications(), {
        loading: "Limpiando notificaciones...",
        success: "Las notificaciones se han limpiado correctamente",
        error: "Ha ocurrido un error al limpiar las notificaciones",
      })
      handleModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen style="relative">
      <section className="flex items-center justify-between w-full">
        <Title>Notificaciones</Title>
        {notifications?.length > 0 && (
          <Button type="button" style="text-xs" onClick={handleModal}>
            Limpiar todo
          </Button>
        )}
      </section>
      {notifications?.length > 0 ? (
        <section className="flex flex-col gap-6 w-full">
          {notifications?.map((notification) => {
            return <Notification key={notification._id} data={notification} />
          })}
        </section>
      ) : (
        <Subtitle>No se han encontrado notificaciones</Subtitle>
      )}
      {showModal && (
        <Modal>
          <div className="bg-dark-bold flex flex-col items-center gap-4 p-8 w-[300px] rounded-[55px]">
            <Title style="text-[#ffffff70]">¿Estás seguro?</Title>
            <Button onClick={handleClear} type="button" style="w-[140px] mt-2">
              Limpiar
            </Button>
            <Button onClick={handleModal} type="button" style="w-[140px]">
              Cancelar
            </Button>
          </div>
        </Modal>
      )}
    </Screen>
  )
}

export default Notifications
