# RULES — Eddie Portfolio V3

> Tài liệu này mô tả toàn bộ quy tắc, convention, và design system cho dự án portfolio.
> Mọi file mới hoặc chỉnh sửa **phải** tuân theo các quy tắc dưới đây.

- Porfolio này hiện tại đang được thiết kế dành cho 1 người là Eddie đang đảm nhiện vị trí truyền thông đa phương tiện

---

## 1. Tech Stack

| Layer      | Công nghệ                                      |
| ---------- | ---------------------------------------------- |
| Framework  | **Next.js 16** (App Router)                    |
| UI Library | **React 19**                                   |
| Language   | **TypeScript** (strict mode)                   |
| Styling    | **Tailwind CSS 4** (`@import "tailwindcss"`)   |
| Animation  | **Framer Motion** (`framer-motion`)            |
| Image      | `next/image` — **luôn** dùng `Image` component |
| Font       | `next/font/google` + `next/font/local`         |
| Hosting    | Vercel                                         |

---

## 2. Cấu Trúc Thư Mục

```
src/
├── app/                          # App Router — layout, page, globals.css
│   ├── globals.css               # Design tokens + Tailwind v4 @theme
│   ├── layout.tsx                # Root layout — font, metadata
│   └── page.tsx                  # Trang chủ — import & sắp xếp sections
├── components/                   # Các section component
│   ├── 00-Navigation/            # Thanh điều hướng
│   ├── 01-Impact/                # Hero / Impact
│   ├── 02-Overview/              # Giới thiệu bản thân
│   ├── 03-CaseStudy/             # Case study thực tế
│   ├── 04-Services/              # Dịch vụ / Năng lực
│   ├── 05-Showreel/              # Video reel
│   ├── 06-Contact/               # CTA liên hệ
│   └── 07-Footer/                # Footer
└── data/                         # Data files — tách logic khỏi UI
    ├── navigation.ts
    ├── overview.ts
    ├── casestudy.ts
    ├── services.ts
    └── contact.ts

public/
├── fonts/                        # Local fonts (Clash Display .otf)
└── images/                       # Hình ảnh tĩnh
```

### Quy tắc cấu trúc:

- **Component folder**: đánh số prefix `XX-TenSection` (ví dụ: `04-Services/`)
- **Mỗi folder chỉ chứa 1 file `.tsx`** có tên trùng với tên folder
- **Data tách riêng**: mọi nội dung, danh sách, text đều nằm trong `src/data/`
- **Import alias**: sử dụng `@/` thay vì relative path (`@/components/...`, `@/data/...`)

---

## 3. Color System — Brand Palette

| Token                    | Hex       | Vai trò                 |
| ------------------------ | --------- | ----------------------- |
| `--color-primary`        | `#040404` | Nền chính (Deep Black)  |
| `--color-surface`        | `#0e0e0e` | Nền phụ (Surface)       |
| `--color-elevated`       | `#181818` | Nền nổi (Card/Modal)    |
| `--color-accent`         | `#ff4000` | Accent (Kinetic Orange) |
| `--color-accent-warm`    | `#ff4000` | Accent warm             |
| `--color-text-primary`   | `#fbfbfb` | Text chính (Pure White) |
| `--color-text-secondary` | `#dedede` | Text phụ                |
| `--color-text-muted`     | `#6b6b6b` | Text mờ (caption/label) |
| `--color-grey`           | `#dedede` | Neutral Grey            |
| `--color-border`         | `#262626` | Viền chính              |
| `--color-border-subtle`  | `#1a1a1a` | Viền mờ                 |

### Gradient tokens:

- `--gradient-hero` — Hero background (orange → black)
- `--gradient-cta` — CTA button (orange → dark orange)
- `--gradient-card-hover` — Card hover effect
- `--gradient-text` — Text gradient (white → orange)
- `--gradient-glow` — Radial glow effect

