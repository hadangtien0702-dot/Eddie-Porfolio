import fs from 'fs';

const file = 'g:/2026/Porto/V31.0/V3/src/data/casestudy.ts';
let content = fs.readFileSync(file, 'utf8');

// Update images to .webp
content = content.replace(/\/images\/casestudy\/thinksmart\/card-cover\.png/g, '/images/casestudy/thinksmart/card-cover.webp');
content = content.replace(/\/images\/casestudy\/thinksmart\/HeroCaseStudy\.png/g, '/images/casestudy/thinksmart/herocasestudy.webp');
content = content.replace(/\/images\/casestudy\/thinksmart\/revenue-hero\.png/g, '/images/casestudy/thinksmart/revenue-hero.webp');

// Read social post images
const socialPostDir = 'g:/2026/Porto/V31.0/V3/public/images/casestudy/thinksmart/social-post';
const socialFiles = fs.readdirSync(socialPostDir).filter(f => f.endsWith('.webp'));

let creativeWorkItems = socialFiles.map(file => {
  return `      {
        id: "${file.replace('.webp', '')}",
        type: "ad-screenshot",
        thumbnail: "/images/casestudy/thinksmart/social-post/${file}",
        caption: "Thinksmart Social Post Creative",
        platform: "Facebook/Instagram"
      }`;
});

// Thêm video vào cuối hoặc đầu mảng
creativeWorkItems.unshift(`      {
        id: "video-editor-1",
        type: "video-thumbnail",
        thumbnail: "/images/casestudy/thinksmart/banner-01.webp", // Sử dụng banner làm thumbnail tạm
        videoUrl: "/videos/casestudy/thinksmart/video-editor-1.mp4",
        caption: "Thinksmart Video Creative",
        platform: "Multiple Platforms"
      }`);

const newCreativeWork = `creativeWork: [\n${creativeWorkItems.join(',\n')}\n    ]`;

// Thay thế creativeWork: [] thành nội dung mới
content = content.replace(/creativeWork:\s*\[\]/, newCreativeWork);

fs.writeFileSync(file, content);
console.log('Successfully updated casestudy.ts!');
