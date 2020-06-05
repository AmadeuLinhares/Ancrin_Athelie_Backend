import { getRepository } from 'typeorm';
import EnderecoModel from '../../models/enderecos';
import AppError from '../../errors/AppError';

interface ParametersReq {
  id: string;
}

export default class ExcluirEndereco {
  public async execute({ id }: ParametersReq): Promise<object> {
    const enderecoModel = getRepository(EnderecoModel);

    const findAdress = await enderecoModel.findOne({
      where: { usuario_id: id },
    });

    if (!findAdress) {
      throw new AppError('Endereco não encontrado', 401);
    }

    await enderecoModel.delete({ usuario_id: id });

    return {
      message: 'Endereco Excluido com sucesso',
      adress: findAdress,
    };
  }
}
