import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateCreateTableDepoimentos1587862004582
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('depoimentos', [
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
    await queryRunner.dropColumns('depoimentos', [
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
