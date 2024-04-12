-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CheckIn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeesId" INTEGER NOT NULL,
    CONSTRAINT "CheckIn_attendeesId_fkey" FOREIGN KEY ("attendeesId") REFERENCES "Attendees" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CheckIn" ("attendeesId", "createdAt", "id") SELECT "attendeesId", "createdAt", "id" FROM "CheckIn";
DROP TABLE "CheckIn";
ALTER TABLE "new_CheckIn" RENAME TO "CheckIn";
CREATE UNIQUE INDEX "CheckIn_attendeesId_key" ON "CheckIn"("attendeesId");
CREATE TABLE "new_Attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventsId" TEXT NOT NULL,
    CONSTRAINT "Attendees_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "Events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attendees" ("createdAt", "email", "eventsId", "id", "name") SELECT "createdAt", "email", "eventsId", "id", "name" FROM "Attendees";
DROP TABLE "Attendees";
ALTER TABLE "new_Attendees" RENAME TO "Attendees";
CREATE UNIQUE INDEX "Attendees_eventsId_email_key" ON "Attendees"("eventsId", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