> **Lưu ý:** Tất cả màu phải dùng qua CSS custom properties hoặc Tailwind class (`bg-primary`, `text-accent`, ...). **Không hard-code hex** trực tiếp trong component trừ trường hợp đặc biệt.

---

## 4. Typography

### Font Family:

| Vai trò | Font              | CSS Variable     | Tailwind Class |
| ------- | ----------------- | ---------------- | -------------- |
| Heading | **Clash Display** | `--font-heading` | `font-heading` |
| Body    | **Inter**         | `--font-body`    | `font-body`    |

### Font Size Scale (Responsive):

| Token                | Value                    | Dùng cho         |
| -------------------- | ------------------------ | ---------------- |
| `font-size-display`  | `clamp(60px, 8vw, 96px)` | Hero headline    |
| `font-size-h1`       | `clamp(40px, 5vw, 64px)` | Section headline |
| `font-size-h2`       | `clamp(28px, 3vw, 40px)` | Sub-headline     |
| `font-size-h3`       | `clamp(20px, 2vw, 28px)` | Card title       |
| `font-size-h4`       | `18px`                   | Label            |
| `font-size-h5`       | `16px`                   | Small label      |
| `font-size-body-lg`  | `18px`                   | Body large       |
| `font-size-body`     | `16px`                   | Body default     |
| `font-size-caption`  | `14px`                   | Caption          |
| `font-size-overline` | `12px`                   | Overline / tag   |
| `font-size-stat`     | `clamp(36px, 5vw, 72px)` | Stat number      |

### Quy tắc chung:

- **Heading (H1–H3)**: Clash Display, `font-bold` hoặc `font-semibold`, `tracking-[-0.03em]`
- **Body / Caption**: Inter, `leading-[1.6]` → `leading-[1.7]`
- **Responsive**: luôn dùng `clamp()` cho font size heading

---

## 5. Spacing & Layout

| Token                      | Value   | Mô tả                        |
| -------------------------- | ------- | ---------------------------- |
| `--spacing-section`        | `120px` | Khoảng cách giữa các section |
| `--spacing-section-mobile` | `80px`  | Section spacing trên mobile  |

### Container:

- Max-width: `1400px`
- Padding: `px-6 md:px-12 lg:px-16`
- Center: `mx-auto`

### Section pattern:

```tsx
<section id="section-id" className="relative w-full overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-section">
    {/* Section content */}
  </div>
</section>
```

---

## 6. Animation — Framer Motion

### Easing mặc định:

```ts
const EASE_SMOOTH = [0.22, 1, 0.36, 1]; // CSS: cubic-bezier(0.22, 1, 0.36, 1)
```

### Pattern chuẩn — Fade + Slide Up:

```tsx
<motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
>
```

### Quy tắc animation:

- Dùng `useInView` với `{ once: true, margin: "-80px" }` để trigger khi scroll vào
- Stagger delay cho các item trong list: `delay: 0.5 + i * 0.1`
- `AnimatePresence` cho enter/exit animation
- Layout animation: dùng `layout` prop trên `motion.*`
- **Chỉ animate** `opacity`, `transform (y, scale)` — tránh animate `width`, `height`

---

## 7. Component Convention

### File header:

```tsx
"use client"; // Bắt buộc nếu component dùng hook/event

// ─── Section Name ───
// Mô tả: Mục đích của section
// Data: import từ data/xxx.ts
```

### Export:

- **Default export** cho mỗi section component
- **Named export** cho data types và data arrays

### Naming:

| Loại           | Convention       | Ví dụ                  |
| -------------- | ---------------- | ---------------------- |
| Component file | `PascalCase.tsx` | `Services.tsx`         |
| Data file      | `camelCase.ts`   | `casestudy.ts`         |
| Folder         | `XX-PascalCase`  | `04-Services`          |
| Interface/Type | `PascalCase`     | `Service`, `CaseStudy` |
| CSS Variable   | `--kebab-case`   | `--color-accent`       |
| Section ID     | `kebab-case`     | `id="case-study"`      |

### Component structure:

