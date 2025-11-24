import 'reflect-metadata'; // Injeção de dependências
import 'express-async-errors'; // Quando da erro joga direto para o tratamento de erros
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';

import { userRouter } from '@modules/accounts/http/routes';
import { roomRouter } from '@modules/rooms/http/routes';
import { swaggerRoutes } from './routes/swagger.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter)
app.use(roomRouter)
app.use("/api-docs", swaggerRoutes)

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: "Backend Tech4Um Rodando!" });
});

// Middleware de Erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

export { app };