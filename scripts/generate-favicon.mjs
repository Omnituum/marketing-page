// Run: pnpm add -D sharp png-to-ico (if not installed)
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const sourceImage = join(projectRoot, 'public', 'omnituum-icon-phase-1-transparent copy 2.png');
const outputDir = join(projectRoot, 'public');

async function generateFavicons() {
  console.log('Generating favicons from:', sourceImage);

  // Generate various PNG sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  for (const { size, name } of sizes) {
    await sharp(sourceImage)
      .resize(size, size)
      .png()
      .toFile(join(outputDir, name));
    console.log(`Generated: ${name}`);
  }

  // Generate favicon.ico from the 16, 32, and 48 px versions
  const icoBuffer = await pngToIco([
    join(outputDir, 'favicon-16x16.png'),
    join(outputDir, 'favicon-32x32.png'),
    join(outputDir, 'favicon-48x48.png'),
  ]);
  writeFileSync(join(outputDir, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
