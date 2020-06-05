import { getRepository } from 'typeorm';
import TokenModel from '../../models/recuperacaoSenha';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  email: string;
}

class CriarToken {
  public async execute({ email }: Parameters): Promise<TokenModel> {
    const usuariosModel = getRepository(Usuarios);
    const modelToken = getRepository(TokenModel);
    const usuarioEncontrado = await usuariosModel.findOne({
      where: {
        email,
      },
    });

    if (!usuarioEncontrado) {
      throw new AppError('Usuario nao encontrado');
    }

    const criacaoToken = modelToken.create({
      usuario_id: usuarioEncontrado.id,
    });

    await modelToken.save(criacaoToken);

    return criacaoToken;
  }
}

export default CriarToken;
