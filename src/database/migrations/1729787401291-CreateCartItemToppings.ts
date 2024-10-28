import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCartItemToppings1729787401291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cart_item_toppings',
                columns: [
                    {
                        name: 'cart_item_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'topping_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            })
        );
        await queryRunner.createForeignKeys('cart_item_toppings', [
            new TableForeignKey({
              columnNames: ['cart_item_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'cart_items',
              onDelete: 'CASCADE',
            }),
            new TableForeignKey({
              columnNames: ['topping_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'toppings',
              onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart_item_toppings')
    }

}
