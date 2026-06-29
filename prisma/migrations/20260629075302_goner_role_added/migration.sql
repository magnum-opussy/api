-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PEASANT', 'ADMIN');

-- AlterTable
ALTER TABLE "goners" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PEASANT';
