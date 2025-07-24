/*
  Warnings:

  - You are about to drop the column `fileId` on the `Messages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId]` on the table `Files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_fileId_fkey";

-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "fileId";

-- CreateIndex
CREATE UNIQUE INDEX "Files_messageId_key" ON "Files"("messageId");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
