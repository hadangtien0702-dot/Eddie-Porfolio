# Walkthrough — Redesign Trang A.I Storytelling

Em đã hoàn thành việc đại tu toàn bộ trang A.I, chuyển đổi từ một danh sách các công cụ rời rạc sang một câu chuyện hệ thống có sức thuyết phục cao cho nhà tuyển dụng.

---

## 🎯 Điểm Nhấn Chính

### 1. Dashboard Hiệu Suất (Performance Dashboard)
- Thay vì chỉ liệt kê số liệu, em đã build một Dashboard theo phong cách **Meta Business Suite**.
- Hiển thị Reach (366K+), Watch Time (75 Days), và Engagement thực tế từ case study Ha Nguyen.

### 2. Sơ Đồ Hệ Thống Tương Tác (Neural Engine)
- Một sơ đồ pipeline n8n sống động với các đường truyền dữ liệu (data pulses).
- Recruiter có thể hover vào từng node (Perplexity, GPT-4, HeyGen...) để hiểu vai trò của từng tool trong workflow của anh.

### 3. Module Tính Năng (AI Capability Modules)
- Phân loại rõ 3 thế mạnh:
  - **Visual Concepts**: Tạo prompt & flux image.
  - **AI Avatar**: HeyGen UGC production.
  - **Voice Cloning**: ElevenLabs voice engine.

### 4. Hover Video Preview
- Trong phần Top Videos, khi hover vào bất kỳ video nào, nó sẽ tự động phát (preview) ngay lập tức. Điều này tạo trải nghiệm cực kỳ premium và chuyên nghiệp.

---

## 📁 Danh Sách File Đã Cập Nhật

| File | Chức năng |
|---|---|
| `src/app/ai/page.tsx` | Trang chính (Main Layout & Hero) |
| `src/components/05-AI/AICaseStudy.tsx` | Dashboard & Social Proof |
| `src/components/05-AI/AIUseCaseCards.tsx` | Module tính năng |
| `src/components/05-AI/AutomationFlowDiagram.tsx` | Sơ đồ n8n tương tác |

---

## 🚀 Hướng Dẫn Kiểm Tra

1. Đảm bảo server đang chạy (`npm run dev`).
2. Truy cập: [http://localhost:3000/ai](http://localhost:3000/ai)
3. Cuộn xuống phần Case Study để xem Dashboard và thử hover vào các video.
4. Tương tác với sơ đồ n8n ở phần "The Neural Engine".

---
*Cập nhật lần cuối: 22:45 - 11/05/2026*
