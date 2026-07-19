import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://yfftfzmqpubjmehvxfdw.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZnRmem1xcHViam1laHZ4ZmR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk5NTY2NCwiZXhwIjoyMDkxNTcxNjY0fQ.AoaOy4sapHuX3j3TbaXZBdM-dFZYg5OZhlqo4B7zSBE';
const BUCKET = 'Porfolio';
const LOCAL_BASE = 'g:/2026/Porto/V3.2/V3/public/images';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const SKIP = ['.DS_Store', '.gitkeep'];

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.gif': 'image/gif',
};

function getAllFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, base));
    } else if (!SKIP.includes(entry.name)) {
      files.push({ fullPath, relativePath: path.relative(base, fullPath).replace(/\\/g, '/') });
    }
  }
  return files;
}

async function upload() {
  const files = getAllFiles(LOCAL_BASE);
  console.log(`\nFound ${files.length} files to upload to bucket "${BUCKET}"\n`);

  let success = 0, failed = 0;

  for (const { fullPath, relativePath } of files) {
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(fullPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(relativePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error(`❌ FAILED: ${relativePath} — ${error.message}`);
      failed++;
    } else {
      console.log(`✅ ${relativePath}`);
      success++;
    }
  }

  console.log(`\n=== Done: ${success} uploaded, ${failed} failed ===`);
  console.log(`\nBase URL: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`);
}

upload();
