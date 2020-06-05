import { getRepository, Db, InsertResult } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import SessaoModel from '../models/usuarios';
import TokenConfig from '../config/autenticacao';
import AppError from '../errors/AppError';

interface Sessao {
  login: string;
  senha: string;
}

interface Response {
  user: SessaoModel;
  token: string;
}

class AutenticarSessaoUsuario {
  public async execute({ login, senha }: Sessao): Promise<object | null> {
    const sessaoRepositorio = getRepository(SessaoModel);
    const isEmail = await sessaoRepositorio.findOne({
      where: { email: login },
    });

    const isCpf = await sessaoRepositorio.findOne({
      where: { cpf: login },
    });

    if (!isEmail && !isCpf) {
      throw new AppError('E-mail/Senha invalidos', 401);
    }

    const user = !isEmail ? isCpf : isEmail;

    // Db.senha = ->senha criptografada
    // senha digitada pelo usuario => senha descriptografada
    if (user) {
      const comparaSenhas = await compare(senha, user.senha);

      if (!comparaSenhas) {
        throw new AppError('E-mail/Senha invalidos', 401);
      }

      const token = sign({}, TokenConfig.token.decodeKey, {
        subject: user.id,
        expiresIn: TokenConfig.token.dataExpiracao,
      });
      // Primeiro parametro do sign, é uma informacao que nao é segura dentro do token, entao nunca colocar senha, email, etc
      // Segundo parametro:
      // Terceiro parametro

      return {
        user,
        token,
      };
    }
    return null;
  }
}

export default AutenticarSessaoUsuario;
