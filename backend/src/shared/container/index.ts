import { container } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";


// Registro Singleton: Cria uma instância única para toda a aplicação
container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);