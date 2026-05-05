# Portfolio Content Outline

> **Ngày**: 2026-05-04
> **Mục tiêu**: phác thảo nội dung cho landing page portfolio hiện tại
> **Flow hiện có**: `Overview -> Case Study -> Work -> Showreel -> Contact`

---

## 1. Định vị tổng thể

- Vai trò chính: `[Creative Video Strategist / Multimedia Producer / Video Marketing Lead]`
- Lời hứa giá trị: dùng video để tạo tăng trưởng, không chỉ để "đẹp"
- 3 từ khóa xuyên suốt: `performance`, `storytelling`, `system-building`
- Đối tượng đọc chính: recruiter, founder, marketing manager, client tiềm năng
- Ấn tượng cần tạo trong 10 giây đầu: người này vừa làm được creative, vừa hiểu business

---

## 2. Giọng văn nên dùng

- Ngắn, rõ, thiên về kết quả
- Mỗi đoạn nên trả lời 1 trong 3 câu hỏi: `Bạn làm gì?`, `Bạn tạo ra impact gì?`, `Vì sao nên tin bạn?`
- Ưu tiên số liệu thật: doanh thu, CPA, views, conversion, số dự án, quy mô team
- Hạn chế câu chung chung như `I am passionate`, `I love creating content`
- Viết theo hướng: `problem -> action -> result`

---

## 3. Outline Theo Từng Section

### A. Overview

**Map file**: `src/data/overview.ts`

**Mục tiêu**
- Giới thiệu bản thân thật nhanh
- Làm rõ bạn đứng ở giao điểm giữa creative và business
- Gài 3-4 con số mạnh để tạo trust ngay đầu trang

**Nội dung nên có**
- Overline ngắn: `ABOUT ME` hoặc `HEY, I'M [NAME]`
- Headline 2-4 từ, dễ nhớ, đúng vai trò chính
- Description 2 câu:
  - Câu 1: bạn giúp ai và tạo ra kết quả gì
  - Câu 2: bạn làm điều đó bằng cách nào
- 4 business stats nổi bật nhất

**Khung copy gợi ý**
- `Title`: `[Creative Video Strategist]`
- `Description`: `I build video systems that turn creative ideas into measurable growth. From strategy and production to testing and optimization, I focus on content that performs across paid and organic channels.`

**4 nhóm số liệu nên ưu tiên**
- `Revenue generated`
- `CPA / CAC improvement`
- `Organic views / reach`
- `Number of campaigns, videos, or systems built`

---

### B. Case Study

**Map file**: `src/data/casestudy.ts`

**Mục tiêu**
- Chứng minh bạn không chỉ làm execution, mà còn tạo tác động thật
- Kể 1 case business mạnh và 1 case thiên về community / brand / culture
- Biến portfolio thành bằng chứng, không chỉ là gallery

**Case Study 1: Business Impact**
- Công ty / vai trò / thời gian
- Bối cảnh trước khi bạn tham gia
- Vấn đề lớn nhất cần giải quyết
- Hệ thống hoặc chiến lược bạn xây
- 3 kết quả chính bằng số
- Kết luận: hệ thống đó còn vận hành được sau khi bạn setup

**Case Study 2: Organic Growth / Internal Culture**
- Công ty / vai trò / thời gian
- Mục tiêu chính: organic growth, employer branding, event media, community
- Những gì bạn trực tiếp dẫn dắt
- Chỉ số tăng trưởng hoặc thành quả nổi bật
- Kết luận: bạn xây được kết nối thương hiệu với cộng đồng / đội ngũ

**Khung nội dung cho mỗi section nhỏ**
- `Context`: trước đó công ty đang ở đâu
- `Challenge`: bài toán thật sự là gì
- `My Role`: bạn chịu trách nhiệm phần nào
- `System / Approach`: bạn thay đổi quy trình ra sao
- `Results`: con số cuối cùng

**3 loại proof nên có**
- Ảnh dashboard / performance summary
- Visual quy trình làm việc hoặc funnel
- Timeline thể hiện quá trình thăng tiến hoặc mở rộng trách nhiệm

---

### C. Work

**Map file**: `src/data/services.ts`

