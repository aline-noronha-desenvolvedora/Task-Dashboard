/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Task_title_key` ON `Task`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `dueDate`,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Task_slug_key` ON `Task`(`slug`);
