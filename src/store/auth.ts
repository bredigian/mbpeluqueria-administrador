import Cookies from "js-cookie"
import { FormValues } from "@/types/form.types"
import { URL_API } from "@/constants/api"
import { User } from "@/types/user.types"
import axios from "axios"
import { create } from "zustand"

export const useAuthStore = create((set: any) => ({
  user: null as unknown as User,
  token: null as unknown as string,

  verifySession: async (token: string) => {
    try {
      const response = await axios.post(`${URL_API}/auth/verify`, token, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        const { isValid, user } = response.data
        if (isValid) {
          set({ token })
          set({ user })
        }
      } else {
        Cookies.remove("token")
      }
    } catch (error) {
      console.log(error)
      throw new Error("Ocurrió un error al verificar la sesión")
    }
  },

  signIn: async (user: FormValues) => {
    try {
      const response = await axios.post(`${URL_API}/auth`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 201) {
        const { user, token } = response.data
        Cookies.set("token", token)
        set({ user, token })
      }
    } catch (error) {
      console.log(error)
      throw new Error("Ocurrió un error al iniciar sesión")
    }
  },
}))
