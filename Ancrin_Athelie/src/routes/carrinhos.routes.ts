import { Router, request, response } from 'express';
import multer from 'multer';
import CriarCarrinho from '../services/CarrinhoServices/CriarCarrinhooService';
import ListarCarrinho from '../services/CarrinhoServices/ListarCarrinhoService';
import EditarCarrinho from '../services/CarrinhoServices/EditarCarrinhoService';
import ExcluirCarrinho from '../services/CarrinhoServices/DeletarCarrinhoService';

const Multer = multer();

const routerCarrinho = Router();

routerCarrinho.post('/Criar', Multer.any(), async (request, response) => {
  const { usuario_id } = request.body;
  const carrinho = new CriarCarrinho();

  const carrinhoCriado = await carrinho.execute({
    usuario_id,
  });

  return response.json(carrinhoCriado);
});

routerCarrinho.get('/Listar', async (request, response) => {
  const carrinho = new ListarCarrinho();

  const List = await carrinho.execute();

  return response.json(List);
});

// routerCarrinho.post('/Editar', Multer.any(), async (request, response) => {
//   try {
//     const { nome, descricao, id } = request.body;

//     const categoria = new EditarCategoria();

//     const categoriaCriada = await categoria.execute({
//       nome,
//       descricao,
//       id,
//     });

//     return response.json(categoriaCriada);
//   } catch (err) {
//     return response.status(400).json({ message: err.message });
//   }
// });

routerCarrinho.post('/Excluir', Multer.any(), async (request, response) => {
  const { id } = request.body;

  const carrinho = new ExcluirCarrinho();

  const carrinhoDeletado = await carrinho.execute({
    id,
  });

  return response.json(carrinhoDeletado);
});

export default routerCarrinho;
