-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_dkp` INTEGER NULL,
    `product_title` VARCHAR(191) NULL,
    `product_image_url` VARCHAR(191) NULL,
    `product_url` VARCHAR(191) NULL,
    `product_status` VARCHAR(191) NULL,
    `product_colors` JSON NULL,
    `product_rate` VARCHAR(191) NULL,
    `product_statistics` JSON NULL,
    `product_properties` JSON NULL,
    `product_warranty` VARCHAR(191) NULL,
    `product_color` JSON NULL,
    `product_seller` JSON NULL,
    `product_price` JSON NULL,
    `product_videos` JSON NULL,
    `product_category` VARCHAR(191) NULL,
    `product_questions_count` INTEGER NULL,
    `product_comments_count` INTEGER NULL,
    `product_last_comments` JSON NULL,
    `product_last_questions` JSON NULL,
    `product_images` JSON NOT NULL,
    `product_stars` DOUBLE NULL,
    `product_stars_count` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
