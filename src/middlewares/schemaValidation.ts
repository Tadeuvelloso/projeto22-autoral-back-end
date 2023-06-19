import { Request, Response, NextFunction } from "express";
import { User } from "../protocols/User.js";


export function checkUserObj (schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body as User | any;

 
    if (!user) {
        return res.sendStatus(400);
    }

    const { error } = schema.validate(user, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail: any) => detail.message);
        return res.status(422).send(errors);
    }

    res.locals.user = user;
    next();
    }
}