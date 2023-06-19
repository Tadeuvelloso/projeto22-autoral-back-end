import prisma from "../database/db.js"
import { User } from "../protocols/User.js"


async function newUser(user: User) {
    return await prisma.users.create({
        data: {
            email: user.email,
            name: user.name,
            password: user.password
        }
    })
}

async function findUserByEmail(email: string) {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}

export {
    newUser,
    findUserByEmail
}