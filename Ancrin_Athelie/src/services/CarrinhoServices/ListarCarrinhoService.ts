import { getRepository } from 'typeorm';
import Carrinhos from '../../models/carrinhos';
import AppError from '../../errors/AppError';

export default class ListarCarrinhos {
  public async execute(): Promise<Carrinhos[]> {
    const model = getRepository(Carrinhos);

    const listaCarrinhos = await model.find();

    return listaCarrinhos;
  }
}
