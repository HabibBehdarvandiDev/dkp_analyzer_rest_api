/*
  Warnings:

  - The primary key for the `product_dkp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_dkp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_dkp` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`product_dkp`);
