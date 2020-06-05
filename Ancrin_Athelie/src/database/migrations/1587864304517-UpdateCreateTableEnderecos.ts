import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateCreateTableEnderecos1587864304517
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('enderecos', [
      new TableColumn({
        name: 'data_criacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
      new TableColumn({
        name: 'data_atualizacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('enderecos', [
      new TableColumn({
        name: 'data_criacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
      new TableColumn({
        name: 'data_atualizacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    ]);
  }
}
