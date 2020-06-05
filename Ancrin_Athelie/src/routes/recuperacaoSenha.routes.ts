import { Router, request, response } from 'express';
import multer from 'multer';
import CriarToken from '../services/RecuperarSenhaServices/CriarToken';
import MudarSenha from '../services/RecuperarSenhaServices/CadastrarNovaSenha';
import UploadConfig from '../config/upload';

const recuperacaoSenha = Router();

const Multer = multer(UploadConfig);

recuperacaoSenha.post(
  '/GerarToken',
  Multer.any(),
  async (request, response) => {
    const { email } = request.body;

    const criacaoToken = new CriarToken();

    const token = await criacaoToken.execute({
      email,
    });

    return response.json(token);
  },
);

recuperacaoSenha.post('/NovaSenha', Multer.any(), async (request, response) => {
  const { token, nova_senha } = request.body;

  const novaSenha = new MudarSenha();

  const senha = await novaSenha.execute({
    nova_senha,
    token,
  });

  return response.json(senha);
});

export default recuperacaoSenha;
