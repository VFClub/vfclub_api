/*
  Warnings:

  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - Added the required column `type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_type",
ADD COLUMN     "type" TEXT NOT NULL;
