import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { query } from 'express';

export default class CriarAgendamentos1587604377096
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agendamentos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'profissional',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'date',
            isNullable: false,
            type: 'timestamp with time zone',
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
    await queryRunner.dropTable('agendamentos');
  }
}
