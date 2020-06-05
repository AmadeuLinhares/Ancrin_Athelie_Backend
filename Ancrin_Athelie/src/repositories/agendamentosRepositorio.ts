import { EntityRepository, Repository } from 'typeorm';
import Agendamento from '../models/agendamentos';

// DTO = DATE TRANFERS OBJECTS
@EntityRepository(Agendamento)
class AgendamentosRepositorio extends Repository<Agendamento> {
  public async verificarDataEscolhida(date: Date): Promise<Agendamento | null> {
    const verificaAgendamento = await this.findOne({
      where: {
        date,
      },
    });

    return verificaAgendamento || null;
  }
}

export default AgendamentosRepositorio;
