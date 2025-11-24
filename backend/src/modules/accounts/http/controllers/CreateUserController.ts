import { Request, Response } from "express";
import { CreateUserService } from "@modules/accounts/services/CreateUserService";
import AppError from "@shared/errors/AppError";

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response>{
        const {name, email, password} = req.body;

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({
            name, email, password
        });

        return res.status(201).json(user);
        } catch(err){
            throw new AppError("Dados invalidos!", 401)
        }
    }
}

export { CreateUserController };