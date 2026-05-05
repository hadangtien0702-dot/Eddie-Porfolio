import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Các thư mục nguồn
const sourceSocialPost = 'g:/2026/Porto/V31.0/Image/Social Post';
const sourceBanner = 'g:/2026/Porto/V31.0/Image/Banner - Casestudy';
const sourceThinksmart = 'g:/2026/Porto/V31.0/V3/public/images/casestudy/thinksmart';
const sourceSetupBuild = 'g:/2026/Porto/V31.0/Image/03-Work/setup-and-build';

// Các thư mục đích
const destSocialPost = 'g:/2026/Porto/V31.0/Image/casestudy/thinksmart/social-post';
const destThinksmart = 'g:/2026/Porto/V31.0/Image/casestudy/thinksmart';
const destSetupBuild = 'g:/2026/Porto/V31.0/Image/services/setup-build';

// Tạo thư mục nếu chưa có
[destSocialPost, destThinksmart, destSetupBuild].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function processDirectory(inputDir, outputDir, prefix = '', deleteOriginal = false) {
  if (!fs.existsSync(inputDir)) return [];
  const files = fs.readdirSync(inputDir);
  const results = [];

  for (const file of files) {
    if (file.toLowerCase().match(/\.(png|jpe?g|heic)$/i)) {
      const inputPath = path.join(inputDir, file);
      // Đổi tên: bỏ khoảng trắng, chuyển thành chữ thường, thêm prefix
      let newBaseName = file.replace(/\s+/g, '-').replace(/\.[^/.]+$/, "").toLowerCase();
      if (prefix && !newBaseName.startsWith(prefix)) newBaseName = `${prefix}${newBaseName}`;
      
      const outputPath = path.join(outputDir, `${newBaseName}.webp`);

      try {
        const info = await sharp(inputPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`✅ [${(info.size / 1024).toFixed(1)} KB] ${newBaseName}.webp`);
        results.push(`${newBaseName}.webp`);

        if (deleteOriginal && inputDir === outputDir) {
          fs.unlinkSync(inputPath); // Xoá file cũ nếu đang tối ưu tại chỗ
        }
      } catch (err) {
        console.error(`❌ Lỗi khi xử lý ${file}:`, err.message);
      }
    }
  }
  return results;
}

async function run() {
  console.log("🚀 Bắt đầu tối ưu hoá hình ảnh...");
  
  console.log("\n1. Tối ưu Social Post...");
  const socialPostImages = await processDirectory(sourceSocialPost, destSocialPost, 'sp-');
  
  console.log("\n2. Tối ưu Banner...");
  await processDirectory(sourceBanner, destThinksmart, 'banner-');
  
  console.log("\n3. Tối ưu lại ảnh đang có trong /thinksmart/...");
  await processDirectory(sourceThinksmart, destThinksmart, '', true); // True = delete old png/jpg

  console.log("\n4. Tối ưu Setup & Build...");
  const setupBuildImages = await processDirectory(sourceSetupBuild, destSetupBuild, 'sb-');

  console.log("\n🎉 Đã xong! Danh sách ảnh Setup & Build:");
  setupBuildImages.forEach(img => {
    console.log(`"/images/services/setup-build/${img}",`);
  });

  console.log("\nDanh sách ảnh Social Post để thêm vào creativeWork:");
  socialPostImages.forEach(img => {
    console.log(`{
      id: "${img.replace('.webp', '')}",
      type: "ad-screenshot",
      thumbnail: "/images/casestudy/thinksmart/social-post/${img}",
      caption: "Social Post Creative",
    },`);
  });
}

run();
