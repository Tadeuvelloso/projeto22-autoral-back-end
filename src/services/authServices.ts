import { newUser, findUserByEmail } from "../repository/userRepository.js";
import { User, userReturn, userLogin, userDb } from "../protocols/User.js";
import { newSession, deleteSession, findSession } from "../repository/sessionRepository.js";
import { unauthorizedError } from "../errors/unauthorized-error.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
import { badRequestError } from "../errors/bad-request-error.js";

export async function createUser(user: User): Promise<userReturn> {
    
    try{
        
        const hashPassword = bcrypt.hashSync(user.password, 5);

        const newUserUbj = {
            email: user.email,
            password: hashPassword,
            name: user.name
        }
        
        await newUser(newUserUbj);

        const userReturn = user;
        delete userReturn.password;

        return userReturn;
    } catch (error) {
        throw new Error(error.message);
    } 
}


export async function authSignIn (user: userLogin): Promise<string> {
    const token = uuidV4();
    try {
        const findUserInDb = await findUserByEmail(user.email) as userDb;
        
        if(!findUserInDb){
            throw unauthorizedError();
        }
       
        const { password } = user;
      
        console.log(findUserInDb.password);
        const passwordValidation = bcrypt.compareSync(password, findUserInDb.password)
        
        if (!passwordValidation) {
            throw unauthorizedError();
        }
        const checkSessionInDb = await findSession(findUserInDb.id);
  
        if(!checkSessionInDb){
            await newSession(findUserInDb.id, token);
            return token
        }
        
        return checkSessionInDb.token;
    } catch (error) {
        throw badRequestError();
    } 
}

const authService = {
    createUser,
    authSignIn
}
export default authService 