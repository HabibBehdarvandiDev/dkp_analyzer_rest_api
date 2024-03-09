-- CreateTable
CREATE TABLE `product_dkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_dkp` INTEGER NOT NULL,
    `product_title` VARCHAR(191) NOT NULL,
    `product_price` VARCHAR(191) NOT NULL,
    `status` ENUM('out_of_stock', 'marketable') NOT NULL DEFAULT 'marketable',

    UNIQUE INDEX `product_dkp_product_dkp_key`(`product_dkp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
