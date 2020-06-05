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

import Categorias from './categorias';

@Entity('produtos')
class Produtos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoria_id: string;

  @ManyToOne(() => Categorias)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categorias;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @Column()
  foto: string;

  @Column()
  disponibilidade: boolean;

  @Column()
  subtitulo: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default Produtos;
