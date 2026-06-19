/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GonerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GonerProfile" DROP CONSTRAINT "GonerProfile_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "GonerProfile" DROP CONSTRAINT "GonerProfile_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "GonerProfile" DROP CONSTRAINT "GonerProfile_countryId_fkey";

-- DropForeignKey
ALTER TABLE "GonerProfile" DROP CONSTRAINT "GonerProfile_gid_fkey";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "GonerProfile";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "goner_profiles" (
    "id" TEXT NOT NULL,
    "gid" TEXT NOT NULL,
    "countryId" TEXT,
    "avatarId" TEXT,
    "bannerId" TEXT,
    "bio" TEXT,
    "fullname" TEXT,
    "pronouns" TEXT,
    "gender" "Gender",
    "phone" TEXT,
    "fullAddress" TEXT,
    "favouriteGame" TEXT,
    "favouriteWayToDie" TEXT,
    "favouriteWeapon" TEXT,
    "favouriteLocation" TEXT,
    "birthdate" TIMESTAMP(3),
    "firstSex" TIMESTAMP(3),
    "secondSex" TIMESTAMP(3),
    "lastSeen" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goner_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "goner_profiles_gid_key" ON "goner_profiles"("gid");

-- CreateIndex
CREATE UNIQUE INDEX "goner_profiles_avatarId_key" ON "goner_profiles"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "goner_profiles_bannerId_key" ON "goner_profiles"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- AddForeignKey
ALTER TABLE "goner_profiles" ADD CONSTRAINT "goner_profiles_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goner_profiles" ADD CONSTRAINT "goner_profiles_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goner_profiles" ADD CONSTRAINT "goner_profiles_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goner_profiles" ADD CONSTRAINT "goner_profiles_gid_fkey" FOREIGN KEY ("gid") REFERENCES "goners"("gid") ON DELETE RESTRICT ON UPDATE CASCADE;
