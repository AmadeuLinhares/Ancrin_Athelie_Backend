import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { query } from 'express';

export default class CampoRelacionamentoUsuarioPedidos1588103973021
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('pedidos', [
      new TableColumn({
        name: 'usuario_id',
        type: 'uuid',
        isNullable: false,
      }),
    ]);

    await queryRunner.createForeignKey(
      'pedidos',
      new TableForeignKey({
        name: 'FK_pedidoId_TableUsuarioId',
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pedidos', 'FK_pedidoId_TableUsuarioId');
    await queryRunner.dropColumn('pedidos', 'usuario_id');
  }
}
