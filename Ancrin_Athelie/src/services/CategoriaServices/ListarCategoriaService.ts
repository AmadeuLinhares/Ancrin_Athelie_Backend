import { getRepository } from 'typeorm';
import Categorias from '../../models/categorias';
import AppError from '../../errors/AppError';

export default class ListarCategorias {
  public async execute(): Promise<Categorias[]> {
    const model = getRepository(Categorias);

    const listaCategorias = await model.find();

    return listaCategorias;
  }
}
