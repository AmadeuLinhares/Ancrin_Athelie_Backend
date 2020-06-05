import { Router, request, response } from 'express';
import multer from 'multer';
import CriarProdutoCarrinho from '../services/ProdutoCarrinhoServices/CriarProdutoCarrinhoService';
import ListarProdutoCarrinho from '../services/ProdutoCarrinhoServices/ListarProdutoCarrinhoService';
// import EditarCarrinho from '../services/ProdutoCarrinhoServices/EditarCarrinhoService';
import ExcluirProdutoCarrinho from '../services/ProdutoCarrinhoServices/DeletarProdutoCarrinhoService';

const Multer = multer();

const routerCarrinho = Router();

routerCarrinho.post(
  '/AdicionarProduto',
  Multer.any(),
  async (request, response) => {
    const { produto_id, carrinho_id } = request.body;
    const produtoCarrinho = new CriarProdutoCarrinho();

    const produtoCarrinhoCriado = await produtoCarrinho.execute({
      produto_id,
      carrinho_id,
    });

    return response.json(produtoCarrinhoCriado);
  },
);

routerCarrinho.post('/Listar', Multer.any(), async (request, response) => {
  const carrinho = new ListarProdutoCarrinho();
  const { carrinho_id } = request.body;
  const List = await carrinho.execute({
    carrinho_id,
  });

  return response.json(List);
});

routerCarrinho.post('/Excluir', Multer.any(), async (request, response) => {
  const { produto_id } = request.body;

  const carrinho = new ExcluirProdutoCarrinho();

  const carrinhoDeletado = await carrinho.execute({
    produto_id,
  });

  return response.json(carrinhoDeletado);
});

export default routerCarrinho;
