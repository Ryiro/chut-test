-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "cpuSpecId" TEXT,
    "gpuSpecId" TEXT,
    "ramSpecId" TEXT,
    "storageSpecId" TEXT,
    "motherboardSpecId" TEXT,
    "psuSpecId" TEXT,
    "caseSpecId" TEXT,
    "coolerSpecId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_cpuSpecId_fkey" FOREIGN KEY ("cpuSpecId") REFERENCES "CpuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_gpuSpecId_fkey" FOREIGN KEY ("gpuSpecId") REFERENCES "GpuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_ramSpecId_fkey" FOREIGN KEY ("ramSpecId") REFERENCES "RamSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_storageSpecId_fkey" FOREIGN KEY ("storageSpecId") REFERENCES "StorageSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_motherboardSpecId_fkey" FOREIGN KEY ("motherboardSpecId") REFERENCES "MotherboardSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_psuSpecId_fkey" FOREIGN KEY ("psuSpecId") REFERENCES "PsuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_caseSpecId_fkey" FOREIGN KEY ("caseSpecId") REFERENCES "CaseSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_coolerSpecId_fkey" FOREIGN KEY ("coolerSpecId") REFERENCES "CoolerSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CpuSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "baseSpeed" REAL NOT NULL,
    "boostSpeed" REAL,
    "socket" TEXT NOT NULL,
    "tdp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "GpuSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "memory" INTEGER NOT NULL,
    "memoryType" TEXT NOT NULL,
    "coreClock" REAL NOT NULL,
    "boostClock" REAL,
    "tdp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RamSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "capacity" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "timing" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StorageSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "interface" TEXT NOT NULL,
    "readSpeed" INTEGER,
    "writeSpeed" INTEGER
);

-- CreateTable
CREATE TABLE "MotherboardSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "socket" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "formFactor" TEXT NOT NULL,
    "memoryMax" INTEGER NOT NULL,
    "memorySlots" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PsuSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wattage" INTEGER NOT NULL,
    "efficiency" TEXT NOT NULL,
    "modular" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "CaseSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formFactor" TEXT NOT NULL,
    "maxGpuLength" INTEGER NOT NULL,
    "maxCpuHeight" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CoolerSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "radiatorSize" INTEGER,
    "fanSize" INTEGER NOT NULL,
    "fanCount" INTEGER NOT NULL,
    "tdp" INTEGER NOT NULL,
    "socket" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
