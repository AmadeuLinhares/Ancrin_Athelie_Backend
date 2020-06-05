import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class TableRelacionamentoPedidoProduto1588054473160
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedidosprodutos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'data_criacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'data_atualizacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'produto_id',
            type: 'uuid',
          },
          {
            name: 'pedido_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('pedidosprodutos', [
      new TableForeignKey({
        name: 'FK_produtoId_TablepedidosProdutos',
        columnNames: ['produto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produtos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_pedidoId_TablepedidosProdutos',
        columnNames: ['pedido_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pedidos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'pedidosprodutos',
      'FK_produtoId_TablepedidosProdutos',
    );
    await queryRunner.dropForeignKey(
      'pedidosprodutos',
      'FK_pedidoId_TablepedidosProdutos',
    );
    await queryRunner.dropTable('pedidosprodutos');
  }
}
