import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Usuarios from './usuarios';

@Entity('carrinho')
class Carrinhos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuarios;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Carrinhos;
