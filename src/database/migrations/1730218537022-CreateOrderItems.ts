import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderItems1730218537022 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'order_id', type: 'int' },
                { name: 'product_id', type: 'int' },
                { name: 'size_id', type: 'int' },
                { name: 'quantity', type: 'int' },
                { name: 'total_price', type: 'decimal', precision: 10, scale: 2, default: '0' },
            ],
        }), true);

        await queryRunner.createForeignKeys('order_items', [
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['size_id'],
                referencedTableName: 'product_sizes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_items');
    }
}
