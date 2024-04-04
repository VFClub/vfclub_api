/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `fighters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "fighters" DROP COLUMN "deleted_at";

-- CreateTable
CREATE TABLE "live_matches" (
    "id" SERIAL NOT NULL,
    "about" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "fighter1" INTEGER NOT NULL,
    "fighter2" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "live_matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "live_matches" ADD CONSTRAINT "live_matches_fighter1_fkey" FOREIGN KEY ("fighter1") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_matches" ADD CONSTRAINT "live_matches_fighter2_fkey" FOREIGN KEY ("fighter2") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_matches" ADD CONSTRAINT "live_matches_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
