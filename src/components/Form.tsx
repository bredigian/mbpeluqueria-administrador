"use client"

import Button from "./Button"
import { FormValues } from "@/types/form.types"
import Input from "./Input"
import { InputType } from "@/types/input.types"
import { Pulsar } from "@uiball/loaders"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useForm } from "react-hook-form"
import { useState } from "react"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { signIn } = useAuthStore()

  const [logging, setLogging] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLogging(true)
    try {
      await signIn(data)
      toast.success("Sesión iniciada correctamente")
    } catch (error) {
      console.log(error)
      toast.error("Usuario y/o contraseña incorrectos")
    }
    setLogging(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4 w-full"
    >
      <Input
        name="username"
        type={InputType.Text}
        register={register}
        minLength={8}
        error={errors.username}
        errorMessage={{
          minLength: "Debe tener al menos 6 caracteres",
          required: "El usuario es requerido",
        }}
      >
        Usuario
      </Input>
      <Input
        name="password"
        type={InputType.Password}
        register={register}
        minLength={10}
        error={errors.password}
        errorMessage={{
          minLength: "Debe tener al menos 10 caracteres",
          required: "La contraseña es requerida",
        }}
      >
        Contraseña
      </Input>
      {!logging ? (
        <Button style="self-center mt-8" type="submit">
          Iniciar Sesión
        </Button>
      ) : (
        <div className="grid place-items-center self-center mt-8">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      )}
    </form>
  )
}

export default Form
