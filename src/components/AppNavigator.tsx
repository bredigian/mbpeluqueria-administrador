"use client"

import Cookies from "js-cookie"
import SignIn from "./SignIn"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"

const AppNavigator = ({ children }: { children: React.ReactNode }) => {
  const { token, verifySession } = useAuthStore()

  const verify = async () => {
    const token = Cookies.get("token")
    if (token) {
      await verifySession(token)
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return <>{!token ? <SignIn /> : children}</>
}

export default AppNavigator
