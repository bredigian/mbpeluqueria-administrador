import { Client } from "./client.types"
import { Date } from "./date.types"
import { Hour } from "./hour.types"

export interface SummaryItem {
  item: string
  value: string
}

export interface Summary {
  user: Client
  day: Date
  hour: Hour
  _id: string
}
