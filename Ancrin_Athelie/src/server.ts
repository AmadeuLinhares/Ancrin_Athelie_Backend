import 'reflect-metadata';
import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadconfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(cors());
app.use('/files', express.static(uploadconfig.diretorio));
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusError).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
app.listen(3333, () => {
  console.log('server started on port 3333 :)');
});
