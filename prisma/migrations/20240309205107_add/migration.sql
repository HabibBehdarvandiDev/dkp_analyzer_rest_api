-- CreateTable
CREATE TABLE `apiKey` (
    `api_key` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `apiKey_api_key_key`(`api_key`),
    PRIMARY KEY (`api_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
