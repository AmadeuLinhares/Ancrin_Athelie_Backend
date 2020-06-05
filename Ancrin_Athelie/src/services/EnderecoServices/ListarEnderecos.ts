import { getRepository } from 'typeorm';
import EnderecosModel from '../../models/enderecos';
import AppError from '../../errors/AppError';

export default class ListarEnderecos {
  public async execute(): Promise<EnderecosModel[]> {
    const enderecosModel = getRepository(EnderecosModel);

    const enderecos = await enderecosModel.find();

    return enderecos;
  }
}
