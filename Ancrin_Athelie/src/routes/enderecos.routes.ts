import { Router, request, response } from 'express';
import multer from 'multer';
import EnderecosCriar from '../services/EnderecoServices/CriarEndereco';
import MiddlewareSession from '../middlewares/validarAutenticacao';
import ListarEnderecos from '../services/EnderecoServices/ListarEnderecos';
import ExcluirEnderecos from '../services/EnderecoServices/ExcluirEndereco';
import EditarEndereco from '../services/EnderecoServices/EditarEndereco';
import UploadConfig from '../config/upload';

const Multer = multer(UploadConfig);
const enderecoRouter = Router();

enderecoRouter.use(MiddlewareSession);

enderecoRouter.post('/Criar', Multer.any(), async (request, response) => {
  const user_id = request.usuario_logado.id;
  const {
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numero,
  } = request.body;

  const enderecoServices = new EnderecosCriar();
  const enderecoCriado = await enderecoServices.execute({
    user_id,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numero,
  });

  return response.json(enderecoCriado);
});

enderecoRouter.get('/Listar', async (request, response) => {
  const enderecoService = new ListarEnderecos();
  const enderecos = await enderecoService.execute();
  return response.json(enderecos);
});

enderecoRouter.post('/Excluir', Multer.any(), async (request, response) => {
  const { id } = request.usuario_logado;

  const excluirEndereco = new ExcluirEnderecos();

  const enderecoExcluido = await excluirEndereco.execute({ id });
  return response.json(enderecoExcluido);
});

enderecoRouter.post('/Editar', Multer.any(), async (request, response) => {
  const { id } = request.usuario_logado;
  const {
    cep,
    numero,
    complemento,
    bairro,
    uf,
    logradouro,
    localidade,
  } = request.body;
  const editarEndereco = new EditarEndereco();

  const enderecoEditado = await editarEndereco.execute({
    user_id: id,
    cep,
    numero,
    complemento,
    bairro,
    uf,
    logradouro,
    localidade,
  });
  return response.json(enderecoEditado);
});

export default enderecoRouter;
