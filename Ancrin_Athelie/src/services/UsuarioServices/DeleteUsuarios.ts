import { getRepository } from 'typeorm';
import Usuarios from '../../models/usuarios';

interface Parameters {
  id: string;
}
export default class DeleteUsuarios {
  public async execute({ id }: Parameters): Promise<Record<string, any>> {
    const usuariosModel = getRepository(Usuarios);

    const findUsers = await usuariosModel.findOne(id);

    if (!findUsers) {
      throw new Error('Usuario não encontrado');
    }

    const deleteUsers = await usuariosModel.delete({ id });

    return {
      message: 'Usuario deletado com suceeso',
      dadosUser: findUsers,
    };
  }
}
