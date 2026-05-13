# Master Video Tracking — Eddie Portfolio V3.2

Tài liệu tổng hợp toàn bộ video assets, trạng thái hosting và tích hợp code.

---

## Hạ tầng lưu trữ

| Service | Dùng cho | Giới hạn | Ghi chú |
|---|---|---|---|
| **Cloudflare R2** | Video ads lớn (>50MB) | 10GB free, không giới hạn file size | Bucket: `eddie-portfolio` |
| **GitHub / Vercel** | Social videos nhỏ (<20MB) | 100MB/file | Serve trực tiếp từ `public/` |
| **YouTube** | Ads có sẵn trên YT | Không giới hạn | Embed qua URL |

**R2 Public URL base:** `https://pub-9332e0501e844ae48782601867134d26.r2.dev`

---

## 1. Ads Performance (A01 – A14)

| ID | Title | Hosting | URL trong Code | Status |
|---|---|---|---|---|
| A01 | Bồi Thường Thay Gan 119 Ngàn | YouTube | `youtube.com/watch?v=rDSl4QQWTtg` | ✅ Live |
| A02 | Tiền Lời 13.44% Miễn Thuế | YouTube | `youtube.com/watch?v=YqL7qMa1PCU` | ✅ Live |
| A03 | Bảo Hiểm IUL Secrets | YouTube | `youtube.com/watch?v=qMpf1f1aeRw` | ✅ Live |
| A04 | Tối Ưu Lương Hưu Mỹ | YouTube | — | ⬜ Chưa thêm vào code |
| A05 | Nghỉ Hưu Dư Dả 500K | YouTube | — | ⬜ Chưa thêm vào code |
| A06 | Sự Thật Chi Phí Max Funded IUL | YouTube | — | ⬜ Chưa thêm vào code |
| A07 | Podcast: Sự Thật IUL | YouTube | — | ⬜ Chưa thêm vào code |
| A08 | Bảo Hiểm Mỹ - Đừng Mua... | YouTube | — | ⬜ Chưa thêm vào code |
| A09 | Premium Creative Showcase | **Cloudflare R2** | `r2.dev/videos/ads/premium-creative-showcase.mp4` | ✅ Live · Pinned |
| A10 | Bảo Hiểm Y Tế Tại Mỹ | **Cloudflare R2** | — | ⚠️ File trên R2, chưa thêm vào code |
| A11 | Facebook Marketing Strategy | **Cloudflare R2** | — | ⚠️ File trên R2, chưa thêm vào code |
| A12 | Financial Strategy - Plan B | Google Drive | — | ❌ Link 404 / cần quyền truy cập |
| A13 | Bầu Cử Mỹ & Ảnh Hưởng Kinh Tế | **Cloudflare R2** | `r2.dev/videos/ads/election-impact.mp4` | ✅ Live · Pinned |
| A14 | Social Media Ads Campaign | **Cloudflare R2** | — | ⚠️ File trên R2, chưa thêm vào code |

**Files đã upload lên R2** (trong bucket `eddie-portfolio/videos/ads/`):
- `election-impact.mp4` — 993 MB
- `facebook-marketing.mp4` — 398 MB
- `health-insurance-us.mp4` — 99 MB
- `premium-creative-showcase.mp4` — 114 MB
- `social-campaign.mp4` — 226 MB

---

## 2. Social Content

### Creative Edit (SC) — badge: `#creative`

| ID | Title | Views | Likes | Local File | Status |
|---|---|---|---|---|---|
| SC01 | Creative Highlight Reel | — | — | `creative-1.mp4` | ✅ Pinned |
| SC02 | Creative Edit 2 | 3.1K | 35 | `snaptik_7289283048263191809_v3.mp4` | ✅ Live |
| SC03 | Creative Edit 3 | 277 | 8 | `snaptik_7300958195294489858_v3.mp4` | ✅ Live |
| SC04 | Creative Edit 4 | 2.1K | 31 | `snaptik_7302436708748938497_v3.mp4` | ✅ Live |
| SC05 | Creative Edit 5 | 525 | 15 | `snaptik_7308917956921019650_v3.mp4` | ✅ Live |
| SC06 | Creative Edit 6 | 746 | 26 | `snaptik_7330830373611654401_v3.mp4` | ✅ Live |
| SC07 | Best Creative Edit | 1.6K | 19 | `snaptik_7355280291772026113_v3.mp4` | ✅ Live |
| SC08 | Creative Edit 8 | 2K | 24 | `snaptik_7356411909618388225_v3.mp4` | ✅ Live |
| SC09 | Creative Edit 9 | — | — | `snaptik_7364192390191516944_v3.mp4` | ✅ Live |
| SC10 | Creative Edit 10 | — | — | `snaptik_7367202055791938832_v3.mp4` | ✅ Live |
| SC11 | Creative Edit 11 | — | — | `snaptik_7387701528980720903_v3.mp4` | ✅ Live |
| SC12 | Creative Edit 12 | — | — | `snaptik_7397244836404808976_v3.mp4` | ✅ Live |
| SC13 | Creative Edit 13 | — | — | `snaptik_7417639368162036999_v3.mp4` | ✅ Live |
| SC14 | Creative Edit 14 | — | — | `snaptik_7422830191086505223_v3.mp4` | ✅ Live |
| SC15 | Creative Edit 15 | — | — | `snaptik_7491163055879900433_v3.mp4` | ✅ Live |

