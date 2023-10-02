"use client"

import Button from "./Button"
import { FormValues } from "@/types/form.types"
import Input from "./Input"
import { InputType } from "@/types/input.types"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { push } = useRouter()
  const { signIn } = useAuthStore()

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data)
      toast.success("Sesión iniciada correctamente")
    } catch (error) {
      console.log(error)
      toast.error("Usuario y/o contraseña incorrectos")
    }
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
      <Button style="self-center mt-8" type="submit">
        Iniciar Sesión
      </Button>
    </form>
  )
}

export default Form
