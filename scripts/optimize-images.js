const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const images = [
  'piero-spring-1.jpg',
  'piero-foam-1.jpg',
  'piero-bahia-1.jpg',
  'piero-mattina-1.jpg',
]

images.forEach(async (file) => {
  await sharp(`public/images/${file}`)
    .resize(1200, 800, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(`public/images/optimized/${file.replace('.jpg', '.webp')}`)
  
  console.log(`✅ Optimized: ${file}`)
})