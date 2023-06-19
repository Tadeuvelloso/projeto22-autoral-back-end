import prisma from "../database/db.js";

async function newSession(userId: number, token: string) {
    return prisma.session.create({
        data: {
            userId, 
            token
        }
    })
}

async function findSession(userId: number) {
    return prisma.session.findFirst({
        where: {
            userId
        }
    })
}

async function deleteSession(id: number) {
    return await prisma.session.delete({
        where: {id}
    })
}

export {
    newSession,
    deleteSession,
    findSession
}