import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import Usuarios from '../../models/usuarios';
import Depoimentos from '../../models/depoimentos';
import configToken from '../../config/autenticacao';
import AppError from '../../errors/AppError';

interface DadosDepoimento {
  texto: string;
  user_id: string;
}

interface FormatoToken {
  iat: number;
  exp: number;
  sub: string;
}

export default class CriarDepoimento {
  public async execute({
    texto,
    user_id,
  }: DadosDepoimento): Promise<Depoimentos> {
    // verifica se o usuario existe

    const usuario = getRepository(Usuarios);
    const depoimentos = getRepository(Depoimentos);

    const usuarioDepoimento = await usuario.findOne({
      where: { id: user_id },
    });

    if (!usuarioDepoimento) {
      throw new AppError('Usuario não encontrado', 401);
    }

    const novoDepoimento = depoimentos.create({
      usuario_id: user_id,
      texto,
    });

    await depoimentos.save(novoDepoimento);

    return novoDepoimento;
  }
}
