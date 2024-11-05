import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBlogComments1730823734356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "blog_comments",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "blog_post_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "comment",
                    type: "text",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }));

        await queryRunner.createForeignKey("blog_comments", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("blog_comments", new TableForeignKey({
            columnNames: ["blog_post_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "blog_posts",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("blog_comments");
    }

}
