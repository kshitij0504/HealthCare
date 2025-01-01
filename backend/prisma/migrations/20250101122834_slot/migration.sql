/*
  Warnings:

  - You are about to drop the column `slotDetails` on the `Slot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,date,time]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Slot_doctorId_slotDetails_key";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "slotDetails",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Slot_doctorId_date_time_key" ON "Slot"("doctorId", "date", "time");
