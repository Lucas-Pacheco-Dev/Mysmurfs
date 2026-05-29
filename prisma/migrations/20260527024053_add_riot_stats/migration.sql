-- AlterTable
ALTER TABLE `riotaccount` ADD COLUMN `login` VARCHAR(191) NULL,
    ADD COLUMN `passAccount` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `RiotRank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `queueType` VARCHAR(191) NOT NULL,
    `tier` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `leaguePoints` INTEGER NOT NULL,
    `wins` INTEGER NOT NULL,
    `losses` INTEGER NOT NULL,
    `veteran` BOOLEAN NOT NULL,
    `inactive` BOOLEAN NOT NULL,
    `freshBlood` BOOLEAN NOT NULL,
    `hotStreak` BOOLEAN NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `riotAccountId` INTEGER NOT NULL,

    UNIQUE INDEX `RiotRank_riotAccountId_queueType_key`(`riotAccountId`, `queueType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionMastery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championId` INTEGER NOT NULL,
    `championLevel` INTEGER NOT NULL,
    `championPoints` INTEGER NOT NULL,
    `championPointsSinceLastLevel` INTEGER NOT NULL,
    `championPointsUntilNextLevel` INTEGER NOT NULL,
    `markRequiredForNextLevel` INTEGER NOT NULL,
    `tokensEarned` INTEGER NOT NULL,
    `lastPlayTime` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `riotAccountId` INTEGER NOT NULL,

    UNIQUE INDEX `ChampionMastery_riotAccountId_championId_key`(`riotAccountId`, `championId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` VARCHAR(191) NOT NULL,
    `championId` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `deaths` INTEGER NOT NULL,
    `assists` INTEGER NOT NULL,
    `win` BOOLEAN NOT NULL,
    `gameDuration` INTEGER NOT NULL,
    `playedAt` DATETIME(3) NOT NULL,
    `riotAccountId` INTEGER NOT NULL,

    UNIQUE INDEX `Match_matchId_key`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RiotRank` ADD CONSTRAINT `RiotRank_riotAccountId_fkey` FOREIGN KEY (`riotAccountId`) REFERENCES `RiotAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionMastery` ADD CONSTRAINT `ChampionMastery_riotAccountId_fkey` FOREIGN KEY (`riotAccountId`) REFERENCES `RiotAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_riotAccountId_fkey` FOREIGN KEY (`riotAccountId`) REFERENCES `RiotAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
