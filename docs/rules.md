# RULES — Eddie Portfolio V3.1 (Updated: 2026-05-04)

> Tài liệu này mô tả toàn bộ quy tắc, convention, và design system cho dự án portfolio.
> Mọi file mới hoặc chỉnh sửa **phải** tuân theo các quy tắc dưới đây.

### 🔴 QUY TẮC TỐI THƯỢNG (ULTIMATE RULE)
- **UI hiện tại là bản người dùng thích nhất.** 
- **TUYỆT ĐỐI KHÔNG THAY ĐỔI UI** (Layout, Components, Animation Logic, Theme màu) khi chưa có sự chấp thuận trực tiếp của anh.
- Mọi tối ưu hóa chỉ tập trung vào: **Content Strategy (Nội dung), Logic ngầm, SEO, Performance, và Assets Management.**

---

## 1. Định vị Thương hiệu (Identity)
- **Persona**: Creative Video Strategist / Multimedia Producer.
- **Tone & Mood**: Premium, Strategic, Data-driven, Cinematic.
- **Giá trị cốt lõi**: "Video systems that drive growth" (không chỉ làm video đẹp, mà làm video có kết quả business).

---

## 2. Tech Stack & Standards
- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS 4 + Framer Motion.
- **Images**: Luôn dùng `next/image`. Nguồn ảnh gốc: `G:\2026\Porto\V31.0\Image`.
- **Typography Standard (Unified)**:
  - Overline / Label: `12px`, Bold, tracking `0.2em`, `white/40`.
  - Heading (Lg): `clamp(44px, 7vw, 96px)`, `bold`, leading `0.95`.
  - Body Text: `17px-19px`, Regular, leading `1.8`, `white/60`.
  - Font: `Clash Display` (Heading) & `Inter` (Body).

---

## 3. Spacing & Layout (Vertical Rhythm)
- **Macro (Section)**: `py-16 lg:py-24` (Khoảng cách giữa các section lớn).
- **Component**: `mb-16 md:mb-24` (Khoảng cách giữa Gallery/Video và Text).
- **Micro**: `mb-6` đến `mb-10` (Khoảng cách giữa Title và Body).
- **Container**: Max-width `1400px`, padding `px-6 md:px-12 lg:px-16`.

---

## 4. Quy tắc Thiết kế (Design Principles)
- **No Border**: Mặc định không thêm border vào bất kỳ component nào trừ khi được yêu cầu.
- **No Repetition**: Mỗi section phải là một trải nghiệm thị giác riêng biệt. Không reuse layout gây nhàm chán.
- **Narrative Flow**: `Overview` → `Case Study` → `Work` → `Showreel` → `Contact`.

---

## 5. Collaboration Rules (AI & Human)
- **Single Source of Truth**: Mọi nội dung text phải nằm trong `src/data/*.ts`. Không hard-code trong UI.
- **Asset Management**: Luôn nén ảnh/video trước khi dùng. Ưu tiên `.webp`.
- **Git Workflow**: Commit message tiếng Anh, rõ ràng (`feat:`, `fix:`, `refactor:`, `chore:`).

---

*Ghi chú: Bản quy tắc này thay thế toàn bộ các ghi chú rời rạc trước đó (CLAUDE.md, CHECKLIST.md).*
