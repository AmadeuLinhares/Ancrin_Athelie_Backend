import { getRepository } from 'typeorm';
import Carrinho from '../../models/carrinhos';
import AppError from '../../errors/AppError';

interface Parameters {
  id: string;
}
export default class DeleteCarrinhos {
  public async execute({ id }: Parameters): Promise<object> {
    const model = getRepository(Carrinho);

    const deleteElemento = await model.findOne(id);

    if (!deleteElemento) {
      throw new AppError('Carrinho não encontrado', 401);
    }

    await model.delete({ id });

    return {
      message: 'Carrinho deletado com suceeso',
      carrinho: deleteElemento,
    };
  }
}
