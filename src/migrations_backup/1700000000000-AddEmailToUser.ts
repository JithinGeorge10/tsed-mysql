import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailToUser1700000000000 implements MigrationInterface {
    name = 'AddEmailToUser1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }
} 