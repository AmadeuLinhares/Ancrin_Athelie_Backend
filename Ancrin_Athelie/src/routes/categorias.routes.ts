import { Router, request, response } from 'express';
import multer from 'multer';
import CriarCategoria from '../services/CategoriaServices/CriarCategoriaService';
import ListarCategoria from '../services/CategoriaServices/ListarCategoriaService';
import EditarCategoria from '../services/CategoriaServices/EditarCategoriaService';
import ExcluirCategoria from '../services/CategoriaServices/DeletarCategoriaService';

const Multer = multer();

const routerCategoria = Router();

routerCategoria.post('/Criar', Multer.any(), async (request, response) => {
  const { nome, descricao } = request.body;
  const categoria = new CriarCategoria();

  const categoriaCriada = await categoria.execute({
    nome,
    descricao,
  });

  return response.json(categoriaCriada);
});

routerCategoria.get('/Listar', async (request, response) => {
  const categoria = new ListarCategoria();

  const categoriaCriada = await categoria.execute();

  return response.json(categoriaCriada);
});

routerCategoria.post('/Editar', Multer.any(), async (request, response) => {
  const { nome, descricao, id } = request.body;

  const categoria = new EditarCategoria();

  const categoriaCriada = await categoria.execute({
    nome,
    descricao,
    id,
  });

  return response.json(categoriaCriada);
});

routerCategoria.post('/Excluir', Multer.any(), async (request, response) => {
  const { id } = request.body;

  const categoria = new ExcluirCategoria();

  const categoriaCriada = await categoria.execute({
    id,
  });

  return response.json(categoriaCriada);
});

export default routerCategoria;
