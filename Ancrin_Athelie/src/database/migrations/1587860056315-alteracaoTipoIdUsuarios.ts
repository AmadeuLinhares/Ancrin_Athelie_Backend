import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class alteracaoTipoIdUsuarios1587860056315
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuarios', 'id');

    await queryRunner.addColumns('usuarios', [
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
        generationStrategy: 'uuid',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuarios', 'id');

    await queryRunner.addColumns('usuarios', [
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        default: 'uuid_generate_v4()',
        generationStrategy: 'uuid',
      }),
    ]);
  }
}
