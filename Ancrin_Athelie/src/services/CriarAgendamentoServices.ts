import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../models/agendamentos';
import RepositorioAgendamentos from '../repositories/agendamentosRepositorio';
import AppError from '../errors/AppError';

interface RequestDTO {
  profissional: string;
  date: Date;
}

class CriarAgendamentoServices {
  public async execute({
    profissional,
    date,
  }: RequestDTO): Promise<Agendamento> {
    const agendamentoDateFormatted = startOfHour(date);

    const repositorioAgendamentos = getCustomRepository(
      RepositorioAgendamentos,
    );

    const verificarAgendamentoMesmaData = await repositorioAgendamentos.verificarDataEscolhida(
      agendamentoDateFormatted,
    );

    if (verificarAgendamentoMesmaData) {
      throw new AppError('Hora escolhida não está disponível', 401);
    }

    const agendamentos = repositorioAgendamentos.create({
      profissional,
      date: agendamentoDateFormatted,
    });

    await repositorioAgendamentos.save(agendamentos);

    return agendamentos;
  }
}

export default CriarAgendamentoServices;
