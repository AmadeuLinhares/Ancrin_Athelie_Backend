import { Router, request, response } from 'express';
import multer from 'multer';
import CriarPedidoProduto from '../services/PedidoProduto/CriarPedidoProdutoService';
import ListarPedidoProduto from '../services/PedidoProduto/ListarPedidoProdutoService';
// import EditarPedidoProduto from '../services/PedidoProduto/EditarPedidoProdutoService';
import DeletarPedidoProduto from '../services/PedidoProduto/DeletarPedidoProdutoServices';

const Multer = multer();
const pedidoprodutoRouter = Router();

pedidoprodutoRouter.post('/Criar', Multer.any(), async (request, response) => {
  const { produto_id, pedido_id } = request.body;

  const criarProdutoPedido = new CriarPedidoProduto();

  const produtoPedidoCriado = await criarProdutoPedido.execute({
    produto_id,
    pedido_id,
  });

  return response.json(produtoPedidoCriado);
});

pedidoprodutoRouter.post('/Listar', Multer.any(), async (request, response) => {
  const { pedido_id } = request.body;

  const listarProdutoPedido = new ListarPedidoProduto();

  const produtoPedidoList = await listarProdutoPedido.execute({
    pedido_id,
  });

  return response.json(produtoPedidoList);
});

pedidoprodutoRouter.post(
  '/Deletar',
  Multer.any(),
  async (request, response) => {
    const { produto_id, pedido_id } = request.body;

    const deletarProdutoPedido = new DeletarPedidoProduto();

    const produtoPedidoDelete = await deletarProdutoPedido.execute({
      produto_id,
      pedido_id,
    });

    return response.json(produtoPedidoDelete);
  },
);

export default pedidoprodutoRouter;
