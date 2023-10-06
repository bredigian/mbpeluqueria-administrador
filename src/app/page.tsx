"use client"

import Button from "@/components/Button"
import Image from "next/image"
import Menu from "@/components/Menu"
import Modal from "@/components/Modal"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useState } from "react"

const Home = () => {
  const { user, token, signOut } = useAuthStore()

  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const onSignOut = async () => {
    try {
      toast.promise(
        async () => {
          await signOut(token)
        },
        {
          loading: "Cerrando sesión...",
          success: "Sesión cerrada correctamente",
          error: "Ha ocurrido un error al cerrar sesión",
        }
      )
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col items-center gap-8 py-16 px-6">
        <Image
          width={160}
          height={160}
          src={logo}
          alt="Logo de MB Peluqueria"
          style={{
            borderRadius: "100%",
          }}
        />
        <div className="flex flex-col gap-2 ml-2">
          <Title>{`¡Hola, ${user?.name?.split(" ")[0]}!`}</Title>
          <Subtitle>
            En este menú podrás seleccionar la opcion de lo que desees gestionar
          </Subtitle>
        </div>
        <Menu />
        <Button
          delay={0.5}
          onClick={handleModal}
          type="button"
          style="fixed bottom-6"
        >
          Cerrar sesión
        </Button>
      </div>
      {showModal && (
        <Modal>
          <div className="bg-dark-bold flex flex-col items-center gap-4 p-8 w-[300px] rounded-[55px]">
            <Title style="text-[#ffffff70]">¿Estás seguro?</Title>
            <Button onClick={onSignOut} type="button" style="w-[140px] mt-2">
              Cerrar sesión
            </Button>
            <Button onClick={handleModal} type="button" style="w-[140px]">
              Cancelar
            </Button>
          </div>
        </Modal>
      )}
    </motion.main>
  )
}

export default Home
