# 🚀 EDDIE PORTFOLIO V3: PREMIUM DEVELOPMENT WORKFLOW

> Tài liệu này quy định quy trình chuẩn để phát triển, kiểm soát chất lượng và đồng bộ hóa dự án. 
> Khi thực hiện bất kỳ thay đổi nào, AI và Developer phải tuân thủ nghiêm ngặt các bước này.

---

## 🟢 BƯỚC 1: QUẨN LÝ NGUYÊN LIỆU (PRE-DEV)
*Đảm bảo mọi tài nguyên hệ thống được tối ưu trước khi đưa vào code.*

1. **Assets Optimization**: 
   - Ảnh phải được convert sang `.webp`.
   - Video phải được nén qua script `compress-pl.mjs` hoặc tương đương.
2. **Data-Driven**: 
   - Tuyệt đối không hard-code nội dung vào component.
   - Cập nhật text/thông số vào `src/data/*.ts` trước khi gọi ra UI.
3. **Storage Sync**: 
   - Chạy `node upload-to-supabase.mjs` nếu có assets mới để đảm bảo link public hoạt động.

---

## 🟡 BƯỚC 2: TRIỂN KHAI GIAO DIỆN (IMPLEMENTATION)
*Duy trì tiêu chuẩn Cinematic & Premium theo Identity của thương hiệu.*

1. **Ultimate Rule**: Không thay đổi Layout/Animation bản gốc khi chưa có sự chấp thuận.
2. **Typography Standards**:
   - **Label/Overline**: `12px`, Bold, tracking `0.2em`, `white/40`.
   - **Body Text**: `17px-19px`, Regular, leading `1.8`, `white/60`.
3. **Spacing Rhythm**:
   - Section spacing: `py-16` đến `py-24`.
   - Component spacing: `mb-16` đến `mb-24`.
   - *Cấm cộng dồn padding giữa 2 section liên tiếp.*

---

## 🟠 BƯỚC 3: KIỂM ĐỊNH CHẤT LƯỢNG (UI/UX AUDIT)
*Thực hiện Checklist sau mỗi lần chỉnh sửa UI.*

- [ ] **Alignment**: Các thẻ (Cards) trong Grid phải bằng đầu/đuôi (sử dụng `min-h`).
- [ ] **Hover Effect**: Hiệu ứng hover không được làm dịch chuyển layout xung quanh.
- [ ] **Responsive**: Check hiển thị trên Mobile (iPhone) và Tablet (iPad).
- [ ] **Global Audit**: Cuộn trang toàn bộ để kiểm tra "Vertical Rhythm" và lỗi khoảng trắng.

---

## 🔵 BƯỚC 4: ĐỒNG BỘ & LƯU TRỮ (POST-DEV)
*Đóng gói dự án để làm việc xuyên suốt trên nhiều thiết bị.*

1. **Documentation**: Cập nhật `docs/updates.md` và `docs/progress.md`.
2. **Git Workflow**:
   - `git add .`
   - `git commit -m "type: description"`
   - `git push origin main`
3. **Verification**: Đảm bảo máy khác chỉ cần `git pull` là có thể chạy ngay.

---

*Last Updated: 2026-05-07*
