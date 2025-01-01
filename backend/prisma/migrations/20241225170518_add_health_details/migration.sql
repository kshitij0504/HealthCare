/*
  Warnings:

  - The primary key for the `HealthData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthData` on the `HealthData` table. All the data in the column will be lost.
  - The `id` column on the `HealthData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bloodType` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthStatus` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insuranceProvider` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyEndDate` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyNumber` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyStartDate` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HealthData` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `HealthData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "HealthData" DROP CONSTRAINT "HealthData_userId_fkey";

-- AlterTable
ALTER TABLE "HealthData" DROP CONSTRAINT "HealthData_pkey",
DROP COLUMN "healthData",
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "chronicConditions" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactNumber" TEXT,
ADD COLUMN     "healthStatus" TEXT NOT NULL,
ADD COLUMN     "insuranceProvider" TEXT NOT NULL,
ADD COLUMN     "policyEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "policyNumber" TEXT NOT NULL,
ADD COLUMN     "policyStartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "HealthData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "phoneNumber",
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "UserVerification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerification_userId_otp_key" ON "UserVerification"("userId", "otp");

-- CreateIndex
CREATE INDEX "HealthData_userId_idx" ON "HealthData"("userId");

-- AddForeignKey
ALTER TABLE "UserVerification" ADD CONSTRAINT "UserVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthData" ADD CONSTRAINT "HealthData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
