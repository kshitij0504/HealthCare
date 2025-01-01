/*
  Warnings:

  - You are about to drop the column `isBooked` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `Slot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,slotDetails]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotDetails` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Slot_doctorId_timeSlot_key";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "isBooked",
DROP COLUMN "timeSlot",
ADD COLUMN     "slotDetails" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Slot_doctorId_slotDetails_key" ON "Slot"("doctorId", "slotDetails");
