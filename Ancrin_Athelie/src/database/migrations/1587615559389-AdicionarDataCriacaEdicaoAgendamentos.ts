import { MigrationInterface, QueryRunner, Column, TableColumn } from 'typeorm';

export default class AdicionarDataCriacaEdicaoAgendamentos1587615559389
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'data_criacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'data_atualizacao',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendamentos', 'data_criacao');
    await queryRunner.dropColumn('agendamentos', 'data_atualizacao');
  }
}
