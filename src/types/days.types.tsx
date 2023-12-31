import { WorkHour } from "./hour.types"

export interface Day {
  _id: string
  value: string
  path: string
  hours: WorkHour[]
  weekday: number
}
