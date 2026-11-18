import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1795010433695 implements MigrationInterface {
    name = 'InitialSchema1795010433695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, CONSTRAINT "UQ_0a9942514087463668e9638bf90" UNIQUE ("nome"), CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exemplar_estado_enum" AS ENUM('BOM', 'DESGASTADO', 'DESCARTADO')`);
        await queryRunner.query(`CREATE TABLE "exemplar" ("id" SERIAL NOT NULL, "estado" "public"."exemplar_estado_enum" NOT NULL DEFAULT 'BOM', "obraId" integer NOT NULL, CONSTRAINT "PK_99bb0536a8ba1ef4569d9fa077e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "obra" ("id" SERIAL NOT NULL, "titulo" character varying(200) NOT NULL, "anoPublicacao" integer NOT NULL, "isbn" character varying(20), "autorId" integer NOT NULL, CONSTRAINT "UQ_825ff861a4d720c3dce9c2aa544" UNIQUE ("isbn"), CONSTRAINT "PK_9c88016c59e756dce6b3143c767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "autor" ("id" SERIAL NOT NULL, "nome" character varying(150) NOT NULL, "nacionalidade" character varying(100), CONSTRAINT "PK_51d3959df48c82010ae1c4907fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "obra_categoria" ("obraId" integer NOT NULL, "categoriaId" integer NOT NULL, CONSTRAINT "PK_9fd0a5c81d237ac86d52ba04278" PRIMARY KEY ("obraId", "categoriaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b351e0d325bff14c7669fbce87" ON "obra_categoria"  ("obraId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b727e68cd375f5c721d60a024c" ON "obra_categoria"  ("categoriaId") `);
        await queryRunner.query(`ALTER TABLE "exemplar" ADD CONSTRAINT "FK_64e30441e620b0caadc2f3954ae" FOREIGN KEY ("obraId") REFERENCES "obra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "obra" ADD CONSTRAINT "FK_1fa7f93a22a39f6fc2b0228ec4c" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "obra_categoria" ADD CONSTRAINT "FK_b351e0d325bff14c7669fbce877" FOREIGN KEY ("obraId") REFERENCES "obra"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "obra_categoria" ADD CONSTRAINT "FK_b727e68cd375f5c721d60a024c4" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "obra_categoria" DROP CONSTRAINT "FK_b727e68cd375f5c721d60a024c4"`);
        await queryRunner.query(`ALTER TABLE "obra_categoria" DROP CONSTRAINT "FK_b351e0d325bff14c7669fbce877"`);
        await queryRunner.query(`ALTER TABLE "obra" DROP CONSTRAINT "FK_1fa7f93a22a39f6fc2b0228ec4c"`);
        await queryRunner.query(`ALTER TABLE "exemplar" DROP CONSTRAINT "FK_64e30441e620b0caadc2f3954ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b727e68cd375f5c721d60a024c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b351e0d325bff14c7669fbce87"`);
        await queryRunner.query(`DROP TABLE "obra_categoria"`);
        await queryRunner.query(`DROP TABLE "autor"`);
        await queryRunner.query(`DROP TABLE "obra"`);
        await queryRunner.query(`DROP TABLE "exemplar"`);
        await queryRunner.query(`DROP TYPE "public"."exemplar_estado_enum"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }

}