1. `"use client"` directive (nếu cần)
2. Comment header (`// ─── ... ───`)
3. Imports (React → Framer Motion → Next.js → Data)
4. Component function với `useRef`, `useInView`
5. JSX return: `<section>` → container div → animated content

---

## 8. Data Layer

- **Mọi nội dung text, danh sách** đều đặt trong `src/data/*.ts`
- **Luôn export interface** cho mỗi data type
- **Comment header** mô tả mục đích và fields
- **Không hard-code** nội dung trong component

```ts
// ─── Section Data ───
// Mô tả: Dữ liệu cho section XYZ
// Fields: id, title, ...

export interface SectionItem {
  id: string;
  title: string;
  // ...
}

export const sectionItems: SectionItem[] = [
  // ...
];
```

---

## 9. Image & Asset

- **Luôn dùng** `next/image` (`Image` component) — không dùng `<img>`
- **Props bắt buộc**: `alt`, `fill` hoặc `width`+`height`, `sizes`
- **Đường dẫn**: `/images/folder/filename.ext` (relative to `public/`)
- **Định dạng ưu tiên**: `.webp` > `.jpg` > `.png`
- **Font files**: đặt trong `public/fonts/`

---

## 10. Tailwind CSS 4

### Cấu hình trong `globals.css`:

```css
@import "tailwindcss";

@theme inline {
  /* Map brand tokens cho Tailwind classes */
  --color-primary: #040404;
  --color-accent: #ff4000;
  --font-heading: var(--font-clash), system-ui, sans-serif;
  /* ... */
}
```

### Quy tắc:

- Dùng `@theme inline` thay vì `tailwind.config.ts` (Tailwind v4 convention)
- Custom class → dùng CSS variable: `bg-primary`, `text-accent`, `font-heading`
- Responsive prefix: `md:`, `lg:` — Mobile-first
- Arbitrary value: `text-[13px]`, `max-w-[1400px]` khi không có utility sẵn

---

## 11. SEO & Accessibility

- `<html lang="vi">` — ngôn ngữ tiếng Việt
- **Metadata** export trong `layout.tsx` (title, description)
- **Semantic HTML**: dùng `<section>`, `<nav>`, `<main>`, `<footer>`
- **Mỗi section** có `id` duy nhất cho anchor navigation
- **Alt text** bắt buộc cho mọi hình ảnh
- **Heading hierarchy**: chỉ 1 `<h1>` trên toàn trang, tiếp theo `<h2>`, `<h3>`

---

## 12. Coding Style & Comment

- **Ngôn ngữ comment**: Tiếng Việt cho mô tả, tiếng Anh cho code
- **Section divider**: `// ─── Section Name ───`
- **Inline comment**: giải thích logic phức tạp, không comment hiển nhiên
- **Không dùng `any`** — luôn type rõ ràng
- **Strict mode**: `tsconfig.json` đã bật `"strict": true`

---

## 13. Narrative Flow — Thứ tự các section

```
Navigation  →  Overview (Tôi là ai)
            →  Case Study (Chứng minh bằng case thực tế)
            →  Services / Work (Tôi làm được gì)
            →  Showreel (Demo chiến lược video)
            →  Contact (CTA liên hệ)
            →  Footer
```

> Khi thêm section mới, giữ đúng narrative flow và cập nhật số prefix.

---

## 14. Git & Deploy

- **Branch chính**: `main`
- **Commit message**: tiếng Anh, dạng imperative (`Add services section`, `Fix nav animation`)
- **Deploy**: tự động qua Vercel khi push lên `main`
- **`.gitignore`**: đã cấu hình cho Next.js (node_modules, .next, ...)

---

## 15. Multi-Tool Collaboration — Claude Code + Antigravity

> Dự án này được phát triển đồng thời bằng **Claude Code** (CLI terminal) và **Antigravity** (AI code editor).
> Mọi AI tool tham gia **phải** tuân theo cùng bộ quy tắc dưới đây để tránh conflict, code rác, và lỗi chồng chéo.

