import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
// id	data_criacao	data_atualizacao	produto_id	pedido_id
import Produtos from './produtos';
import Pedidos from './pedidos';

@Entity('pedidosprodutos')
class PedidoProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  produto_id: string;

  @Column()
  pedido_id: string;

  @ManyToMany(() => Pedidos)
  @JoinColumn({ name: 'pedido_id' })
  pedidos: Pedidos;

  @ManyToMany(() => Produtos)
  @JoinColumn({ name: 'produto_id' })
  produtos: Produtos;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}

export default PedidoProduto;
