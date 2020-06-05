import { Router, request, response } from 'express';
import multer from 'multer';
import Depoimentos from '../services/DepoimentoServices/CriarDepoimento';
import validarToken from '../middlewares/validarAutenticacao';
import ListarDepoimentos from '../services/DepoimentoServices/ListarDepoimentos';
import EditarDepoimentos from '../services/DepoimentoServices/EditarDepoimento';
import ExcluirDepoimentos from '../services/DepoimentoServices/ExcluirDepoimento';

const Multer = multer();
const depoimentosRouters = Router();

depoimentosRouters.post(
  '/Criar',
  validarToken,
  Multer.any(),
  async (request, response) => {
    const { texto } = request.body;

    const user_id = request.usuario_logado.id;

    const depoimentos = new Depoimentos();

    const depoimentoCriado = await depoimentos.execute({
      texto,
      user_id,
    });

    return response.json(depoimentoCriado);
  },
);

depoimentosRouters.get('/Listar', async (request, response) => {
  const listar = new ListarDepoimentos();
  const depoimentos = await listar.execute();

  return response.json(depoimentos);
});

depoimentosRouters.post(
  '/Editar',
  validarToken,
  Multer.any(),
  async (request, response) => {
    const { texto } = request.body;
    const { id } = request.usuario_logado;
    const editarDepoimento = new EditarDepoimentos();

    const depoimentoEditado = await editarDepoimento.execute({
      texto,
      user_id: id,
    });

    return response.json(depoimentoEditado);
  },
);

depoimentosRouters.get('/Excluir', validarToken, async (request, response) => {
  const excluir = new ExcluirDepoimentos();
  const { id } = request.usuario_logado;
  const depoimentoExcluido = await excluir.execute({ id });

  return response.json(depoimentoExcluido);
});

export default depoimentosRouters;