**Mục tiêu**
- Cho thấy bề rộng năng lực
- Giúp người xem hiểu bạn có thể nhận việc ở nhiều lớp: strategy, production, design, AI
- Mỗi card nên trả lời rõ: `Bạn làm gì`, `Output là gì`, `Có link xem không`

**5 nhóm nội dung hiện tại**
- `Setup and Build`: studio setup, production operations, workflow
- `Web & Forum Design`: UI/UX, landing page, forum structure
- `Social`: social posts, carousel, branded design assets
- `Video Editor`: best-performing edits, paid ads, reels, short-form
- `A.I`: AI avatar, voice, automation, content scaling

**Mỗi card nên có**
- Title rõ vai trò
- Tag thể hiện nhóm năng lực
- 1 câu mô tả theo format: `Did X to achieve Y`
- 1 CTA rõ ràng: `View Details`, `View Projects`, `Watch Best Videos`

**Công thức mô tả tốt**
- `I built [deliverable] to help [team/brand] achieve [business or marketing result].`

---

### D. Showreel

**Map file**: `src/components/05-Showreel/Showreel.tsx`

**Mục tiêu**
- Tạo cảm giác "xem là hiểu level"
- Gom các mảnh rời trong portfolio thành một statement trực quan
- Hỗ trợ cảm xúc sau khi người xem đã thấy case study và work

**Cấu trúc showreel gợi ý**
- 0-5s: shot mở mạnh nhất
- 5-20s: paid ads / performance videos
- 20-35s: social content / UGC / short-form
- 35-50s: web, design, production setup, behind the scenes
- 50-60s: event / team culture / closing shot

**Lưu ý**
- Giữ showreel trong khoảng `45-75s`
- Shot đầu phải đủ mạnh để giữ người xem
- Nếu dùng YouTube/Vimeo, thay link demo hiện tại bằng link thật

---

### E. Contact

**Map file**: `src/data/contact.ts`

**Mục tiêu**
- Chốt hành động thật rõ
- Làm cho người xem biết nên liên hệ bạn vì lý do gì
- Giữ CTA ngắn, tự tin, không vòng vo

**Nội dung nên có**
- Headline lớn, mang tính mời hợp tác
- Subtitle 1 câu nhấn vào value
- Email chính
- 2-3 social links quan trọng nhất
- Availability status

**Khung copy gợi ý**
- `Headline`: `Let's Build Work That Performs`
- `Subtitle`: `If you need creative that looks sharp and drives results, let's talk.`

---

## 4. Checklist Nội Dung Cần Chuẩn Bị

- 1 headline định vị bản thân thật rõ
- 1 đoạn mô tả bản thân dài 2 câu
- 4 chỉ số mạnh nhất và nguồn xác thực
- 2 case study có số liệu thật
- 5 nhóm dịch vụ / năng lực chính
- 1 link showreel hoàn chỉnh
- 1 email liên hệ chuyên nghiệp
- LinkedIn và các social proof quan trọng
- Ảnh hero cá nhân hoặc key visual đại diện
- Ảnh cover cho từng project / service / case study

---

## 5. Thứ Tự Ưu Tiên Khi Viết Nội Dung

1. Viết `Overview` trước để chốt định vị
2. Viết `Case Study 1` để khóa bằng chứng mạnh nhất
3. Viết `Work` để mở rộng phạm vi năng lực
4. Chốt `Showreel` và link media
5. Viết `Contact` thật ngắn và dứt khoát

---

## 6. Template Điền Nhanh

```md
Tên:
Vai trò chính:
Bạn giúp ai:
Bạn tạo ra kết quả gì:

4 chỉ số mạnh nhất:
1.
2.
3.
4.

Case Study 1:
- Công ty:
- Vai trò:
- Bối cảnh:
- Bạn đã làm gì:
- Kết quả:

Case Study 2:
- Công ty:
- Vai trò:
- Bối cảnh:
- Bạn đã làm gì:
- Kết quả:

5 nhóm năng lực:
1.
2.
3.
4.
5.

Link showreel:
Email:
LinkedIn:
```

---

## 7. Gợi Ý Triển Khai Tiếp Theo

- Dùng file này làm khung để điền nội dung thật vào `src/data/overview.ts`
- Sau đó cập nhật `src/data/casestudy.ts`, `src/data/services.ts`, và `src/data/contact.ts`
- Riêng `Showreel` cần thay link video demo trong component bằng link chính thức
