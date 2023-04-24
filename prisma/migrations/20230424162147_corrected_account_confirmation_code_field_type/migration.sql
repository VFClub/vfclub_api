/*
  Warnings:

  - You are about to alter the column `account_activation_code` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `account_activation_code` VARCHAR(191) NULL;
