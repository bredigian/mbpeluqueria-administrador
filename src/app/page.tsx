"use client"

import Button from "@/components/Button"
import Image from "next/image"
import Menu from "@/components/Menu"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"

const Home = () => {
  const { user, token, signOut } = useAuthStore()

  const onSignOut = async () => {
    try {
      await signOut(token)
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <main className="flex flex-col items-center gap-8 py-16 px-6">
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
        <Title>{`¡Hola, ${user.name.split(" ")[0]}!`}</Title>
        <Subtitle>
          En este menú podrás seleccionar la opcion de lo que desees gestionar
        </Subtitle>
      </div>
      <Menu />
      <Button onClick={onSignOut} type="button" style="fixed bottom-6">
        Cerrar sesión
      </Button>
    </main>
  )
}

export default Home
