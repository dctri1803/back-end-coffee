import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrdersItems1728490040824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_items",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "order_id", type: "int", isNullable: false },
                    { name: "product_id", type: "int", isNullable: false },
                    { name: "size", type: "enum", enum: ["S", "M", "L"], isNullable: false },
                    { name: "quantity", type: "int", isNullable: false },
                    { name: "price", type: "decimal", precision: 10, scale: 2, isNullable: false },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" },
                    { name: "status", type: "enum", enum: ["pending", "completed", "cancelled"], default: "'pending'" }
                ]
            })
        );

        await queryRunner.createForeignKeys("order_items", [
            new TableForeignKey({
                columnNames: ["order_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "orders",
                onDelete: "CASCADE",
            }),
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "CASCADE",
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_items");
    }

}
