import { getRepository } from 'typeorm';
import ModelPedidos from '../../models/pedidos';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  forma_pagamento: number;
  tipo_entrega: number;
  data_entrega: Date;
  codigo_rastreio: string;
  id: string;
}

export default class EditarPedido {
  public async execute({
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    id,
  }: Parameters): Promise<object> {
    const model = getRepository(ModelPedidos);

    const pedidoEncontrado = await model.findOne({ id });

    if (!pedidoEncontrado) {
      throw new AppError('Pedido não encontrado');
    }

    pedidoEncontrado.codigo_rastreio =
      codigo_rastreio || pedidoEncontrado.codigo_rastreio;
    pedidoEncontrado.data_atualizacao = new Date();
    pedidoEncontrado.data_entrega =
      data_entrega || pedidoEncontrado.data_entrega;
    pedidoEncontrado.tipo_entrega =
      tipo_entrega || pedidoEncontrado.tipo_entrega;
    pedidoEncontrado.forma_pagamento =
      forma_pagamento || pedidoEncontrado.forma_pagamento;

    await model.save(pedidoEncontrado);

    return {
      message: 'Pedido Editado com sucesso',
      pedido: pedidoEncontrado,
    };
  }
}
