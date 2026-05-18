/* Otimiza as imagens de fruta: 512x512, PNG transparente, alvo < 60 KB. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIR = path.join(__dirname, '..', 'assets', 'fruits');
const BACKUP = path.join(DIR, '_originais');
const TARGET_BYTES = 60 * 1024;
const SIZE = 512;

async function main() {
  if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP);

  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.toLowerCase().endsWith('.png'));

  let totalAntes = 0;
  let totalDepois = 0;
  const linhas = [];

  for (const file of files) {
    const src = path.join(DIR, file);
    const bkp = path.join(BACKUP, file);

    if (!fs.existsSync(bkp)) fs.copyFileSync(src, bkp);

    const antes = fs.statSync(bkp).size;
    totalAntes += antes;

    const base = sharp(bkp).resize(SIZE, SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

    let buf = null;
    let usado = '';
    for (const cores of [256, 128, 96, 64, 48, 32]) {
      buf = await base
        .clone()
        .png({ palette: true, colors: cores, effort: 10, compressionLevel: 9 })
        .toBuffer();
      usado = `paleta ${cores} cores`;
      if (buf.length <= TARGET_BYTES) break;
    }

    fs.writeFileSync(src, buf);
    totalDepois += buf.length;

    const kbA = (antes / 1024).toFixed(0);
    const kbD = (buf.length / 1024).toFixed(0);
    const flag = buf.length <= TARGET_BYTES ? 'OK' : 'ACIMA';
    linhas.push(`${file.padEnd(16)} ${kbA.padStart(6)} KB -> ${kbD.padStart(5)} KB  [${flag}] ${usado}`);
  }

  console.log(linhas.join('\n'));
  console.log('-'.repeat(60));
  console.log(`Imagens: ${files.length}`);
  console.log(`Antes:  ${(totalAntes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Depois: ${(totalDepois / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
