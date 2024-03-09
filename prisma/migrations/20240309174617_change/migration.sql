/*
  Warnings:

  - You are about to drop the column `status` on the `product_dkp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_dkp` DROP COLUMN `status`,
    ADD COLUMN `product_status` ENUM('out_of_stock', 'marketable') NOT NULL DEFAULT 'marketable';
