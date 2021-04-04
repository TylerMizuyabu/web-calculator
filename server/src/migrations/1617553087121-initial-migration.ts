import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1617553087121 implements MigrationInterface {
  name = 'initialMigration1617553087121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `CREATE TABLE "calculations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "equation" text NOT NULL, "result" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a57a12855a44935db91c2533b71" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "calculations"`);
  }
}
