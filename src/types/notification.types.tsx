export interface Notification {
  _id: string
  day: string
  time: string
  user: string
  readed?: boolean
  type: "reserve" | "cancel"
}
