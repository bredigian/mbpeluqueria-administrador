"use client"

import { useEffect, useState } from "react"

import Cookies from "js-cookie"
import ProviderProgressBar from "./ProviderProgressBar"
import ScreenLoader from "./ScreenLoader"
import SignIn from "./SignIn"
import { useAuthStore } from "@/store/auth"

const AppNavigator = ({ children }: { children: React.ReactNode }) => {
  const { token, verifySession } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const verify = async () => {
    const token = Cookies.get("token")
    try {
      if (token) {
        await verifySession(token)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    verify()
  }, [])
  if (loading) return <ScreenLoader />

  return (
    <>
      {!token ? (
        <SignIn />
      ) : (
        <ProviderProgressBar>{children}</ProviderProgressBar>
      )}
    </>
  )
}

export default AppNavigator
