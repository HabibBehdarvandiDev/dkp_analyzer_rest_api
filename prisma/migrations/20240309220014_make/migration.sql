/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_dkp]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `product_dkp` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `product_dkp` INTEGER NOT NULL,
    ADD PRIMARY KEY (`product_dkp`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_dkp_key` ON `Product`(`product_dkp`);
