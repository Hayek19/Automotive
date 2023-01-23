/*
  Warnings:

  - Added the required column `image` to the `CarPart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CarPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "engine" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "image" BLOB NOT NULL
);
INSERT INTO "new_CarPart" ("brand", "city", "createdAt", "description", "engine", "fuel", "hp", "id", "model", "name", "type", "updatedAt") SELECT "brand", "city", "createdAt", "description", "engine", "fuel", "hp", "id", "model", "name", "type", "updatedAt" FROM "CarPart";
DROP TABLE "CarPart";
ALTER TABLE "new_CarPart" RENAME TO "CarPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
