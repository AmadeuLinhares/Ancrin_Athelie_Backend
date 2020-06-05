import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import Depoimentos from '../../models/depoimentos';
import configToken from '../../config/autenticacao';
import AppError from '../../errors/AppError';

interface ParametroRecebido {
  token: string;
}

interface FormatoToken {
  iat: number;
  exp: number;
  sub: string;
}

export default class ListarDepoimentos {
  public async execute(): Promise<Depoimentos[]> {
    const depoimentos = getRepository(Depoimentos);

    const depoimentosEncontrados = depoimentos.find();

    return depoimentosEncontrados;
  }
}
