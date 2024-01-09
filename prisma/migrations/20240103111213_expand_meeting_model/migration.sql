/*
  Warnings:

  - You are about to drop the column `date` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `clientTimezone` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costToClient` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationInMinutes` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expertId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingDate` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_userId_fkey";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "date",
DROP COLUMN "duration",
DROP COLUMN "userId",
ADD COLUMN     "clientTimezone" TEXT NOT NULL,
ADD COLUMN     "costToClient" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "durationInMinutes" INTEGER NOT NULL,
ADD COLUMN     "expertId" TEXT NOT NULL,
ADD COLUMN     "meetingDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
