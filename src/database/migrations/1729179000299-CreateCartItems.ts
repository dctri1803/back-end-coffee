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
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'size',
                        type: 'enum',
                        enum: ['M', 'L', 'XL'],
                        default: "'M'",
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
        await queryRunner.createForeignKey(
            'cart_items',
            new TableForeignKey({
              columnNames: ['cart_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'carts',
              onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'cart_items',
            new TableForeignKey({
              columnNames: ['product_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'products',
              onDelete: 'CASCADE',
            }),
        );     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
