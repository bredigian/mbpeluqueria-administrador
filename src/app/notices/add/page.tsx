"use client"

import Button from "@/components/Button"
import Screen from "@/components/Screen"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useNotices } from "@/store/notices"
import { useState } from "react"

const AddNotice = () => {
  const { postNotice } = useNotices()
  const [value, setValue] = useState("")

  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      toast.promise(async () => await postNotice(value), {
        loading: "Creando aviso...",
        success: "Aviso creado!",
        error: "Ocurrió un error al crear el aviso",
      })
      setValue("")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Screen>
      <Title>Crear aviso</Title>
      <form
        onSubmit={handlePost}
        className="flex flex-col items-center gap-6 w-full"
      >
        <textarea
          className="bg-dark-regular w-full text-yellow-regular rounded-xl resize-none outline-none min-h-[120px] p-4"
          value={value}
          onChange={onChangeValue}
          required
        />
        <Button isDisabled={value.length === 0} type="submit" style="w-full">
          Agregar
        </Button>
      </form>
    </Screen>
  )
}

export default AddNotice
