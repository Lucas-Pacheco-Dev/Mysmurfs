-- CreateTable
CREATE TABLE `Champion` (
    `id` INTEGER NOT NULL,
    `riotKey` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Champion_riotKey_key`(`riotKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChampionMastery` ADD CONSTRAINT `ChampionMastery_championId_fkey` FOREIGN KEY (`championId`) REFERENCES `Champion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_championId_fkey` FOREIGN KEY (`championId`) REFERENCES `Champion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
