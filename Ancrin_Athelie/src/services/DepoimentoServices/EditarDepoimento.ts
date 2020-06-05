import { getRepository } from 'typeorm';
import DepoimentosModel from '../../models/depoimentos';
import AppError from '../../errors/AppError';

interface Parameters {
  texto: string;
  user_id: string;
}
export default class EditarDepoimento {
  public async execute({ texto, user_id }: Parameters): Promise<object> {
    const depoimentosModel = getRepository(DepoimentosModel);

    const depoimento = await depoimentosModel.findOne({
      where: { usuario_id: user_id },
    });

    if (!depoimento) {
      throw new AppError('Depoimento não encontrado', 401);
    }

    depoimento.texto = texto;

    return {
      message: 'Depoimento alterado com sucesso',
      depoimento,
    };
  }
}
