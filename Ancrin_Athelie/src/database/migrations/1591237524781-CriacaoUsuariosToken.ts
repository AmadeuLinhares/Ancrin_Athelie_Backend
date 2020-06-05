import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriacaoUsuariosToken1591237524781
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isUnique: true,
          },
          {
            name: 'usuario_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'FK_usuarioId_TableToken',
            columnNames: ['usuario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuarios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token');
  }
}
