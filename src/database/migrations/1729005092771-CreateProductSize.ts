import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductSize1729005092771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'product_sizes',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'size',
                  type: 'enum',
                  enum: ['M', 'L', 'XL'],
                  default: "'M'",
                },
                {
                  name: 'price_adjustment',
                  type: 'decimal',
                  precision: 10,
                  scale: 2,
                  default: 0,
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
              ],
            }),
          );  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_sizes');
    }

}
