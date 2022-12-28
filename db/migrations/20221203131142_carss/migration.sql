/*
  Warnings:

  - Added the required column `damage` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doors` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstOwner` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "engine" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "damage" TEXT NOT NULL,
    "firstOwner" TEXT NOT NULL
);
INSERT INTO "new_Car" ("city", "createdAt", "description", "engine", "fuel", "hp", "id", "mileage", "model", "name", "price", "updatedAt", "userID", "year") SELECT "city", "createdAt", "description", "engine", "fuel", "hp", "id", "mileage", "model", "name", "price", "updatedAt", "userID", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
