import { getRepository } from 'typeorm';
import Produtos from '../../models/produtos';
import AppError from '../../errors/AppError';

export default class ListarProdutos {
  public async execute(): Promise<Produtos[]> {
    const model = getRepository(Produtos);

    const listaProdutos = await model.find();

    return listaProdutos;
  }
}
