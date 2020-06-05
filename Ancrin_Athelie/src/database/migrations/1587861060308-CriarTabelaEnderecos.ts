import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriarTabelaEnderecos1587861060308
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ======= CRIACAO DA TABLE

    await queryRunner.createTable(
      new Table({
        name: 'enderecos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'usuario_id',
            type: 'uuid',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'logradouro',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'complemento',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'localidade',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    // ===== foren key ======
    await queryRunner.createForeignKey(
      'enderecos',
      new TableForeignKey({
        name: 'FK_UsuarioID_TableEnderecos',
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
      'enderecos',
      'FK_UsuarioID_TableEnderecos',
    );

    await queryRunner.dropTable('enderecos');
  }
}
