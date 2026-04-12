# UPDATES LOG — Eddie Portfolio V3

> Ghi lại toàn bộ thay đổi theo thứ tự mới nhất ở trên.
> Mỗi khi có update mới, thêm entry vào đầu danh sách.

---

## [2026-03-18] Navigation + Overview + Work Section

**Files**: `Navigation.tsx`, `Overview.tsx`, `Work.tsx`, `VideoCarousel3D.tsx`, `services.ts`

### Navigation — Active State + Glow Border
- Active section tracking với `IntersectionObserver`
- Active dot indicator (chấm đỏ, `layoutId` Framer Motion)
- Glow border line chạy quanh viền nav khi scroll (RAF-based)
- Nav luôn hiển thị — bỏ hide-on-scroll
- Smooth scroll fix: `scrollIntoView({ behavior: 'smooth' })`
- Mobile menu: smooth scroll + tự đóng sau click

### Overview — Shader Line dưới Hero Image
- Animated shader line: tia sáng gradient đỏ-trắng-đỏ quét trái → phải, loop (`repeatDelay: 0.8s`)
- Glow ellipse pulse đồng bộ với tia sáng

### Work Section — Rename + VideoCarousel3D Redesign
- Rename: `04-Services/Services.tsx` → `04-Work/Work.tsx`
- VideoCarousel3D viết lại hoàn toàn:
  - Coverflow 3D — 6 cards, center card nổi bật (scale 1.0), side cards mờ dần (rotateY ±42°)
  - Click trực tiếp từng card (pan surface `z-0`, card `z-10`)
  - Auto-rotate 4s, reset khi user tương tác
  - Keyboard nav: `ArrowLeft/Right` + `Escape`
  - Swipe/drag: `onPanEnd` detect offset > 60px
  - Detail panel dưới carousel: description, client, views, tags, CTA
  - Dot navigation: 6 dots, active → pill đỏ
  - Accent glow border trên center card

### Work Images Fix
- Fix 4 image paths trỏ tới file không tồn tại trong `services.ts`
- Map lại với file thực tế trong `/public/images/services/`

**Trạng thái**: ✅ Hoàn thành

---

## [2026-03-17] Case Study Content Improvements

**File**: `src/data/casestudy.ts`

- Section 1 (Context): Viết lại body text, thêm narrative hook "That gap was the opportunity"
- Section 2 (Challenge): Rút 4 bullets → 3 bullets ngắn
- Section 3 (System): Condensed 4 bullets, giữ title rõ ràng
- Section 4 (Scaling): Thêm `closingLine` kết nối views → business value
- Section 5 (Results): **MỚI** — tổng kết journey $2M → $6M, RevenueChart, 3 stats, closingLine
- Link 5 ảnh section vào data (context/challenge/system/scaling/results.png)

**Trạng thái**: ✅ Hoàn thành

---

## [2026-03-17] Navigation Scroll Effects

**File**: `src/components/00-Navigation/Navigation.tsx`

- Hide on scroll down / Show on scroll up
- Nền đậm dần (glass → solid) bằng 2-layer system
- Logo thu nhỏ mượt khi scroll (1.0 → 0.92)
- Nav scale thu nhỏ nhẹ (1.0 → 0.98)
- Shadow tăng dần theo scroll
- Framer Motion: `useScroll`, `useTransform`, `useSpring`, `useMotionValueEvent`
- Spring config: `{ damping: 30, stiffness: 200 }`
- Guard: không ẩn nav khi mobile menu đang mở

**Trạng thái**: ✅ Hoàn thành
