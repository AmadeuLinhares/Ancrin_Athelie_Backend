import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export default class CriarTabelaDepoimentos1587860646556
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ======= CRIACAO TABLE ==========

    await queryRunner.createTable(
      new Table({
        name: 'depoimentos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'texto',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'usuario_id',
            isUnique: true,
            isNullable: false,
            type: 'uuid',
          },
        ],
      }),
    );

    // ======== forenkey ==========

    await queryRunner.createForeignKey(
      'depoimentos',
      new TableForeignKey({
        name: 'FK_UsuarioID_TableDepoimentos',
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'CASCADE', // O que vai acontecer com os depoiemntos caso esse usuario seja deletado..... Ele será deletaod tambem
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'depoimentos',
      'FK_UsuarioID_TableDepoimentos',
    );

    await queryRunner.dropTable('depoimentos');
  }
}
