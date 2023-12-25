/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserAvailability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAvailability" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
