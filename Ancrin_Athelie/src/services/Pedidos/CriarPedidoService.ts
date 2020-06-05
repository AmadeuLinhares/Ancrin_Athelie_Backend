import { getRepository } from 'typeorm';
import ModelPedidos from '../../models/pedidos';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface Parameters {
  forma_pagamento: number;
  tipo_entrega: number;
  data_entrega: Date;
  codigo_rastreio: string;
  usuario_id: string;
}

export default class CriarPedido {
  public async execute({
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    usuario_id,
  }: Parameters): Promise<object> {
    const model = getRepository(ModelPedidos);
    const modelUsuarios = getRepository(Usuarios);

    const encontrarUsuario = await modelUsuarios.findOne({
      where: { id: usuario_id },
    });

    if (!encontrarUsuario) {
      throw new AppError(
        'O pedido não pode ser criado pois o usuario não existe',
      );
    }

    const pedidosCriado = model.create({
      forma_pagamento,
      tipo_entrega,
      data_entrega,
      codigo_rastreio,
      usuario_id,
    });

    await model.save(pedidosCriado);

    return {
      message: 'Pedido criado com sucesso',
      pedido: pedidosCriado,
    };
  }
}
