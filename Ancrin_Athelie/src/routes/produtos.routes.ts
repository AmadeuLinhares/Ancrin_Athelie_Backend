import { Router, request, response } from 'express';
import multer from 'multer';
import CriarProduto from '../services/ProdutoServices/CriarProdutoService';
import ListarProduto from '../services/ProdutoServices/ListarProdutoService';
import EditarProduto from '../services/ProdutoServices/EditarProdutoService';
import ExcluirProduto from '../services/ProdutoServices/DeletarProdutoService';

const routerProdutos = Router();
const Multer = multer();

routerProdutos.post(
  '/Criar',
  Multer.single('foto'),
  async (request, response) => {
    const foto = request.file.originalname;
    const {
      nome,
      descricao,
      preco,
      disponibilidade,
      subtitulo,
      categoria_id,
    } = request.body;
    const criar = new CriarProduto();

    const produtoCriado = await criar.execute({
      nome,
      descricao,
      preco,
      disponibilidade,
      subtitulo,
      categoria_id,
      foto,
    });

    return response.json(produtoCriado);
  },
);

routerProdutos.get('/Listar', Multer.any(), async (request, response) => {
  const listar = new ListarProduto();

  const produtos = await listar.execute();

  return response.json(produtos);
});

routerProdutos.post(
  '/Editar',
  Multer.single('foto'),
  async (request, response) => {
    const foto = request.file.originalname;
    const {
      id,
      nome,
      descricao,
      preco,
      disponibilidade,
      subtitulo,
      categoria_id,
    } = request.body;
    const editar = new EditarProduto();

    const produtoEditado = await editar.execute({
      nome,
      id,
      descricao,
      preco,
      disponibilidade,
      subtitulo,
      categoria_id,
      foto,
    });

    return response.json(produtoEditado);
  },
);

routerProdutos.post(
  '/Excluir',
  Multer.single('foto'),
  async (request, response) => {
    const { id } = request.body;
    const excluir = new ExcluirProduto();

    const produtoExcluido = await excluir.execute({
      id,
    });

    return response.json(produtoExcluido);
  },
);

export default routerProdutos;
