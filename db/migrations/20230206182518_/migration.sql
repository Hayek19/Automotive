/*
  Warnings:

  - You are about to drop the column `hp` on the `CarPart` table. All the data in the column will be lost.
  - Added the required column `price` to the `CarPart` table without a default value. This is not possible if the table is not empty.

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
    "price" INTEGER NOT NULL,
    "engine" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "userID" INTEGER NOT NULL
);
INSERT INTO "new_CarPart" ("brand", "city", "createdAt", "description", "engine", "fuel", "id", "image", "model", "name", "type", "updatedAt", "userID") SELECT "brand", "city", "createdAt", "description", "engine", "fuel", "id", "image", "model", "name", "type", "updatedAt", "userID" FROM "CarPart";
DROP TABLE "CarPart";
ALTER TABLE "new_CarPart" RENAME TO "CarPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
