import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AtualizarTabelaUsuarios1587696431664
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'usuarios',
      new TableColumn({
        name: 'depoimento_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'usuarios',
      new TableColumn({
        name: 'endereco_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'usuarios',
      new TableColumn({
        name: 'foto',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuarios', 'depoimento_id');
    await queryRunner.dropColumn('usuarios', 'endereco_id');
    await queryRunner.dropColumn('usuarios', 'foto');
  }
}
