import { getRepository } from 'typeorm';
import { response } from 'express';
import DepoimentosModel from '../../models/depoimentos';
import AppError from '../../errors/AppError';

export default class ExcluirDepoimento {
  public async execute({ id }: { id: string }): Promise<object> {
    const modelMetodos = getRepository(DepoimentosModel);

    const depoimento = await modelMetodos.findOne({
      where: { usuario_id: id },
    });

    if (!depoimento) {
      throw new AppError('Depoimento não encontrado', 401);
    }

    await modelMetodos.delete({ usuario_id: id });

    return {
      message: 'Depoimento excluido com sucesso',
      depoimento,
    };
  }
}