### 15.1 Nguyên tắc cốt lõi

| Quy tắc                    | Mô tả                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Single Source of Truth** | File `RULES.md` này là tài liệu duy nhất quy định convention — cả hai tool đều phải đọc và tuân theo                   |
| **Cùng tech stack**        | Next.js 16 + React 19 + TypeScript strict + Tailwind CSS 4 + Framer Motion — **không tool nào được tự ý thêm library** |
| **Cùng cấu trúc folder**   | Tuân theo Section 2 — không tạo folder/file ngoài quy ước                                                              |
| **Cùng design tokens**     | Dùng CSS variables và Tailwind classes từ Section 3, 4, 10 — không hard-code giá trị                                   |
| **Cùng coding style**      | Comment tiếng Việt, section divider, no `any`, strict mode — theo Section 7, 8, 12                                     |

### 15.2 Phân vùng làm việc — Không chồng chéo

**Nguyên tắc #1: Mỗi thời điểm, chỉ 1 tool edit 1 file.**

Không bao giờ để cả Claude Code và Antigravity cùng sửa một file song song. Quy trình:

```
1. Tool A sửa file → Save → Commit (hoặc ít nhất save)
2. Tool B mới được phép mở và sửa file đó
```

**Nguyên tắc #2: Phân chia theo section folder.**

Cách tốt nhất để tránh conflict là phân công rõ ràng theo folder:

```
Ví dụ một phiên làm việc:
├── Claude Code  → đang làm 04-Services/ + data/services.ts
├── Antigravity  → đang làm 06-Contact/ + data/contact.ts
└── KHÔNG ai đụng vào file của người kia cho đến khi xong
```

**Nguyên tắc #3: File dùng chung — chỉ 1 tool sửa tại 1 thời điểm.**

Các file dùng chung (shared files) cần đặc biệt cẩn thận:

| File          | Loại      | Quy tắc                                                 |
| ------------- | --------- | ------------------------------------------------------- |
| `page.tsx`    | Shared    | Chỉ sửa khi thêm/xóa section — 1 tool duy nhất sửa      |
| `globals.css` | Shared    | Chỉ sửa khi thêm design token mới — 1 tool duy nhất sửa |
| `layout.tsx`  | Shared    | Hiếm khi sửa — 1 tool duy nhất sửa                      |
| `RULES.md`    | Read-only | Cả hai tool đều ĐỌC, không tool nào tự sửa              |

### 15.3 Git Workflow — Lưới an toàn bắt buộc

```bash
# ─── Trước khi bắt đầu làm việc ───
git pull origin main                    # Luôn pull code mới nhất

# ─── Sau mỗi task nhỏ hoàn thành ───
git add .
git commit -m "Add services section"    # Commit message tiếng Anh, imperative
# → Tool còn lại pull trước khi tiếp tục

# ─── Khi có conflict ───
git diff                                # Xem thay đổi
git stash                               # Tạm cất nếu cần
git pull --rebase origin main           # Rebase thay vì merge để log sạch
git stash pop                           # Lấy lại thay đổi
# → Fix conflict thủ công nếu có
```

**Quy tắc commit:**

| Hành động        | Commit message format           | Ví dụ                      |
| ---------------- | ------------------------------- | -------------------------- |
| Thêm section mới | `Add [section-name] section`    | `Add services section`     |
| Sửa UI           | `Fix [component] [issue]`       | `Fix nav mobile menu`      |
| Sửa data         | `Update [data-file] content`    | `Update casestudy data`    |
| Sửa animation    | `Improve [component] animation` | `Improve hero parallax`    |
| Refactor         | `Refactor [component/area]`     | `Refactor overview layout` |

### 15.4 Quy tắc output — Đảm bảo code đồng nhất

Cả hai tool phải xuất code có cùng format:

```tsx
// ✅ ĐÚNG — Cả hai tool đều phải output như thế này
"use client";

// ─── Services Section ───
// Mô tả: Hiển thị danh sách dịch vụ
// Data: import từ data/services.ts

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/data/services";

export default function Services() {
  // ─── Scroll Animation ───
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-section">
        {/* Nội dung section */}
      </div>
    </section>
  );
}
```

