/*
  Warnings:

  - A unique constraint covering the columns `[eventsId,email]` on the table `Attendees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendees_eventsId_email_key" ON "Attendees"("eventsId", "email");
