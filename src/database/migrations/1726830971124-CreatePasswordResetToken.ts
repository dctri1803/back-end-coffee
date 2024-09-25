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
                            name: 'createdAt',
                            type: 'timestamp',
                            default: 'now()'
                        },
                        {
                            name: 'token',
                            type: 'varchar'
                        },
                        {
                            name: 'expiredAt',
                            type: 'datetime'
                        },
                        {
                            name: 'userId',
                            type: 'integer',
                        },
                ]
            })
        );
        await queryRunner.createForeignKey(
            'password_reset_tokens',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_reset_tokens')
    }

}