```tsx
// ❌ SAI — Những lỗi phổ biến mà AI tool hay tạo ra
// Thiếu "use client"
// Thiếu comment header tiếng Việt
// Hard-code text trong JSX thay vì import từ data/
// Dùng <img> thay vì <Image> từ next/image
// Dùng hex color trực tiếp: style={{ color: "#ff4000" }}
// Dùng thư viện ngoài không có trong tech stack
// Export named thay vì export default
```

### 15.5 Checklist trước khi chuyển giao giữa hai tool

Khi Tool A hoàn thành và Tool B tiếp quản:

- [ ] Code đã save và commit với message rõ ràng
- [ ] Không có file tạm, console.log debug, hay code commented-out thừa
- [ ] `npm run build` hoặc `npx tsc --noEmit` không có lỗi TypeScript
- [ ] Cấu trúc folder đúng theo Section 2
- [ ] Không có dependency mới được thêm vào `package.json` mà chưa thông báo
- [ ] File dùng chung (`page.tsx`, `globals.css`) chỉ thay đổi nếu cần thiết
- [ ] Comment tiếng Việt đầy đủ cho code mới

### 15.6 Xử lý conflict

**Khi phát hiện conflict:**

```
1. DỪNG LẠI — không force push hoặc overwrite
2. git diff để xem chính xác dòng nào conflict
3. Giữ code mới nhất đã test chạy được
4. Nếu không chắc → hỏi Eddie trước khi resolve
5. Sau khi resolve → chạy build lại để verify
```

**Phòng tránh conflict:**

- Commit nhỏ, commit thường xuyên (mỗi 15-30 phút hoặc mỗi task nhỏ)
- Pull trước khi bắt đầu edit
- Không sửa file dùng chung trừ khi thật sự cần
- Communicate: báo cho Eddie biết đang sửa file nào

### 15.7 Cấu hình cho từng tool

**Claude Code** — File `.claude/settings.json`:

```json
{
  "rules": ["Đọc RULES.md trước khi bắt đầu bất kỳ task nào"],
  "memory": {
    "techStack": "Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion",
    "folderConvention": "XX-PascalCase cho components, camelCase cho data",
    "colorSystem": "CSS variables via @theme inline — không hard-code hex",
    "commentLanguage": "Tiếng Việt cho mô tả, tiếng Anh cho code"
  }
}
```

**Antigravity** — File `.antigravity/rules` hoặc tương đương:

```
- Đọc RULES.md ở root trước mỗi phiên làm việc
- Tech stack: Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion
- Folder: XX-PascalCase components, camelCase data files
- Colors: CSS variables only, không hard-code hex
- Comments: Tiếng Việt, section divider format
- KHÔNG thêm library mới
- KHÔNG sửa file đang được Claude Code sửa
```

### 15.8 Những điều TUYỆT ĐỐI KHÔNG được làm

| #   | Quy tắc cấm                                                 | Lý do                         |
| --- | ----------------------------------------------------------- | ----------------------------- |
| 1   | **KHÔNG** để hai tool edit cùng file cùng lúc               | Gây conflict, mất code        |
| 2   | **KHÔNG** tự thêm dependency/library mà chưa hỏi Eddie      | Phá vỡ tech stack thống nhất  |
| 3   | **KHÔNG** tạo file/folder ngoài quy ước Section 2           | Gây rác, khó quản lý          |
| 4   | **KHÔNG** force push khi có conflict                        | Mất code của tool kia         |
| 5   | **KHÔNG** bỏ qua TypeScript errors                          | Lỗi sẽ tích tụ và khó fix sau |
| 6   | **KHÔNG** sửa `RULES2.md` mà chưa được Eddie cho phép       | Đây là single source of truth |
| 7   | **KHÔNG** để code debug (console.log, TODO hack) khi commit | Code rác cho tool kia         |
| 8   | **KHÔNG** dùng style khác nhau giữa hai tool                | Output phải đồng nhất         |
| 9   | **KHÔNG** sửa file dùng chung mà không commit ngay          | Tool kia sẽ pull version cũ   |
| 10  | **KHÔNG** assume tool kia đã pull — luôn nhắc Eddie sync    | Tránh work trên code cũ       |

