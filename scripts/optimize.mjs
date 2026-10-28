import sharp from 'sharp';
await sharp('public/images/portrait.jpg').webp({quality:78}).toFile('public/images/portrait.webp');
await sharp('public/images/portrait.jpg').resize(400).webp({quality:82}).toFile('public/images/portrait-small.webp');
