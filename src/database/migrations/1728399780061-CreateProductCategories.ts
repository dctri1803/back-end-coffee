import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductCategories1728399780061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'product_categories',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'category_id',
                  type: 'int',
                },
                {
                  name: 'product_id',
                  type: 'int',
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
      
          // Foreign key for category_id
          await queryRunner.createForeignKey(
            'product_categories',
            new TableForeignKey({
              columnNames: ['category_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'categories',
              onDelete: 'CASCADE',
            }),
          );
      
          // Foreign key for product_id
          await queryRunner.createForeignKey(
            'product_categories',
            new TableForeignKey({
              columnNames: ['product_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'products',
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_categories');
    }

}
