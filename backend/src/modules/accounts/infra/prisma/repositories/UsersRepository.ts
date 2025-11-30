import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PrismaClient, User } from "@prisma/client";

class UsersRepository implements IUsersRepository{
    private repository: PrismaClient;

    constructor(){
        this.repository = new PrismaClient();
    }

    async create({name, email, password}: ICreateUserDTO): Promise<User> {
        const user = await this.repository.user.create({
            data: {
                name,
                email,
                password
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: {email}
        });
        return user;
    }

}

export {UsersRepository}