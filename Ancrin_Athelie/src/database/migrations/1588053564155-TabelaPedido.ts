import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class TabelaPedido1588053564155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedidos',
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
            name: 'forma_pagamento',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tipo_entrega',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'data_entrega',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'codigo_rastreio',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pedidos');
  }
}
