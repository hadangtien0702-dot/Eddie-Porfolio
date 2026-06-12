# 🔤 FONT AUDIT — Eddie Portfolio V3.2

> Ngày kiểm tra: 2026-06-12 · Phạm vi: toàn bộ `src/` (8 trang, 35+ components)
> Trạng thái: ✅ Đạt · ⚠️ Cần sửa · ❌ Nghiêm trọng · 🧹 Dọn dẹp

---

## 1. KIỂM KÊ FONT ĐANG DÙNG

| # | Font | Vai trò | Nguồn | Weights | Trạng thái |
|---|------|---------|-------|---------|------------|
| 1 | **Be Vietnam Pro** | Heading (`--font-heading`) | Google Fonts (next/font) | 400–900 (6 weights) | ✅ Khai báo chuẩn, có subset `vietnamese`, `display: swap` |
| 2 | **Inter Display** | Body (`--font-body`) | Local TTF (next/font/local) | 400/500/600/700 (4 weights) | ⚠️ Xem mục 2.2, 2.3, 2.5 |
| 3 | **font-mono** (không khai báo) | Labels, stats, overline | ❌ KHÔNG TỒN TẠI → fallback hệ điều hành | — | ❌ Xem mục 2.1 |
| 4 | **font-sans** (không khai báo) | Mockup trong case study | Fallback Tailwind default | — | ⚠️ Xem mục 2.4 |
| 5 | **Clash Display** | Không dùng | 6 file OTF nằm chết trong `assets/fonts/` | — | 🧹 Xem mục 2.6 |

**Khai báo tại:** [layout.tsx](../src/app/layout.tsx) (dòng 13–45) · Token tại [globals.css](../src/app/globals.css) (dòng 29–30, 71–72)

---

## 2. DANH SÁCH VẤN ĐỀ (theo độ ưu tiên)

### ❌ 2.1 — `font-mono` được dùng 335 lần nhưng KHÔNG khai báo font mono nào
- **Phạm vi:** 28 files (nặng nhất: `web-forum-design/page.tsx` ×41, `WorkVideoEditor.tsx` ×41, `AIUseCaseCards.tsx` ×32, `AICaseStudy.tsx` ×30)
- **Hậu quả:** Mỗi hệ điều hành render một kiểu — Windows ra Consolas, macOS ra SF Mono, Android ra Roboto Mono. Phần label/số liệu (linh hồn của portfolio production) trông khác nhau trên mỗi máy người xem.
- **Cách sửa:** Khai báo 1 font mono chính thức qua `next/font` (gợi ý: JetBrains Mono / Space Mono / IBM Plex Mono) → map vào `--font-mono` trong `@theme`.
- [x] Đã sửa — **JetBrains Mono** (subset latin + vietnamese, weight 400–800) khai báo trong `layout.tsx`, map `--font-mono` trong `globals.css` (2026-06-12)

### ⚠️ 2.2 — Dùng weight chưa được load (130 chỗ, 24 files)
- `font-black` (900), `font-extrabold` (800), `font-light` (300), `font-thin` (100) xuất hiện 130 lần.
- **Inter Display chỉ load 400/500/600/700** → chữ body/mono gắn `font-black` bị browser ép về 700 hoặc giả lập (faux bold) → nét chữ không đúng thiết kế.
- `font-heading` (Be Vietnam Pro có 900) thì OK ✅. Vấn đề nằm ở text body + mono.
- **Ví dụ:** `VideoCarousel3D.tsx:385` — số liệu CPA dùng `font-black` trên Inter Display.
- **Cách sửa:** Load thêm weight 800/900 cho Inter Display, HOẶC đổi các chỗ đó sang `font-bold`/`font-heading`.
- [x] Đã sửa — Inter Display giờ load đủ 6 weight 400/500/600/700/800/900 (2026-06-12). Lưu ý: `font-light`/`font-thin` (300/100) vẫn chưa có file — sẽ render 400; rà sau nếu cần.

### ⚠️ 2.3 — Inter Display load bằng file TTF (~1.6MB cho 4 weights)
- TTF không nén. Chuyển sang **WOFF2** giảm ~60–70% dung lượng (≈ còn 400–500KB).
- Liên quan rule `font-loading` + `image-optimization` (Performance — HIGH).
- **Cách sửa:** Convert 4 file TTF → WOFF2, đổi `path` trong `layout.tsx`.
- [x] Đã sửa — 6 weight convert sang WOFF2 (~135KB/file, giảm 66%), `layout.tsx` đã trỏ sang .woff2 (2026-06-12). File TTF gốc vẫn giữ trong `assets/fonts/` làm master.

### ⚠️ 2.4 — `font-sans` rơi về font hệ thống (28 chỗ, 5 files)
- Tailwind `font-sans` mặc định = system stack, KHÔNG phải Inter Display.
- Đa số nằm trong mockup case study (mô phỏng brand khách hàng — có thể chủ đích), nhưng nên rà từng chỗ: nếu là UI thật của portfolio → bỏ class hoặc đổi thành `font-body`.
- Files: `SocialPlayerLayout.tsx` (×18), `web-forum-design/page.tsx` (×7), còn lại ×1–2.
- [ ] Đã rà soát

