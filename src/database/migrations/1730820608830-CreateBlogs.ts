import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBlogs1730820608830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Blog Posts Table
        await queryRunner.createTable(new Table({
            name: "blog_posts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "content",
                    type: "text",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
            ],
        }));

        // Create Blog Images Table
        await queryRunner.createTable(new Table({
            name: "blog_images",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "url",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "blog_post_id",
                    type: "int",
                },
            ],
        }));

        // Foreign Key for blog_post_id in Blog Images Table
        await queryRunner.createForeignKey("blog_images", new TableForeignKey({
            columnNames: ["blog_post_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "blog_posts",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("blog_images");
        await queryRunner.dropTable("blog_posts");
    }
}
