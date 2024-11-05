import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderItemTopping1730394817804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_item_toppings',
                columns: [
                    { name: 'order_item_id', type: 'integer', isPrimary: true },
                    { name: 'topping_id', type: 'integer', isPrimary: true },
                ],
            })
        );

        await queryRunner.createForeignKeys('order_item_toppings', [
            new TableForeignKey({
                columnNames: ['order_item_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order_items',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['topping_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'toppings',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_item_toppings');
    }

}
