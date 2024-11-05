import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrder1730218273849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'orders',
        columns: [
            { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'user_id', type: 'int' },
            { name: 'franchise_id', type: 'int' },
            { name: 'payment_method_id', type: 'int' },
            { name: 'total_price', type: 'decimal', precision: 10, scale: 2, default: '0' },
            { name: 'address', type: 'varchar' },
            { name: 'phone_number', type: 'varchar' },
            { name: 'customer_name', type: 'varchar' },
            { name: 'status', type: 'enum', enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'], default: "'pending'" },
        ],
    }), true);

    await queryRunner.createForeignKeys('orders', [
        new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }),
        new TableForeignKey({
            columnNames: ['franchise_id'],
            referencedTableName: 'franchises',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }),
        new TableForeignKey({
            columnNames: ['payment_method_id'],
            referencedTableName: 'payment_methods',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
