/*
  Warnings:

  - Added the required column `indice` to the `UserDatabase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDatabase" ADD COLUMN     "indice" INTEGER NOT NULL;
