import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePasswordResetToken1726830971124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'password_reset_tokens',
                columns: [
                        {
                            name: 'id',
                            type: 'integer',
                            isPrimary: true,
                            isGenerated: true,
                            isUnique: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'now()'
                        },
                        {
                            name: 'token',
                            type: 'varchar'
                        },
                        {
                            name: 'expired_at',
                            type: 'datetime'
                        },
                        {
                            name: 'user_id',
                            type: 'integer',
                        },
                ]
            })
        );
        await queryRunner.createForeignKey(
            'password_reset_tokens',
            new TableForeignKey({
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('password_reset_tokens');

        const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        await queryRunner.dropForeignKey('password_reset_tokens', foreignKeyUser);
        await queryRunner.dropTable('password_reset_tokens')
    }

}
