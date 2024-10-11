import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrders1728489964691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "user_id", type: "int", isNullable: true },
                    { name: "payment_method_id", type: "int", isNullable: true },
                    { name: "managed_by", type: "int", isNullable: true },
                    { name: "buyer_name", type: "varchar", length: "255", isNullable: true },
                    { name: "buyer_phone", type: "varchar", length: "20", isNullable: true },
                    { name: "buyer_email", type: "varchar", length: "100", isNullable: true },
                    { name: "franchise_id", type: "int", isNullable: true },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" },
                    { name: "status", type: "enum", enum: ["pending", "completed", "cancelled"], default: "'pending'" }
                ]
            })
        );

        await queryRunner.createForeignKeys("orders", [
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
            }),
            new TableForeignKey({
                columnNames: ["payment_method_id"],
                referencedColumnNames: ["payment_method_id"],
                referencedTableName: "payment_methods",
                onDelete: "SET NULL",
            }),
            new TableForeignKey({
                columnNames: ["managed_by"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
            }),
            new TableForeignKey({
                columnNames: ["franchise_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "franchises",
                onDelete: "SET NULL",
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}
