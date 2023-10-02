import { ConnectionStates, connect, connection } from "mongoose"

import { MONGO_URI } from "@/constants/api"

const initialState = {
  isConnected: ConnectionStates.uninitialized,
}

export const connectDB = async () => {
  if (initialState.isConnected === ConnectionStates.connected) return

  const db = await connect(MONGO_URI, {
    dbName: "mbpeluqueria",
  })
  initialState.isConnected = db.connection.readyState
}

connection.on("connected", () => {
  console.log("Mongoose is connected")
})

connection.on("error", () => {
  console.log("Mongoose connection error")
})