### ⚠️ 2.5 — Body text 15px, dưới chuẩn 16px mobile
- `--font-size-body: 15px` ([globals.css:82](../src/app/globals.css)) — rule `readable-font-size` khuyến nghị ≥16px trên mobile (tránh iOS auto-zoom khi focus input).
- Portfolio ít form nên mức nghiêm trọng thấp, nhưng nếu trang Contact có input → cần ≥16px cho input.
- [ ] Đã cân nhắc

### 🧹 2.6 — Clash Display: 6 file OTF (~158KB) nằm chết
- Chỉ được nhắc trong comment `casestudy.ts:42`, không load ở đâu cả.
- **Quyết định:** Xoá khỏi `assets/fonts/`, HOẶC dùng thật (skill xếp Clash Display vào cặp "Startup Bold" — hợp creative portfolio nếu muốn nâng cấp heading).
- [ ] Đã quyết định

---

## 3. ĐÁNH GIÁ CẶP FONT HIỆN TẠI (đối chiếu skill ui-ux-pro-max)

| Tiêu chí | Hiện tại | Skill khuyến nghị | Kết luận |
|----------|----------|-------------------|----------|
| Cặp font | Be Vietnam Pro + Inter Display | Archivo + Space Grotesk ("Minimalist Portfolio") hoặc Clash Display + Satoshi ("Startup Bold") | Cặp hiện tại **chấp nhận được** — cùng họ grotesque hiện đại, sạch |
| Hỗ trợ tiếng Việt | ✅ Cả 2 font đều có glyph tiếng Việt | — | Lợi thế lớn, KHÔNG nên đổi vì lý do này |
| Cá tính heading | Be Vietnam Pro khá trung tính | Space Grotesk / Clash Display có cá tính hơn cho dân creative | Tuỳ chọn nâng cấp, không bắt buộc |
| Inter **Display** cho body 15px | ⚠️ Bản "Display" được tối ưu cho cỡ chữ LỚN (≥28px), không phải body nhỏ | — | Cân nhắc dùng Inter thường cho body, giữ Inter Display cho số liệu to |

**Kết luận tổng:** Không cần đổi bộ nhận diện font. Ưu tiên sửa 2.1 (mono) → 2.2 (weights) → 2.3 (WOFF2).

---

## 4. BẢNG TRACKING THEO TRANG (để rà không sót)

| Trang / Route | font-mono | weight lạ | font-sans | Đã rà |
|---------------|-----------|-----------|-----------|-------|
| `/` (Home — page.tsx) | qua components | qua components | — | [ ] |
| `/ai` | ×6 | ×6 | — | [ ] |
| `/casestudy/[id]` | qua components | qua components | — | [ ] |
| `/work/ai-applications` | ×10 | ×3 | — | [ ] |
| `/work/setup-and-build` | ×6 | ×2 | — | [ ] |
| `/work/social-post` | ×1 | — | — | [ ] |
| `/work/video-editor` | ×6 | — | — | [ ] |
| `/work/web-forum-design` | ×41 | ×7 | ×7 | [ ] |

| Component nhóm | Files có vấn đề | Đã rà |
|----------------|------------------|-------|
| 00-Navigation | Navigation.tsx | [ ] |
| 01-Impact | ImpactNumbers.tsx | [ ] |
| 02-Overview | Overview.tsx (weight ×4) | [ ] |
| 03-CaseStudy | CaseStudy, CaseStudyCharts (mono ×12), CaseStudyLayouts (weight ×8), CaseStudyGalleries, CaseStudyModals, MyRole | [ ] |
| 04-Work | VideoCarousel3D (weight ×12), SocialGrid (mono ×13), SocialPlayerLayout (sans ×18), WorkVideoEditor (mono ×41), AdsPlayerLayout, ViralWall, SocialHUDLightbox, SocialRadar, Work, WorkAI, WorkSocial, WorkSetupWebsite | [ ] |
| 05-AI | AICaseStudy (mono ×30), AIUseCaseCards (mono ×32, weight ×16), AITimelineEditor, AutomationFlowDiagram, AIWorkflowDashboard | [ ] |
| 05-Showreel | Showreel.tsx | [ ] |
| 06-Contact | Contact.tsx | [ ] |
| 07-Footer | Footer.tsx | [ ] |

🗑️ **Bonus:** `WorkVideoEditor_old.tsx` — file cũ còn sót, cân nhắc xoá.

---

## 5. THỨ TỰ HÀNH ĐỘNG ĐỀ XUẤT

1. [ ] **Khai báo font mono chính thức** (sửa 1 file `layout.tsx` + `globals.css` → fix 335 chỗ cùng lúc)
2. [ ] **Load thêm Inter Display weight 800/900** hoặc quy đổi `font-black` → `font-bold` ở body text
3. [ ] **Convert TTF → WOFF2** (tiết kiệm ~1MB)
4. [ ] **Rà 28 chỗ `font-sans`** — giữ nếu là mockup brand khách, đổi nếu là UI thật
5. [ ] **Xoá hoặc dùng Clash Display** + xoá `WorkVideoEditor_old.tsx`
6. [ ] **Kiểm tra input ≥16px** ở Contact (nếu có form)
