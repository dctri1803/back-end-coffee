import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProducts1727625100791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal(10,2)'
                    },
                    {
                        name: 'quantity_sold',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'franchise_id',
                        type: 'integer'
                    },
                    {
                        name: 'description',
                        type: 'text'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['franchise_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'franchises',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('products');

        const foreignKeyFranchise = table.foreignKeys.find(fk => fk.columnNames.indexOf('franchise_id') !== -1);
        await queryRunner.dropForeignKey('products', foreignKeyFranchise);
        await queryRunner.dropTable('products')
    }

}
