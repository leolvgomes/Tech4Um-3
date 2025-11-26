import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string
}

async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const {sub: user_id} = verify(token, "segredinho") as IPayload

        req.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError("Invalid token", 401)
    }

}

export {ensureAuthenticated}