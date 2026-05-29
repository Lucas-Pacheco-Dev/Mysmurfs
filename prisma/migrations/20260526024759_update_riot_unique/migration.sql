/*
  Warnings:

  - A unique constraint covering the columns `[gameName,tagLine]` on the table `RiotAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RiotAccount_gameName_tagLine_key` ON `RiotAccount`(`gameName`, `tagLine`);
