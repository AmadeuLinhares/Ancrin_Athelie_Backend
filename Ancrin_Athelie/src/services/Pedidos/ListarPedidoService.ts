import { getRepository } from 'typeorm';
import ModelPedidos from '../../models/pedidos';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  usuario_id: string;
}

export default class ListarPedido {
  public async execute({ usuario_id }: Parameters): Promise<ModelPedidos[]> {
    const model = getRepository(ModelPedidos);
    const modelUsuarios = getRepository(Usuarios);

    const encontrarUsuario = await modelUsuarios.findOne({
      where: { id: usuario_id },
    });

    if (!encontrarUsuario) {
      throw new AppError('Usuario não encontrado');
    }

    const pedidoEncontrado = await model.find({
      usuario_id,
    });

    return pedidoEncontrado;
  }
}
