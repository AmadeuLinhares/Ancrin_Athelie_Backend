import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from './usuarios';

@Entity('depoimentos')
class Depoimentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  texto: string;

  @Column()
  usuario_id: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Depoimentos;
