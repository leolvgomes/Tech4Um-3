import { compare } from "bcryptjs";
import { ILoginUserDTO } from "../dtos/ILoginUserDTO";
import { UsersRepository } from "../infra/prisma/repositories/UsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";

class LoginUserService {
    private userRepository: IUsersRepository;
    constructor() {
        this.userRepository = new UsersRepository()
    }

    async execute({ email, password }: ILoginUserDTO) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Login with incorrect info");
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Login with incorrect info");
        }

        const token = sign({}, "segredinho", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { LoginUserService }