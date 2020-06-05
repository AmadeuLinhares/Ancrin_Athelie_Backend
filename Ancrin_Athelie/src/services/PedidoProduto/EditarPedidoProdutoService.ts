// import { getRepository } from 'typeorm';
// import PedidoProdutoModel from '../../models/pedidoproduto';
// import Pedidos from '../../models/pedidos';

// interface Parameters {
//   produto_id: string;
//   pedido_id: string;
// }

// export default class CriarPedidoProduto {
//   public async execute({ produto_id, pedido_id }: Parameters): Promise<object> {
//     const pedidos = getRepository(Pedidos);
//     const produtosPedidos = getRepository(PedidoProdutoModel);

//     const pedidoEncontrado = await pedidos.findOne({
//       where: {
//         id: pedido_id,
//       },
//     });

//     if (!pedidoEncontrado) {
//       throw new Error('Pedido não encontrado');
//     }

//     const pedidoCriado = produtosPedidos.create({
//       produto_id,
//       pedido_id,
//     });

//     await produtosPedidos.save(pedidoCriado);

//     return {
//       message: 'Produto adcionado ao pedido',
//       produtoPedido: pedidoCriado,
//     };
//   }
// }
