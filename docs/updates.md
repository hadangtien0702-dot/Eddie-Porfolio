# UPDATES LOG — Eddie Portfolio V3

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
