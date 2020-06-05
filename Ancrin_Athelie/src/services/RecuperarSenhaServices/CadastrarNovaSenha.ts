import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import TokenModel from '../../models/recuperacaoSenha';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  nova_senha: string;
  token: string;
}

class CadastrarNovaSenha {
  public async execute({ nova_senha, token }: Parameters): Promise<Usuarios> {
    const modelToken = getRepository(TokenModel);
    const modelUsuario = getRepository(Usuarios);

    const findToken = await modelToken.findOne({
      where: {
        token,
      },
    });

    if (!findToken) {
      throw new AppError('Token invalido');
    }

    const UsuarioEncontrado = await modelUsuario.findOne({
      where: {
        id: findToken.usuario_id,
      },
    });

    if (!UsuarioEncontrado) {
      throw new AppError('Usuario não encontrado');
    }

    const dateCreateToken = findToken.data_criacao;

    const verificaExpiracaoToken = addHours(dateCreateToken, 2);

    if (isAfter(Date.now(), verificaExpiracaoToken)) {
      throw new AppError('token expirado');
    }

    const senhaCriptografada = await hash(nova_senha, 8);

    UsuarioEncontrado.senha = senhaCriptografada;

    await modelUsuario.save(UsuarioEncontrado);

    return UsuarioEncontrado;
  }
}

export default CadastrarNovaSenha;
