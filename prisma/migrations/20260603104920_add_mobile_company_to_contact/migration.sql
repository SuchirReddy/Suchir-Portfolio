-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "company" TEXT,
ADD COLUMN     "mobile" TEXT;

-- AlterTable
ALTER TABLE "TimelineEntry" ALTER COLUMN "description" DROP NOT NULL;
