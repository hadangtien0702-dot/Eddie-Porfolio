# Porto V3 UI/UX Development Rules

Tài liệu này quy định các tiêu chuẩn bắt buộc khi phát triển giao diện (UI) để đảm bảo tính thẩm mỹ, nhất quán và trải nghiệm người dùng cao cấp (Premium).

## 1. Tiêu chuẩn về Khoảng cách (Spacing)
- **Không cộng dồn Padding:** Tuyệt đối không để hai section kế tiếp nhau cùng có padding lớn (Ví dụ: Section A có `pb-32` và Section B có `pt-32`).
- **Nhịp điệu chuẩn:** Sử dụng hệ thống spacing thống nhất. Các khoảng chuyển tiếp giữa các section lớn nên dao động từ `py-16` đến `py-24`.
- **Kiểm tra tổng thể:** Sau mỗi lần cập nhật UI, phải thực hiện cuộn trang toàn bộ (Global Audit) để phát hiện các "hố đen" khoảng trắng hoặc các đoạn bị dính nhau quá mức.

## 2. Tiêu chuẩn về Căn chỉnh (Alignment)
- **Grid Consistency:** Trong các hệ thống thẻ (Cards) theo lưới (Grid), phải sử dụng `min-h` cho các thành phần con (Tiêu đề, Mô tả) để đảm bảo các dòng văn bản luôn bắt đầu trên cùng một đường thẳng ngang.
- **Flexbox Layout:** Ưu tiên sử dụng `flex flex-col` và `flex-grow` để phân bổ không gian bên trong thẻ một cách cân đối.

## 3. Tiêu chuẩn về Chữ (Typography & Text)
- **Chống Break dòng lỗi:** Sử dụng `min-h` với đơn vị `em` hoặc `rem` cho tiêu đề để dự phòng trường hợp văn bản xuống dòng trên các màn hình nhỏ hơn.
- **Fluid Font Size:** Luôn kiểm tra font-size trên màn hình Medium (Tablet) để tránh việc chữ quá to gây vỡ layout.

## 4. Quy trình kiểm tra (UI Audit Checklist)
1. [ ] Kiểm tra khoảng cách trên/dưới các section.
2. [ ] Kiểm tra độ thẳng hàng của các thẻ trong cùng một hàng.
3. [ ] Kiểm tra hiệu ứng Hover (không làm dịch chuyển layout xung quanh).
4. [ ] Kiểm tra hiển thị trên Mobile và Tablet.

---
*Lưu ý: Mọi vi phạm các quy tắc trên đều được coi là lỗi cơ bản và cần được xử lý ngay lập tức.*
