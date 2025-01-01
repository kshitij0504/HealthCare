/*
  Warnings:

  - Added the required column `accessId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "accessId" TEXT NOT NULL;
