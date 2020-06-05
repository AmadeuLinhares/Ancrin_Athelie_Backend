import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CarrinhoProduto1588031327001
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produtocarrinho',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'produto_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'carrinho_id',
            type: 'uuid',
            isNullable: false,
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
        ],
      }),
    );

    await queryRunner.createForeignKeys('produtocarrinho', [
      new TableForeignKey({
        name: 'FK_produtoId_Tableprodutocarrinho',
        columnNames: ['produto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produtos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_carrinhoId_Tableprodutocarrinho',
        columnNames: ['carrinho_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carrinho',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'produtocarrinho',
      'FK_produtoId_Tableprodutocarrinho',
    );
    await queryRunner.dropForeignKey(
      'produtocarrinho',
      'FK_carrinhoId_Tableprodutocarrinho',
    );

    await queryRunner.dropTable('produtocarrinho');
  }
}
