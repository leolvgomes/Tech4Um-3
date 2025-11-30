import {hash} from "bcryptjs"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IUsersRepository } from "../repositories/IUsersRepository"
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../infra/prisma/repositories/UsersRepository";

class CreateUserService {
    private usersRepository: IUsersRepository;
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async execute({name, email, password}: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists){
            throw new AppError("User already exists", 401);
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        });

        return user;
    }
}

export {CreateUserService}