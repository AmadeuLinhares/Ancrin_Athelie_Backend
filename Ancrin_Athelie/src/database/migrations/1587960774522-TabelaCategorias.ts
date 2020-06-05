import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class TabelaCategorias1587960774522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categorias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categorias');
  }
}
