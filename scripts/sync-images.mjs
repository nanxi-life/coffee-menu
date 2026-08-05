import fs from 'node:fs';
import path from 'node:path';

const SOURCE_DIR = path.resolve('content/recipes');
const TARGET_DIR = path.resolve('public/images');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function isImage(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function copyImages(source, target) {
  if (!fs.existsSync(source)) return;

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyImages(sourcePath, targetPath);
    } else if (isImage(entry.name)) {
      fs.mkdirSync(target, { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Synced: ${sourcePath} -> ${targetPath}`);
    }
  }
}

// Clean up old images
if (fs.existsSync(TARGET_DIR)) {
  fs.rmSync(TARGET_DIR, { recursive: true, force: true });
}

copyImages(SOURCE_DIR, TARGET_DIR);
