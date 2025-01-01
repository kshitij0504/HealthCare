/*
  Warnings:

  - You are about to drop the `_AppointmentToDoctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentToOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentToDoctor" DROP CONSTRAINT "_AppointmentToDoctor_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToDoctor" DROP CONSTRAINT "_AppointmentToDoctor_B_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToOrganization" DROP CONSTRAINT "_AppointmentToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToOrganization" DROP CONSTRAINT "_AppointmentToOrganization_B_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToUser" DROP CONSTRAINT "_AppointmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToUser" DROP CONSTRAINT "_AppointmentToUser_B_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AppointmentToDoctor";

-- DropTable
DROP TABLE "_AppointmentToOrganization";

-- DropTable
DROP TABLE "_AppointmentToUser";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