### Organic / Viral Content (SV) — Tab: Organic Content

| ID | Title | Views | Likes | Local File | Status |
|---|---|---|---|---|---|
| SV01 | Trump Đắc Cử | **2.7M** | 56.6K | `2.7M View.mp4` | ✅ Pinned |
| SV02 | Trục Xuất Khỏi Cali | 1.2M | 23K | `snaptik_7386935211629514004_v3.mp4` | ✅ Live |
| SV03 | Lạm Phát 2024 | 792K | 12.5K | `snaptik_7372038883313306881_v3.mp4` | ✅ Live |
| SV04 | Bầu Cử Mỹ (Extra) | 199K | 10.5K | `snaptik_7408827999082056980_v3.mp4` | ✅ Live |
| SV05 | Quyền Lực Đô La | 255K | 6.7K | `snaptik_7386501994254470408_v3.mp4` | ✅ Live |
| SV06 | Xu Hướng Kinh Tế | 186K | 3.8K | `snaptik_7354178644236913937_v3.mp4` | ✅ Live |
| SV07 | Năng Lượng & Thị Trường | 173K | 2.8K | `snaptik_7413933726838639880_v3.mp4` | ✅ Live |
| SV08 | Tech Bubble | 44K | 392 | `snaptik_7621366157378866449_v3.mp4` | ✅ Live |
| SV09 | Phố Wall | 169K | 905 | `snaptik_7491494904711875856_v3.mp4` | ✅ Live |
| SV10 | Lãi Suất FED | 164K | 3.6K | `snaptik_7586504763848609045_v3.mp4` | ✅ Live |
| SV11 | Tại Sao Tỷ Phú Ủng Hộ Trump | 418K | 6.5K | `Tại Sao Các Tỷ Phú Mỹ Ủng Hộ Trump.mp4` | ✅ Live |
| SV12 | Có 3 Bằng Cấp - Hãy Qua Mỹ | 95K | 1.2K | `Có 3 Bằng Cấp Này - Hãy Qua Mỹ.mp4` | ✅ Live |
| SV13 | Ảnh Hưởng Hóa Chất Thợ Nails | 87K | 1.4K | `Ảnh hưởng hóa chất lên thợ nails Việt tại Mỹ.mp4` | ✅ Live |
| SV14 | Sang Mỹ Làm Người Nghèo? | 331K | 4.7K | `Sang Mỹ Làm Người Nghèo-.mp4` | ✅ Live |
| SV15 | Viral Report 15 | 120K | 2.1K | `viral-4.mp4` | ✅ Live |
| SV16 | Viral Report 16 | 108K | 1.8K | `viral-5.mp4` | ✅ Live |
| SV17 | Viral Report 17 | 142K | 2.3K | `viral-extra-1.mp4` | ✅ Live |
| SV18 | Viral Report 18 | 131K | 1.9K | `viral-extra-2.mp4` | ✅ Live |
| SV19 | Viral Report 19 | 98K | 1.5K | `viral-extra-3.mp4` | ✅ Live |
| SV20 | Việt Kiều & VN Nghèo | 418K | 6.5K | `viral-1.mp4` | ✅ Live |

---

## 3. AI Reels Hub (Facebook UGC)

| ID | Topic | Views | Likes | Link | Status |
|---|---|---|---|---|---|
| R01 | Việt Kiều & VN Nghèo | 418K | 6.5K | [FB Reel](https://www.facebook.com/reel/1555597019254172) | ✅ Live |
| R02 | Sang Mỹ Làm Người Nghèo? | 331K | 4.7K | [FB Reel](https://www.facebook.com/reel/1859098374750947) | ✅ Live |
| R03 | Ai Cũng Thích Qua Mỹ? | 275K | 2.7K | [FB Reel](https://www.facebook.com/reel/25256283237337349) | ✅ Live |
| R04 | Lời Khuyên Người Việt | 213K | 3K | [FB Reel](https://www.facebook.com/reel/1193408759530975) | ✅ Live |
| R05 | Ở Mỹ Buồn Lắm | 175K | 2.1K | [FB Reel](https://www.facebook.com/reel/1917627699169217) | ✅ Live |
| R06 | Nghề Bạc Nhất Nước Mỹ | 103K | 767 | [FB Reel](https://www.facebook.com/reel/1558486685278221) | ✅ Live |

---

## Action Items

| Ưu tiên | Việc cần làm |
|---|---|
| 🔴 Cao | **A10, A11, A14**: File đã có trên R2, cần thêm entry vào `video-post.ts` để hiển thị trên portfolio |
| 🔴 Cao | **A12**: Link Google Drive bị 404 — cần upload lên R2 hoặc xoá khỏi tracking |
| 🟡 Trung bình | **A04–A08**: Đang có YouTube URL, cân nhắc thêm vào code nếu muốn hiển thị |
| 🟢 Thấp | Cân nhắc thêm custom domain cho R2 bucket để thay thế URL `r2.dev` (không recommended cho production) |

---

*Cập nhật: 13/05/2026 — sau khi migrate video ads sang Cloudflare R2 và push GitHub thành công*
