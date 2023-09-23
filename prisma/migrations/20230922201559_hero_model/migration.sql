/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "heroes" (
    "id" SERIAL NOT NULL,
    "classhero" TEXT NOT NULL,
    "imagebig" TEXT NOT NULL,
    "imagesmall" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);
