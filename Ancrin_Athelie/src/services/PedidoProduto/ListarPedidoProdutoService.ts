import { getRepository } from 'typeorm';
import PedidoProdutoModel from '../../models/pedidoproduto';
import Pedidos from '../../models/pedidos';
import AppError from '../../errors/AppError';

interface Parameters {
  pedido_id: string;
}

export default class CriarPedidoProduto {
  public async execute({ pedido_id }: Parameters): Promise<object> {
    const pedidos = getRepository(Pedidos);
    const produtosPedidos = getRepository(PedidoProdutoModel);

    const pedidoEncontrado = await pedidos.findOne({
      where: {
        id: pedido_id,
      },
    });

    if (!pedidoEncontrado) {
      throw new AppError('Pedido não encontrado');
    }

    const pedidosEncontrados = await produtosPedidos.find({
      where: { pedido_id },
    });

    return {
      message: 'Listagem Produtos',
      ProdutosPedidos: pedidosEncontrados,
    };
  }
}
