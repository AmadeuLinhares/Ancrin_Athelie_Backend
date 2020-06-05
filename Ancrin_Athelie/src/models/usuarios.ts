import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Depoimentos from './depoimentos';
import Enderecos from './enderecos';

@Entity('usuarios')
class Usuarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  senha: string;

  @Column()
  foto: string;

  @Column()
  depoimento_id: string;

  @Column()
  endereco_id: string;

  @OneToOne(() => Depoimentos)
  @JoinColumn({ name: 'depoimento_id' })
  depoimentos: Depoimentos;

  @OneToOne(() => Enderecos)
  @JoinColumn({ name: 'endereco_id' })
  enderecos: Enderecos;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Usuarios;
