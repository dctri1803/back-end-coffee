import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1726742198876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                      name: 'role',
                      type: 'enum',
                      enum: ['customer', 'employee', 'admin', 'franchise_owner'],
                      default: `'customer'`,
                    },
                    {
                      name: 'password',
                      type: 'varchar',
                    },
                    {
                      name: 'name',
                      type: 'varchar',
                      isNullable: true,
                    },
                    {
                      name: 'favorite_theme',
                      type: 'varchar',
                      isNullable: true,
                    },
                    {
                      name: 'avatar_url',
                      type: 'varchar',
                      isNullable: true,
                    },
                    {
                      name: 'phone_number',
                      type: 'varchar',
                      isNullable: true,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('Revert run here');
        await queryRunner.dropTable('users');
    }

}
