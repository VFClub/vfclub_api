/*
  Warnings:

  - A unique constraint covering the columns `[access_link]` on the table `partners` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "partners_access_link_key" ON "partners"("access_link");
