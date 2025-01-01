/*
  Warnings:

  - A unique constraint covering the columns `[accessId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "accessId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_accessId_key" ON "Doctor"("accessId");
