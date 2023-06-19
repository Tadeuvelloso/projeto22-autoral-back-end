import { Request, Response } from "express";
import { User, userLogin } from "../protocols/User.js";
import { newUser, findUserByEmail } from "../repository/userRepository.js";
import { newSession, deleteSession, findSession } from "../repository/sessionRepository.js";
import authService from "../services/authServices.js"

export async function signUp (req: Request, res: Response) {
    const user = res.locals.user as User;

    try{
        await authService.createUser(user);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function signIn (req: Request, res: Response)  {
    const user = res.locals.user as userLogin;

    try{
        const userInf = await authService.authSignIn(user);
        res.send(userInf);
    } catch (error) {
        return res.status(500).send(error.message)
    }

}