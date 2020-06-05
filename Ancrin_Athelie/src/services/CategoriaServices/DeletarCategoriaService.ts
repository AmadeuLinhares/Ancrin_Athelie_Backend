import { getRepository } from 'typeorm';
import Categoria from '../../models/categorias';
import AppError from '../../errors/AppError';

interface Parameters {
  id: string;
}
export default class DeleteCategoria {
  public async execute({ id }: Parameters): Promise<object> {
    const CategoriaModel = getRepository(Categoria);

    const deleteCategoria = await CategoriaModel.findOne(id);

    if (!deleteCategoria) {
      throw new AppError('Categoria não encontrada', 401);
    }

    await CategoriaModel.delete({ id });

    return {
      message: 'Categoria deletada com suceeso',
      dadosUser: deleteCategoria,
    };
  }
}
