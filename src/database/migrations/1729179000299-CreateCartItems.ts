import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCartItems1729179000299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cart_items',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'cart_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                    },
                    { 
                        name: "size_id", 
                        type: "int" ,
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: "total_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0.00
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        );
       
        await queryRunner.createForeignKeys('cart_items', [
            new TableForeignKey({
                columnNames: ['cart_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'carts',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ["size_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_sizes",
                onDelete: "SET NULL",
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart_items");
    }

}
