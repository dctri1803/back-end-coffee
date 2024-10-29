import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVouchers1730132513913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vouchers',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        length: "50",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'discount_percent',
                        type: 'decimal',
                        precision: 5,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'discount_amount',
                        type: 'decimal',
                        precision: 12,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'min_order_value',
                        type: 'decimal',
                        precision: 12,
                        scale: 2, 
                        default: 0
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp',
                        isNullable: false,
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vouchers');
    }

}
