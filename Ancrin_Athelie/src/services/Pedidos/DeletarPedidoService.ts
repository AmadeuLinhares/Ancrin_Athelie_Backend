import { getRepository } from 'typeorm';
import ModelPedidos from '../../models/pedidos';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  id: string;
}

export default class DeletarPedido {
  public async execute({ id }: Parameters): Promise<object> {
    const model = getRepository(ModelPedidos);

    const pedidoEncontrado = await model.findOne({
      id,
    });

    if (!pedidoEncontrado) {
      throw new AppError('Pedido não encontrado');
    }

    await model.delete({ id });

    return {
      message: 'Pedido deletado com sucesso',
      pedido: pedidoEncontrado,
    };
  }
}
