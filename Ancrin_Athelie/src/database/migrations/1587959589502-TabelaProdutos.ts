import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { query } from 'express';

export default class TabelaProdutos1587959589502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produtos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
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
            isNullable: false,
          },
          {
            name: 'preco',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'foto',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'disponibilidade',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'subtitulo',
            type: 'varchar',
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
    await queryRunner.dropTable('produtos');
  }
}
