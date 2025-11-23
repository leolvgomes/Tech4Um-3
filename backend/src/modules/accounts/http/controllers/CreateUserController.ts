import { Router, Request, Response } from "express";
import { CreateUserService } from "@modules/accounts/services/CreateUserService";
import { container } from "tsyringe";

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response>{
        const {name, email, password} = req.body;

        const createUserService = container.resolve(CreateUserService); // ta pedindo para o container "injetar" alguem para realizar o createUserService

        const user = await createUserService.execute({
            name, email, password
        });

        return res.status(201).json(user);
    }
}

export { CreateUserController };