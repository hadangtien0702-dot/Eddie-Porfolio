# UPDATES LOG — Eddie Portfolio V3

> File này ghi lại toàn bộ các thay đổi, cập nhật trong dự án.
> Mỗi khi có update mới, thêm entry vào đầu danh sách (mới nhất ở trên).

---

## [2026-03-17] Case Study Content Improvements

- **Loại**: Content Update
- **File**: `src/data/casestudy.ts`
- **Plan**: `update/01-update-casestudy-content.md`
- **Mô tả**: Tinh chỉnh nội dung Thinksmart Insurance case study
  - Section 1 (Context): Viết lại body text, thêm narrative hook
  - Section 2 (Challenge): Rút 4 bullets → 3 bullets ngắn gọn
  - Section 3 (System): Condensed 4 bullets, giữ title rõ ràng
  - Section 4 (Scaling): Thêm closingLine kết nối views → business value
  - Section 5 (Results): **MỚI** — Tổng kết journey $2M → $6M, RevenueChart, 3 stats
  - Link section images cho tất cả 5 sections
- **Trạng thái**: Hoàn thành

---

## [2026-03-17] Navigation Scroll Effects

- **Loại**: Enhancement
- **File**: `src/components/00-Navigation/Navigation.tsx`
- **Mô tả**: Nâng cấp hiệu ứng scroll cho Navigation
  - Hide on scroll down / Show on scroll up
  - Nền đậm dần liên tục (glass → solid) bằng 2-layer system
  - Logo thu nhỏ mượt khi scroll (1.0 → 0.92)
  - Nav scale thu nhỏ nhẹ (1.0 → 0.98)
  - Shadow tăng dần theo scroll
  - Sử dụng Framer Motion hooks: `useScroll`, `useTransform`, `useSpring`, `useMotionValueEvent`
  - Spring config: `{ damping: 30, stiffness: 200 }` cho smooth motion
  - Guard: không ẩn nav khi mobile menu đang mở
- **Trạng thái**: Hoàn thành
