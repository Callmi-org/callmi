/*
  Warnings:

  - You are about to drop the column `meetingDate` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `expertTimezone` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingDateUTC` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payableToExpert` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSessionId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "meetingDate",
ADD COLUMN     "expertTimezone" TEXT NOT NULL,
ADD COLUMN     "meetingDateUTC" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payableToExpert" INTEGER NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT NOT NULL;
