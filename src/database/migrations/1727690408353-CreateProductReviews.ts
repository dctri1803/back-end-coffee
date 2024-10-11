import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductReviews1727690408353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product_reviews',
                columns: [
                    {
                      name: 'id',
                      type: 'integer',
                      isPrimary: true,
                      isGenerated: true,
                      isUnique: true,
                      generationStrategy: 'increment'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                      },
                      {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                      },
                      {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'parent_review_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'rating',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'comment',
                        type: 'text',
                        isNullable: true,
                    },
                ]
            })
        );
        await queryRunner.createForeignKey(
            'product_reviews',
            new TableForeignKey({
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'product_reviews',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'product_reviews',
            new TableForeignKey({
                columnNames: ['parent_review_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product_reviews',
                onDelete: 'CASCADE',
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('Revert run here');
        const table = await queryRunner.getTable('product_reviews');

        const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        await queryRunner.dropForeignKey('product_reviews', foreignKeyUser);

        const foreignKeyProduct = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        await queryRunner.dropForeignKey('product_reviews', foreignKeyProduct);

        const foreignKeyParentReview = table.foreignKeys.find(fk => fk.columnNames.indexOf('parent_review_id') !== -1);
        await queryRunner.dropForeignKey('product_reviews', foreignKeyParentReview);
        await queryRunner.dropTable('product_reviews');
    }

}
