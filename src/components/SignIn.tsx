"use client"

import Form from "@/components/Form"
import Image from "next/image"
import Title from "@/components/Title"
import logo from "@/assets/images/logo.jpg"

const SignIn = () => {
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
      <Title>Autenticación</Title>
      <Form />
    </main>
  )
}

export default SignIn
