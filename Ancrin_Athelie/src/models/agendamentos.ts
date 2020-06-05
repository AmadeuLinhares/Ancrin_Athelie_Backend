import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('agendamentos') // Diz esta classe tem que ser salva na tabela Agendamentos
class Agendamento {
  @PrimaryGeneratedColumn('uuid') // EXPECIFICA QUAL O TIPO DE COLUNA DO ITEM A SER SALVA
  id: string;

  @Column()
  profissional: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Agendamento;
