import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCart1729093401317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'carts',
                columns: [
                    {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                    },
                    {
                      name: 'user_id',
                      type: 'int',
                      isNullable: false,
                    },
                    {
                        name: "total_price", 
                        type: "decimal", 
                        precision: 10, 
                        scale: 2 
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
          'carts',
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          }),
        );    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('carts');
    }

}
