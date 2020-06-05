import { Router, request, response } from 'express';
import multer from 'multer';

import AutenticarSessao from '../services/AutenticarSessaoUsuario';

const Multer = multer();
const sessaoRoutes = Router();

sessaoRoutes.post('/', Multer.any(), async (request, response) => {
  const { login, senha } = request.body;

  const autenticarUsuario = new AutenticarSessao();

  const { user, token } = await autenticarUsuario.execute({
    login,
    senha,
  });

  delete user.senha;

  response.json({ user, token });
});

export default sessaoRoutes;
