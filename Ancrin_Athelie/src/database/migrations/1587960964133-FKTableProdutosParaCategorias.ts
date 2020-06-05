import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKTableProdutosParaCategorias1587960964133
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'produtos',
      new TableForeignKey({
        name: 'FK_categoriaId_TableCategoria',
        columnNames: ['categoria_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categorias',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'produtos',
      'FK_categoriaId_TableCategoria',
    );
  }
}
