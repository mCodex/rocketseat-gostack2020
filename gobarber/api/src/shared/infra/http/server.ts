import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import uploadConfig from '@config/Upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container/index';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => console.log(`🚀 Running on port ${port}`));
