import { getRepository } from 'typeorm';
import EnderecosModel from '../../models/enderecos';
import AppError from '../../errors/AppError';

interface Parameters {
  user_id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: number;
}

export default class EditarEndereco {
  public async execute({
    user_id,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numero,
  }: Parameters): Promise<object> {
    const enderecoModel = getRepository(EnderecosModel);
    const findAdress = await enderecoModel.findOne({
      where: { usuario_id: user_id },
    });

    if (!findAdress) {
      throw new AppError('Endereço não encontrado', 401);
    }

    findAdress.bairro = bairro;
    findAdress.cep = cep;
    findAdress.logradouro = logradouro;
    findAdress.complemento = complemento;
    findAdress.localidade = localidade;
    findAdress.uf = uf;
    findAdress.numero = numero;

    await enderecoModel.save(findAdress);

    return {
      message: 'Endereço editado com sucesso',
      adress: findAdress,
    };
  }
}
