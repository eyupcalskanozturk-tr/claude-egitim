import { writeFileSync } from 'node:fs';
import QRCode from 'qrcode';

const adres = 'https://eyupcalskanozturk-tr.github.io/claude-egitim/';
const svg = await QRCode.toString(adres, { type: 'svg', margin: 1 });
writeFileSync('gorseller/hafta-1/site-karekod.svg', svg);
console.log('karekod: tamam');
