import { getRepository } from 'typeorm';
import PedidoProdutoModel from '../../models/pedidoproduto';
import Pedidos from '../../models/pedidos';
import AppError from '../../errors/AppError';

interface Parameters {
  produto_id: string;
  pedido_id: string;
}

export default class CriarPedidoProduto {
  public async execute({ produto_id, pedido_id }: Parameters): Promise<object> {
    const pedidos = getRepository(Pedidos);
    const produtosPedidos = getRepository(PedidoProdutoModel);

    const pedidoEncontrado = await pedidos.findOne({
      where: {
        id: pedido_id,
      },
    });

    if (!pedidoEncontrado) {
      throw new AppError('Pedido não encontrado', 401);
    }

    const produtoPedido = await produtosPedidos.findOne({
      where: {
        pedido_id,
        produto_id,
      },
    });

    if (!produtoPedido) {
      throw new AppError('Produto não encontrado', 401);
    }

    produtosPedidos.delete({ id: produtoPedido?.id });

    return {
      message: 'Produto Deletado do Pedido',
      Produtos: produtoPedido,
    };
  }
}
