import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveJoinDate1683712675515 implements MigrationInterface {
  name = 'RemoveJoinDate1683712675515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "joined_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "joined_at"`);
  }
}
