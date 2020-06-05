import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { query } from 'express';

export default class MudarTipoCepTableEnderecos1587879540432
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'enderecos',
      'cep',
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: false,
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'enderecos',
      'cep',
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }),
    );
  }
}
