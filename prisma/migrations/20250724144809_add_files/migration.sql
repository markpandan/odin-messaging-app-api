-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "fileId" TEXT;

-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
