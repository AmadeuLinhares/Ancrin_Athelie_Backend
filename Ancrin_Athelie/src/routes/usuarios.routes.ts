import { Router, request, response } from 'express';
import multer from 'multer';
import CriarUsuario from '../services/UsuarioServices/CriarUsuarioServices';
import ListarUsuarios from '../services/UsuarioServices/ListarUsuarios';
import AutenticacaoToken from '../middlewares/validarAutenticacao';
import UploadConfig from '../config/upload';
import EditarUsuario from '../services/UsuarioServices/EditarUsuario';
import DeleteUsuarios from '../services/UsuarioServices/DeleteUsuarios';

const usuariosRoutes = Router();

const Multer = multer(UploadConfig);

usuariosRoutes.post(
  '/Criar',
  Multer.single('foto'),
  async (request, response) => {
    // const foto = request.file.filename;
    const { nome, email, cpf, senha } = request.body;

    const criarUsuario = new CriarUsuario();

    const usuario = await criarUsuario.execute({
      nome,
      email,
      cpf,
      senha,
      // foto: foto || 'null',
    });

    delete usuario.senha;

    return response.json(usuario);
  },
);

usuariosRoutes.get('/Listar', async (request, response) => {
  const listaUsuarios = new ListarUsuarios();

  const usuariosListados = await listaUsuarios.execute();

  return response.json(usuariosListados);
});

usuariosRoutes.post(
  '/Editar',
  AutenticacaoToken,
  Multer.single('foto'),
  async (request, response) => {
    const foto = request.file.filename;
    const { nome, email, cpf } = request.body;
    const edicaoUsuarios = new EditarUsuario();
    const user_id = request.usuario_logado.id;
    const usuarioEditado = await edicaoUsuarios.execute({
      nome,
      email,
      foto,
      cpf,
      user_id,
    });

    return response.json(usuarioEditado);
  },
);

usuariosRoutes.post(
  '/Excluir',
  AutenticacaoToken,
  Multer.any(),
  async (request, response) => {
    const deleteServices = new DeleteUsuarios();
    const { id } = request.usuario_logado;
    const usuarioDeletado = await deleteServices.execute({
      id,
    });

    delete usuarioDeletado.dadosUser.senha;

    return response.json(usuarioDeletado);
  },
);

export default usuariosRoutes;
