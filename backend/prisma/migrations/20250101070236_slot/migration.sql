/*
  Warnings:

  - You are about to drop the column `date` on the `Slot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,timeSlot]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Slot_doctorId_date_timeSlot_key";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "date";

-- CreateIndex
CREATE UNIQUE INDEX "Slot_doctorId_timeSlot_key" ON "Slot"("doctorId", "timeSlot");
