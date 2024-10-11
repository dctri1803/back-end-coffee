import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePaymentMethods1728489100261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment_methods",
                columns: [
                    { name: "payment_method_id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "user_id", type: "int", isNullable: false },
                    { name: "method_type", type: "enum", enum: ["credit_card", "e_wallet", "cash_on_delivery"], isNullable: false },
                    { name: "provider_name", type: "varchar", length: "100", isNullable: true },
                    { name: "account_number", type: "varchar", length: "100", isNullable: true },
                    { name: "expiried_date", type: "date", isNullable: true },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                ]
            })
        );

        await queryRunner.createForeignKey("payment_methods", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_methods");
    }

}
