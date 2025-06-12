-- CreateTable
CREATE TABLE "Vinyl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "listened" BOOLEAN NOT NULL DEFAULT false,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "coverUrl" TEXT
);
