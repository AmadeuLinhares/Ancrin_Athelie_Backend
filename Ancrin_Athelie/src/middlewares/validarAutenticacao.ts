import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import TokenConfig from '../config/autenticacao';
import AppError from '../errors/AppError';

interface FormatoToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function validarAutenticacaoToken(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autorizacao = request.headers.authorization;

  if (!autorizacao) {
    throw new AppError(' Token JWT inexistente ', 401);
  }

  const [, token] = autorizacao.split(' ');

  try {
    const tokenDecodificado = verify(token, TokenConfig.token.decodeKey);

    const { sub } = tokenDecodificado as FormatoToken;

    request.usuario_logado = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError(' Token invalido ', 401);
  }
}
