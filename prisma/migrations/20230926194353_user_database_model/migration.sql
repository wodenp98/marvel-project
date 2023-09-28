-- CreateTable
CREATE TABLE "UserDatabase" (
    "id" SERIAL NOT NULL,
    "classhero" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "cs" INTEGER NOT NULL,

    CONSTRAINT "UserDatabase_pkey" PRIMARY KEY ("id")
);
