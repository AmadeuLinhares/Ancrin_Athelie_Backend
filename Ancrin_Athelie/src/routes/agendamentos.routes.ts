import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import RepositorioAgendamentos from '../repositories/agendamentosRepositorio';
import CriarAgendamentoServices from '../services/CriarAgendamentoServices';
import ValidarLogin from '../middlewares/validarAutenticacao';

const agendamentosRoutes = Router();

agendamentosRoutes.use(ValidarLogin);

agendamentosRoutes.get('/Listar', async (request, response) => {
  console.log(request.usuario_logado);
  const agendamentosRepositorio = getCustomRepository(RepositorioAgendamentos);

  const listaAgendamentos = await agendamentosRepositorio.find();

  return response.json(listaAgendamentos);
});

agendamentosRoutes.post('/Criar', async (request, response) => {
  const { profissional, date } = request.body;
  const parsedData = parseISO(date);

  const serviceRepositorio = new CriarAgendamentoServices();

  const agendamentos = await serviceRepositorio.execute({
    profissional,
    date: parsedData,
  });

  return response.json(agendamentos);
});

export default agendamentosRoutes;