---

## Checklist khi tạo Component mới

- [ ] Tạo folder `XX-ComponentName/ComponentName.tsx`
- [ ] Tạo data file `src/data/componentname.ts` nếu có nội dung
- [ ] Thêm `"use client"` nếu dùng hook/event
- [ ] Comment header với `// ─── ... ───`
- [ ] Import data từ `@/data/...`
- [ ] Dùng `useRef` + `useInView` cho scroll animation
- [ ] Wrap trong `<section id="...">` + container `max-w-[1400px]`
- [ ] Dùng Framer Motion với easing `[0.22, 1, 0.36, 1]`
- [ ] Dùng design tokens (CSS variable / Tailwind class)
- [ ] Import vào `page.tsx` đúng thứ tự narrative flow
- [ ] **(Multi-tool)** Commit ngay sau khi hoàn thành
- [ ] **(Multi-tool)** Verify `npx tsc --noEmit` pass trước khi chuyển giao

---

Khi Open trang Local Host - Hãy đảm bảo rằng không có lỗi Console và trang web hiển thị đúng như mong muốn - Nếu có lỗi hãy tự sửa hoặc báo lại cho tôi

---

## Sau khi thay đổi code hoặc tạo code mới không cần DOM, cũng không cần chạy render - tiết kiem Qouta và Credits - Chỉ cần gửi lại link Local Host tôi sẽ tự vào check

## Không được Design có sự lặp lại trong porfolio đây là điều kiên quyết, Luôn luôn đặt tên chuẩn cho các div để dễ truy xuất lỗi khi cần chỉnh sửa

---

## 16. Quy tắc Thiết kế UI/UX Nâng cao (2025-2026 Standard)

> Ràng buộc nghiêm ngặt được bổ sung trong quá trình thiết kế Component mới:

1. **Tính Độc Bản (No Repetition)**: Tuyệt đối không được trùng lặp Design với các Component hoặc Section đã có trước đó. Mỗi section (đặc biệt là Gallery/Showcase) phải là một trải nghiệm độc nhất.
2. **Tiêu chuẩn UI 2025-2026**: KHÔNG sử dụng các component kiểu cũ (cuộn ngang đơn điệu, grid tĩnh cơ bản). Mọi Component mới phải áp dụng các xu hướng tương tác hiện đại nhất (vd: Physics-based animations, Scroll Velocity Skew, Magnetic Hover, Asymmetric Parallax Matrix).

---

## 17. Quy Trình Xử Lý Media (Hình Ảnh & Video) - Tối ưu Hiệu năng

> Ràng buộc nghiêm ngặt về tốc độ tải trang và chất lượng hiển thị hình ảnh/video:

1. **Tối ưu Hình ảnh (Image Compression)**: Hình ảnh cung cấp phải được nén đúng định dạng (ưu tiên .webp) và chia tỷ lệ (scale) phù hợp với khung hiển thị thực tế trên web trước khi code nhúng vào dự án.
2. **Tối ưu Video (Video Compression)**: Video nhúng vào web bắt buộc phải nén và giảm bitrate ở mức vừa phải để dung lượng cực nhẹ nhưng KHÔNG được làm vỡ hạt, đảm bảo giữ chất lượng rõ nét.
3. **Mục tiêu Cuối cùng (Core Goal)**: Website phải đạt tốc độ load SIÊU NHANH nhưng Hình ảnh và Video vẫn phải CHẤT LƯỢNG CAO. Cấm tuyệt đối việc sử dụng ảnh gốc chưa qua xử lý nặng mb đưa thẳng vào Source code.
