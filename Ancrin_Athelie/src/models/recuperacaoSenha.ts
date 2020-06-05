import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';

import Usuario from './usuarios';

@Entity('token')
class Depoimentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  usuario_id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Depoimentos;
