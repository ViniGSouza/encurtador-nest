/*
  Warnings:

  - You are about to drop the column `ip_address` on the `url_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `url_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `url_clicks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "url_clicks" DROP COLUMN "ip_address",
DROP COLUMN "referer",
DROP COLUMN "user_agent";
