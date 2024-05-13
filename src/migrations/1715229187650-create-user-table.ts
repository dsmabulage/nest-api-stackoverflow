import {
    Table,
    QueryRunner,
    MigrationInterface,
    TableForeignKey
} from 'typeorm';

export class $createUserTable1715229187650 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase(process.env.POSTGRES_DB, true);

        await queryRunner.createTable(
            new Table({
                name: 'Users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'firstName',
                        type: 'varchar'
                    },
                    {
                        name: 'lastName',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'roleId',
                        type: 'uuid'
                    },
                    {
                        name: 'createdById',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['roleId'],
                        referencedTableName: 'Roles',
                        referencedColumnNames: ['id']
                    }),
                    new TableForeignKey({
                        columnNames: ['createdById'],
                        referencedTableName: 'Users',
                        referencedColumnNames: ['id']
                    })
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Users');
    }
}
