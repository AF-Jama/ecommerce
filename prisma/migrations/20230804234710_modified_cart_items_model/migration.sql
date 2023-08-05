/*
  Warnings:

  - You are about to drop the column `category` on the `cartitems` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `cartitems` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `cartitems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cartitems` DROP COLUMN `category`,
    DROP COLUMN `discount`,
    DROP COLUMN `price`;
