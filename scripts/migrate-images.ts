import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';

process.env.DATABASE_URL = process.env.DIRECT_URL;
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching image IDs...');
  const images = await prisma.projectImage.findMany({
    select: { id: true }
  });
  
  let migrated = 0;
  
  for (const { id } of images) {
    const img = await prisma.projectImage.findUnique({ where: { id } });
    if (!img) continue;

    if (img.imageUrl.startsWith('data:image/')) {
      console.log(`Migrating image ID: ${img.id} (Size: ${(img.imageUrl.length / 1024 / 1024).toFixed(2)} MB)...`);
      
      try {
        // Extract base64 and mime type
        const matches = img.imageUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        
        if (!matches || matches.length !== 3) {
          console.error(`Failed to parse base64 for image ${img.id}`);
          continue;
        }
        
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const extension = mimeType.split('/')[1] || 'png';
        const filename = `migrated-${img.id}.${extension}`;
        
        // Upload to Vercel Blob
        const blob = await put(filename, buffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: mimeType,
        });
        
        // Update database with new URL
        await prisma.projectImage.update({
          where: { id: img.id },
          data: { imageUrl: blob.url },
        });
        
        console.log(`✅ Successfully migrated ${img.id} -> ${blob.url}`);
        migrated++;
      } catch (err) {
        console.error(`❌ Failed to migrate ${img.id}:`, err);
      }
    }
  }
  
  console.log(`\nMigration complete! Successfully moved ${migrated} images to Vercel Blob.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
