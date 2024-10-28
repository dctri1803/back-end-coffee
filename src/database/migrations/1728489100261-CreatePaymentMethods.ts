import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePaymentMethods1728489100261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment_methods",
                columns: [
                    { 
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment" },
                    { 
                        name: "name",
                        type: "varchar",
                        isNullable: false 
                    },
                    { 
                        name: "description",
                        type: "varchar",
                        length: "100", 
                    },
                    { 
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP" 
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
