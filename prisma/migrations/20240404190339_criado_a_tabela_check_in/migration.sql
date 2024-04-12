-- CreateTable
CREATE TABLE "CheckIn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeesId" INTEGER NOT NULL,
    CONSTRAINT "CheckIn_attendeesId_fkey" FOREIGN KEY ("attendeesId") REFERENCES "Attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_attendeesId_key" ON "CheckIn"("attendeesId");
