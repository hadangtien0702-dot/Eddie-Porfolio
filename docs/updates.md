# UPDATES LOG — Eddie Portfolio V3

## [2026-05-05] - Cinematic 3D HUD & Spacing Optimization

### Added
- **Cinematic 3D HUD Space**: Nâng cấp phần Archive trang Setup and Build từ 2D sang không gian 3D tương tác.
- Hiệu ứng **3D Tilt**, **Scanner Lines**, và **Digital Particles** cho các card ảnh.
- Hệ thống âm thanh phản hồi UI (`uiSounds.playClick()`) khi tương tác.
- Instructional HUD Overlay hướng dẫn điều hướng bên trong Canvas.

### Changed
- **Spacing Optimization**: 
  - Siết chặt khoảng cách dọc (py/mb) ở Hero, Highlights và Timeline.
  - Tăng mật độ hình ảnh trong Archive (giãn cách x1.2).
  - Tách biệt `InteractiveCanvasGallery` thành section độc lập để quản lý layout tốt hơn.
- **CTA Design**: Nâng cấp block kêu gọi hành động với hiệu ứng Glow và Typography đậm chất cinematic hơn.

### Fixed
- Lỗi `FullscreenLightbox` bị truyền sai props (`initialIndex` vs `currentIndex`).
- Lỗi mất ảnh Step 04 (Live Production) do đường dẫn file không tồn tại (đã thay bằng `Main.webp`).
- Lỗi tiêu đề Archive bị xuống dòng trên màn hình hẹp (đã dùng `whitespace-nowrap`).

---

## [2026-05-04] - Typography & Image Management Standard

### Added
- Thư mục `docs/` chứa toàn bộ tài liệu hướng dẫn và quy tắc.
- Hệ thống quản lý ảnh tập trung tại root `Image/`.
- Cấu trúc folder ảnh theo chuẩn `01-Hero`, `02-Context`, v.v.

### Changed
- **Typography**: Unify toàn bộ Project về chuẩn:
  - Overline/Labels: 12px, Bold, tracking 0.2em.
  - Body: 17px-19px, leading 1.8.
- **Spacing**: Áp dụng Vertical Rhythm (py-16 cho section, mb-16 cho component).
- **Banner**: Cập nhật Banner 01 cho Thinksmart Insurance.
- **Paths**: Cập nhật lại hơn 50 đường dẫn ảnh trong code để khớp với cấu trúc mới.

### Fixed
- Lỗi `ReferenceError: cn is not defined` trong `CaseStudyLayouts`.
- Lỗi vỡ dòng (wrapping) của stat "CPA ↓ Revenue ↑".
- Lỗi bị cắt nét chữ (clipping) trong hiệu ứng `VerticalCutReveal`.

---

## [2026-04-28] - Project Initialization & Core Components
- Khởi tạo dự án.
- Xây dựng Layout Case Study cơ bản.
- Tích hợp Framer Motion.
