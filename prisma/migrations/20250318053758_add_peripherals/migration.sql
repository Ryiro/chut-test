-- CreateTable
CREATE TABLE "MonitorSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" REAL NOT NULL,
    "resolution" TEXT NOT NULL,
    "refreshRate" INTEGER NOT NULL,
    "panelType" TEXT NOT NULL,
    "responseTime" REAL NOT NULL,
    "aspectRatio" TEXT NOT NULL,
    "hdrSupport" BOOLEAN NOT NULL,
    "ports" TEXT NOT NULL,
    "speakers" BOOLEAN NOT NULL,
    "adjustable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "KeyboardSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "switchType" TEXT,
    "backlighting" BOOLEAN NOT NULL,
    "wireless" BOOLEAN NOT NULL,
    "numpad" BOOLEAN NOT NULL,
    "multimedia" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "MouseSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dpi" INTEGER NOT NULL,
    "buttons" INTEGER NOT NULL,
    "wireless" BOOLEAN NOT NULL,
    "sensor" TEXT NOT NULL,
    "rgb" BOOLEAN NOT NULL,
    "weight" INTEGER,
    "adjustable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "SpeakerSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "totalWattage" INTEGER NOT NULL,
    "wireless" BOOLEAN NOT NULL,
    "bluetooth" BOOLEAN NOT NULL,
    "subwoofer" BOOLEAN NOT NULL,
    "remote" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "HeadphoneSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "wireless" BOOLEAN NOT NULL,
    "bluetooth" BOOLEAN NOT NULL,
    "noiseCancelling" BOOLEAN NOT NULL,
    "microphone" BOOLEAN NOT NULL,
    "impedance" INTEGER,
    "frequency" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExternalStorageSpec" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "capacity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "interface" TEXT NOT NULL,
    "portable" BOOLEAN NOT NULL,
    "encrypted" BOOLEAN NOT NULL,
    "readSpeed" INTEGER,
    "writeSpeed" INTEGER
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
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
    "monitorSpecId" TEXT,
    "keyboardSpecId" TEXT,
    "mouseSpecId" TEXT,
    "speakerSpecId" TEXT,
    "headphoneSpecId" TEXT,
    "externalStorageSpecId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_cpuSpecId_fkey" FOREIGN KEY ("cpuSpecId") REFERENCES "CpuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_gpuSpecId_fkey" FOREIGN KEY ("gpuSpecId") REFERENCES "GpuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_ramSpecId_fkey" FOREIGN KEY ("ramSpecId") REFERENCES "RamSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_storageSpecId_fkey" FOREIGN KEY ("storageSpecId") REFERENCES "StorageSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_motherboardSpecId_fkey" FOREIGN KEY ("motherboardSpecId") REFERENCES "MotherboardSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_psuSpecId_fkey" FOREIGN KEY ("psuSpecId") REFERENCES "PsuSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_caseSpecId_fkey" FOREIGN KEY ("caseSpecId") REFERENCES "CaseSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_coolerSpecId_fkey" FOREIGN KEY ("coolerSpecId") REFERENCES "CoolerSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_monitorSpecId_fkey" FOREIGN KEY ("monitorSpecId") REFERENCES "MonitorSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_keyboardSpecId_fkey" FOREIGN KEY ("keyboardSpecId") REFERENCES "KeyboardSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_mouseSpecId_fkey" FOREIGN KEY ("mouseSpecId") REFERENCES "MouseSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_speakerSpecId_fkey" FOREIGN KEY ("speakerSpecId") REFERENCES "SpeakerSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_headphoneSpecId_fkey" FOREIGN KEY ("headphoneSpecId") REFERENCES "HeadphoneSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_externalStorageSpecId_fkey" FOREIGN KEY ("externalStorageSpecId") REFERENCES "ExternalStorageSpec" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("caseSpecId", "category", "coolerSpecId", "cpuSpecId", "createdAt", "description", "gpuSpecId", "id", "image", "motherboardSpecId", "name", "price", "psuSpecId", "ramSpecId", "stock", "storageSpecId", "updatedAt") SELECT "caseSpecId", "category", "coolerSpecId", "cpuSpecId", "createdAt", "description", "gpuSpecId", "id", "image", "motherboardSpecId", "name", "price", "psuSpecId", "ramSpecId", "stock", "storageSpecId", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
