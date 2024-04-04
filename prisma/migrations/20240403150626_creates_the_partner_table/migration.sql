/*
  Warnings:

  - Added the required column `created_by` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "created_by" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
