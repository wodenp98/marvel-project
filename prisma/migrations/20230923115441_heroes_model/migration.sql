/*
  Warnings:

  - You are about to drop the column `imagebig` on the `heroes` table. All the data in the column will be lost.
  - You are about to drop the column `imagesmall` on the `heroes` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `heroes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `heroes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "heroes" DROP COLUMN "imagebig",
DROP COLUMN "imagesmall",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL;
