/*
  Warnings:

  - The `allergies` column on the `HealthData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `chronicConditions` column on the `HealthData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "HealthData" DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[],
DROP COLUMN "chronicConditions",
ADD COLUMN     "chronicConditions" TEXT[];
