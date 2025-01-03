/*
  Warnings:

  - You are about to drop the column `name` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `BloodGroup` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalcode` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "name",
ADD COLUMN     "BloodGroup" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "postalcode" TEXT NOT NULL;
