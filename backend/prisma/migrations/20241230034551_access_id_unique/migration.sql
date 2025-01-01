/*
  Warnings:

  - A unique constraint covering the columns `[accessId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organization_accessId_key" ON "Organization"("accessId");
