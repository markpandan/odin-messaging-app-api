/*
  Warnings:

  - You are about to drop the column `userAId` on the `Chats` table. All the data in the column will be lost.
  - You are about to drop the column `userBId` on the `Chats` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_userAId_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_userBId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_receiverId_fkey";

-- DropIndex
DROP INDEX "Chats_userAId_userBId_key";

-- AlterTable
ALTER TABLE "Chats" DROP COLUMN "userAId",
DROP COLUMN "userBId";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "receiverId";

-- CreateTable
CREATE TABLE "_ChatsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatsToUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatsToUsers_B_index" ON "_ChatsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_ChatsToUsers" ADD CONSTRAINT "_ChatsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsToUsers" ADD CONSTRAINT "_ChatsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
