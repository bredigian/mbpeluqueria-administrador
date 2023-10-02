export interface User {
  name: string
  username: string
  password?: string
}

export interface UserDatabase {
  _id: string
  user: User
}
