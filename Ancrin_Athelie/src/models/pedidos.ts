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

// id	data_criacao	data_atualizacao	forma_pagamento	tipo_entrega	data_entrega	codigo_rastreio
@Entity('pedidos')
class Pedidos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'usuario_id' })
  usuarios: Usuarios;

  @Column()
  forma_pagamento: number;

  @Column()
  tipo_entrega: number;

  @Column()
  data_entrega: Date;

  @Column()
  codigo_rastreio: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Pedidos;
