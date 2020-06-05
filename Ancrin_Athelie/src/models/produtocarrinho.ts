import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import Produtos from './produtos';
import Carrinhos from './carrinhos';

@Entity('produtocarrinho')
class ProtudoCarrinho {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  produto_id: string;

  @Column()
  carrinho_id: string;

  @ManyToMany(() => Produtos)
  @JoinColumn({ name: 'produto_id' })
  produtos: Produtos;

  @ManyToMany(() => Carrinhos)
  @JoinColumn({ name: 'carrinho_id' })
  carrinhos: Carrinhos;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default ProtudoCarrinho;
