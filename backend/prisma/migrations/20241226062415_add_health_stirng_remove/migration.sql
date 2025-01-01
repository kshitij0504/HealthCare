-- AlterTable
ALTER TABLE "HealthData" ALTER COLUMN "allergies" SET NOT NULL,
ALTER COLUMN "allergies" SET DATA TYPE TEXT,
ALTER COLUMN "chronicConditions" SET NOT NULL,
ALTER COLUMN "chronicConditions" SET DATA TYPE TEXT;
