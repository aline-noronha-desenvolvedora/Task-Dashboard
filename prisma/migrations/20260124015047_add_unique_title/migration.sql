/*
  Warnings:

  - You are about to drop the column `slug` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Task_slug_key` ON `Task`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`;

-- CreateIndex
CREATE UNIQUE INDEX `Task_title_key` ON `Task`(`title`);
