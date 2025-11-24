import { LoginUserService } from "@modules/accounts/services/LoginUserService";
import { Request, Response } from "express";

class LoginUserController{
    async handle(req: Request, res: Response): Promise<Response>{
        const {email, password} = req.body

        const loginUserService = new LoginUserService()

        const tokenResponse = await loginUserService.execute({email, password})

        return res.status(200).json( tokenResponse )
    }
}

export {LoginUserController}