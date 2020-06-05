import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class TableCarrinho1588016099978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carrinho',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'usuario_id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
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

    await queryRunner.createForeignKey(
      'carrinho',
      new TableForeignKey({
        name: 'FK_usuarioId_TableCaarinho',
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carrinho');
  }
}
