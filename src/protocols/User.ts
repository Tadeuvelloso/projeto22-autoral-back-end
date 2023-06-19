export type User = {
    email: string,
    name: string,
    password: string
}

export type userReturn = Omit<User, "password">

export type userLogin = Omit<User, "name">

export type userDb = userLogin & {
    id: number
}