import { getRepository } from 'typeorm';
import EnderecoRepositorio from '../../repositories/enderecosRepositorio';
import Enderecos from '../../models/enderecos';
import AppError from '../../errors/AppError';

interface FormatoVariaveis {
  user_id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: number;
}

export default class CriarEndereco {
  public async execute({
    user_id,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numero,
  }: FormatoVariaveis): Promise<Enderecos> {
    const enderecosModel = getRepository(Enderecos);

    const repositorio = new EnderecoRepositorio();

    const convertCep = repositorio.removerPontuacaoCep(cep);

    const novoEndereco = enderecosModel.create({
      usuario_id: user_id,
      cep: convertCep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      numero,
    });

    await enderecosModel.save(novoEndereco);

    return novoEndereco;
  }
}
