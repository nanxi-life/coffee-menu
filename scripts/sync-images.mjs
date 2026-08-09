import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('content/recipes');
const TARGET_DIR = path.resolve('public/images');
const HERO_DIR = path.resolve(TARGET_DIR, 'hero');
const GENERATED_DIR = path.resolve('src/generated');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function isImage(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function copyImages(source, target, images = []) {
  if (!fs.existsSync(source)) return;

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyImages(sourcePath, targetPath, images);
    } else if (isImage(entry.name)) {
      fs.mkdirSync(target, { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
      images.push({ sourcePath, relativePath: path.relative(SOURCE_DIR, sourcePath) });
      console.log(`Synced: ${sourcePath} -> ${targetPath}`);
    }
  }

  return images;
}

// Clean up old images
if (fs.existsSync(TARGET_DIR)) {
  fs.rmSync(TARGET_DIR, { recursive: true, force: true });
}

const sourceImages = copyImages(SOURCE_DIR, TARGET_DIR, []);
fs.rmSync(HERO_DIR, { recursive: true, force: true });

const heroImages = await Promise.all(
  sourceImages.map(async ({ sourcePath, relativePath }) => {
    const metadata = await sharp(sourcePath).metadata();
    const orientation = (metadata.width ?? 0) >= (metadata.height ?? 0) ? 'landscape' : 'portrait';
    const thumbRelativePath = relativePath.replace(/\.[^.]+$/, '.jpg');
    const thumbPath = path.join(HERO_DIR, thumbRelativePath);

    await fs.promises.mkdir(path.dirname(thumbPath), { recursive: true });
    await sharp(sourcePath)
      .resize({ width: orientation === 'portrait' ? 480 : 720, withoutEnlargement: true })
      .jpeg({ quality: 72, progressive: true })
      .toFile(thumbPath);

    return {
      source: `/images/${relativePath.split(path.sep).join('/')}`,
      thumb: `/images/hero/${thumbRelativePath.split(path.sep).join('/')}`,
      orientation,
    };
  })
);

fs.mkdirSync(GENERATED_DIR, { recursive: true });
fs.writeFileSync(
  path.join(GENERATED_DIR, 'hero-images.ts'),
  `export const HERO_IMAGES = ${JSON.stringify(heroImages, null, 2)} as const;\n`
);
