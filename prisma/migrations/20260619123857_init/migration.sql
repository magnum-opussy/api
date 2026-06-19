-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'TUROK', 'WALMART_BAG', 'GENDERFLUID_HELICOPTER', 'SNIPER_MONKEY', 'JEFFREY_EPSTEIN', 'MR_ZHORIK');

-- CreateTable
CREATE TABLE "goners" (
    "gid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goners_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "GonerProfile" (
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

    CONSTRAINT "GonerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GonerProfile_gid_key" ON "GonerProfile"("gid");

-- CreateIndex
CREATE UNIQUE INDEX "GonerProfile_avatarId_key" ON "GonerProfile"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "GonerProfile_bannerId_key" ON "GonerProfile"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- AddForeignKey
ALTER TABLE "GonerProfile" ADD CONSTRAINT "GonerProfile_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GonerProfile" ADD CONSTRAINT "GonerProfile_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GonerProfile" ADD CONSTRAINT "GonerProfile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GonerProfile" ADD CONSTRAINT "GonerProfile_gid_fkey" FOREIGN KEY ("gid") REFERENCES "goners"("gid") ON DELETE RESTRICT ON UPDATE CASCADE;
