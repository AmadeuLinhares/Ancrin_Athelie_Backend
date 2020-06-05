import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Column,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class EditarTabelaUsuarios1587861141855
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'usuarios',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
        generationStrategy: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'usuarios',
      'depoimento_id',
      new TableColumn({
        name: 'depoimento_id',
        type: 'uuid',
        isUnique: true,
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'usuarios',
      'endereco_id',
      new TableColumn({
        name: 'endereco_id',
        type: 'uuid',
        isUnique: true,
        isNullable: true,
      }),
    );

    // CRIANDO AS FOREY KEYS

    await queryRunner.createForeignKeys('usuarios', [
      new TableForeignKey({
        name: 'FK_DepoimentoID_TableUsuarios',
        columnNames: ['depoimento_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'depoimentos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_EnderecoID_TableUsuarios',
        columnNames: ['endereco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enderecos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'usuarios',
      'FK_DepoimentoID_TableUsuarios',
    );
    await queryRunner.dropForeignKey('usuarios', 'FK_EnderecoID_TableUsuarios');

    await queryRunner.changeColumn(
      'usuarios',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
        generationStrategy: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'usuarios',
      'depoimento_id',
      new TableColumn({
        name: 'depoimento_id',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'usuarios',
      'endereco_id',
      new TableColumn({
        name: 'endereco_id',
        type: 'varchar',
      }),
    );
  }
}
