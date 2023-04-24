/*
  Warnings:

  - A unique constraint covering the columns `[email,user_type]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_email_user_type_key` ON `Users`(`email`, `user_type`);
