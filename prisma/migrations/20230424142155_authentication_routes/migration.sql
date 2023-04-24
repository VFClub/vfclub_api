-- AlterTable
ALTER TABLE `Users` ADD COLUMN `account_activation_code` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `account_is_active` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `created_by` INTEGER NULL,
    MODIFY `accepted_terms` BOOLEAN NULL DEFAULT false;
