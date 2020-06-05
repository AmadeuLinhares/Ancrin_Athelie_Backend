import { getRepository } from 'typeorm';
import Produto from '../../models/produtos';
import AppError from '../../errors/AppError';

interface Parameters {
  id: string;
}
export default class DeleteProdutos {
  public async execute({ id }: Parameters): Promise<object> {
    const model = getRepository(Produto);

    const deleteElemento = await model.findOne(id);

    if (!deleteElemento) {
      throw new AppError('Produto não encontrado');
    }

    await model.delete({ id });

    return {
      message: 'Produto deletado com suceeso',
      dadosUser: deleteElemento,
    };
  }
}
