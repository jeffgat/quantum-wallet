export default class Initialize1647811858796 {
  name = 'Initialize1647811858796';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "user_model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "btcAddress" character varying, "btcWalletName" character varying, CONSTRAINT "UQ_864bd044bba869304084843358e" UNIQUE ("email"), CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "user_model"`);
  }
}
