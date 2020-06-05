import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Usuarios from './usuarios';

@Entity('enderecos')
class Enderecos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @OneToOne(() => Usuarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuarios;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;

  @Column()
  numero: number;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Enderecos;
