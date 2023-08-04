/*
  Warnings:

  - You are about to alter the column `price` on the `cartitems` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `discount` on the `cartitems` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `cartitems` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `discount` DOUBLE NOT NULL DEFAULT 0.00;
