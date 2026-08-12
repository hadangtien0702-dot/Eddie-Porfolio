"use client";

// ─── Hồ sơ năng lực gửi CEO (tiếng Việt) ───
// Mô tả: Trang /ho-so — bản pitch 3 phần cho CEO đọc: (1) thành quả kinh doanh,
// (2) góc nhìn kỹ thuật A.I, (3) hướng đang đi (AiO Studio). Screen giữ dark theme
// của site, print ra đúng 3 trang A4 nền trắng (break-after theo từng section).
// Nguyên tắc câu chữ: không từ chuyên ngành, mọi con số truy được về nguồn công khai
// trong data/ — giữ đúng kỷ luật của Resume.tsx (số không nguồn đã bị loại 19/7/2026).

import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowLeft,
  Printer,
} from "lucide-react";

export default function HoSo() {
  const router = useRouter();

  const personalInfo = {
    fullName: "HÀ ĐĂNG TIẾN (EDDIE)",
    headline: "Trưởng nhóm Sản xuất Sáng tạo · Video tạo doanh thu",
    phone: "+84 938 169 130",
    phoneHref: "tel:+84938169130",
    email: "hadangtien0702@gmail.com",
    location: "TP. Hồ Chí Minh",
    remote: "Sẵn sàng làm việc từ xa",
    portfolioUrl: "hadangtien.vercel.app",
    portfolioHref: "https://hadangtien.vercel.app/",
    caseStudyUrl: "cv-media-lead.vercel.app",
    caseStudyHref: "https://cv-media-lead.vercel.app/",
  };

  // ─── Trang 1: 4 số liệu kinh doanh (nguồn: casestudy.ts, social-post.ts) ───
  const businessStats = [
    { number: "$6.2M", label: "Doanh thu đỉnh 2024 — cao nhất lịch sử công ty" },
    { number: "−66%", label: "Chi phí để tìm được một khách hàng qua quảng cáo" },
    { number: "100%", label: "Khách tiềm năng của đội Sales đến từ video" },
    { number: "15M+", label: "Lượt xem tự nhiên — không tốn tiền quảng cáo" },
  ];

  // ─── Trang 1: 4 mảng kết quả ───
  const resultBlocks = [
    {
      idx: "01",
      name: "Doanh thu",
      sub: "",
      body: (
        <>
          Khi tôi nhận mảng truyền thông, công ty bán hàng tốt nhưng chi phí để tìm một khách
          qua quảng cáo đã leo lên <strong>180–200&nbsp;đô một người</strong>. Tôi tổ chức lại
          toàn bộ khâu sản xuất theo một nguyên tắc: mỗi video phải có một nhiệm vụ rõ ràng
          trong hành trình đưa khách về công ty.
        </>
      ),
      metric: "→ 2024: DOANH THU $6.2M — KỶ LỤC CÔNG TY",
    },
    {
      idx: "02",
      name: "Quảng cáo hiệu quả",
      sub: "Performance Ads",
      body: (
        <>
          Tôi ngồi trực tiếp với người chạy quảng cáo và đọc số liệu hằng ngày. Nhiều phiên bản
          video được thử cùng lúc trên Meta và TikTok — <strong>bản nào bán được thì nhân rộng,
          bản nào không thì bỏ ngay</strong>, quyết định bằng con số chứ không bằng cảm tính.
        </>
      ),
      metric: "→ CHI PHÍ TÌM MỘT KHÁCH GIẢM 66%",
    },
    {
      idx: "03",
      name: "Social 0 đồng",
      sub: "",
      body: (
        <>
          Song song kênh trả phí, tôi xây kênh nội dung <strong>không tốn tiền quảng cáo</strong>:
          hơn 15 triệu lượt xem tự nhiên, video cao nhất đạt 2,7 triệu lượt. Thương hiệu được
          người xem nhắc tới hằng ngày mà không mất thêm ngân sách nào.
        </>
      ),
      metric: "→ 15M+ LƯỢT XEM · VIDEO ĐỈNH 2.7M",
    },
    {
      idx: "04",
      name: "Branding",
      sub: "",
      body: (
        <>
          Tôi thiết kế bộ nhận diện cho toàn bộ dòng sản phẩm chính, và tự tay thiết kế, xây dựng
          website song ngữ Việt–Anh của công ty. Sản phẩm tài chính vốn khó hiểu được kể lại bằng
          hình ảnh đơn giản — <strong>khách nhìn là hiểu mình đang mua gì</strong>.
        </>
      ),
      metric: "→ MỘT NHẬN DIỆN XUYÊN SUỐT MỌI ĐIỂM CHẠM",
    },
  ];

  // ─── Trang 2: 3 số liệu A.I (nguồn: work-ai-applications.ts) ───
  const aiStats = [
    { number: "3×", label: "Sản lượng nội dung — cùng một đội ngũ" },
    { number: "−60%", label: "Chi phí sản xuất nội dung nhờ A.I" },
    { number: "5", label: "Ngôn ngữ phát hành — không thuê thêm người" },
  ];

  // ─── Trang 2: 3 khối kỹ thuật ───
  const techBlocks = [
    {
      big: ["VIDEO", "+ A.I"],
      cap: "Kết quả thật, không phải thử nghiệm",
      body: (
        <>
          Tôi dùng <strong>người dẫn chuyện ảo và giọng đọc nhân bản từ A.I</strong> để một video
          gốc thành nhiều phiên bản — mỗi phiên bản cho một thị trường, một ngôn ngữ — mà không
          phải thuê thêm diễn viên hay người thu âm. Quan trọng nhất: những video này{" "}
          <strong>vẫn đem về khách hàng thật</strong> — chúng nằm trong chính hệ thống đã tạo ra
          100% khách tiềm năng nói ở trang trước. Với tôi, A.I chỉ có giá trị khi con số kinh
          doanh xác nhận nó.
        </>
      ),
    },
    {
      big: ["DESIGN", "+ A.I"],
      cap: "Từ ấn phẩm đến công cụ làm việc",
      body: (
        <>
          A.I giúp tôi làm nhanh phần thiết kế ấn phẩm mạng xã hội — nhưng tôi đi thêm một bước:{" "}
          <strong>tự thiết kế và xây hẳn bộ công cụ nội bộ cho đội kinh doanh</strong>. Nhân viên
          chỉ bấm vài nút là có bản chào giá đúng chuẩn thương hiệu gửi khách, thay vì chờ
          designer làm tay từng bản. Người thiết kế không còn là nút thắt của cả đội — và quy
          trình chạy được ngay cả khi tôi vắng mặt.
        </>
      ),
    },
    {
      big: ["SETUP", "STUDIO"],
      cap: "Quay dựng · Livestream · Chụp ảnh",
      body: (
        <>
          Tôi nhận <strong>một căn nhà trống</strong> và bàn giao <strong>một studio hoạt động
          đầy đủ</strong>: phòng quay, ánh sáng, âm thanh, máy dựng. Đội của tôi vận hành trọn
          gói — quay, dựng phim, livestream, chụp sự kiện — và giao phim hoàn chỉnh trong{" "}
          <strong>48 giờ</strong> sau mỗi sự kiện lớn của công ty.
        </>
      ),
    },
  ];

  // ─── Trang 3: số đo AiO Studio từ bản đang chạy ───
  const toolRows = [
    {
      val: "60 phút → 14 giây",
      body: (
        <>
          <strong>Chép lời video thành chữ:</strong> một video dài một tiếng được gỡ băng xong
          trong 14 giây — thay vì gõ tay cả buổi.
        </>
      ),
    },
    {
      val: "28.800+ file",
      body: (
        <>
          <strong>Kho tài nguyên dùng chung:</strong> nhạc, hiệu ứng, mẫu thiết kế — mở xem tức
          thì, kéo thả thẳng vào phim.
        </>
      ),
    },
    {
      val: "~1 giờ video",
      body: (
        <>
          <strong>Tự cắt khoảng im lặng:</strong> máy tự tìm và dồn các đoạn có lời — đã kiểm
          chứng trên video dài gần một giờ.
        </>
      ),
    },
    {
      val: "Nhiều máy quay",
      body: (
        <>
          <strong>Podcast tự dựng:</strong> máy tự chuyển góc quay theo người đang nói — việc
          trước đây phải ngồi chọn từng đoạn.
        </>
      ),
    },
    {
      val: "Ngang → Dọc",
      body: (
        <>
          <strong>Đổi khung hình tự động:</strong> video ngang thành video dọc cho TikTok/Reels,
          khung hình luôn bám theo nhân vật.
        </>
      ),
    },
  ];

  return (
    <main className="min-h-dvh bg-[#050505] text-white font-body selection:bg-accent selection:text-white print:bg-white print:text-black print:p-0">
      {/* ─── PRINT STYLES — light A4, 3 trang (mỗi .hs-page một trang) ─── */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 12mm 14mm;
        }

        @media print {
          html,
          body,
          main {
            background: #ffffff !important;
            color: #141414 !important;
            font-size: 12px !important;
            line-height: 1.5 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .hs-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Mỗi section = một trang A4 */
          .hs-page {
            page-break-after: always !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .hs-page:last-child {
            page-break-after: auto !important;
          }

          .hs-overline {
            font-size: 9px !important;
            letter-spacing: 0.22em !important;
            color: #d33500 !important;
          }
          .hs-h1 {
            font-size: 26px !important;
            color: #111111 !important;
            margin-top: 6px !important;
          }
          .hs-headline {
            font-size: 12px !important;
            color: #d33500 !important;
            margin-top: 5px !important;
          }
          .hs-lead {
            font-size: 11.5px !important;
            line-height: 1.6 !important;
            color: #333333 !important;
            margin-top: 12px !important;
          }
          .hs-lead strong {
            color: #111111 !important;
          }

          .hs-contact {
            font-size: 9.5px !important;
            color: #333333 !important;
            gap: 4px 14px !important;
            margin-top: 10px !important;
            padding-top: 8px !important;
            border-top: 1px solid #ececec !important;
          }
          .hs-contact a,
          .hs-contact span {
            color: #333333 !important;
          }

          .hs-stats {
            gap: 8px !important;
            margin-top: 14px !important;
          }
          .hs-stat {
            padding: 8px 10px !important;
            border-radius: 4px !important;
            background: #fafafa !important;
            border: 1px solid #e4e4e4 !important;
            page-break-inside: avoid !important;
          }
          .hs-stat .num {
            font-size: 19px !important;
            color: #d33500 !important;
            margin-bottom: 4px !important;
          }
          .hs-stat .lbl {
            font-size: 8.5px !important;
            line-height: 1.4 !important;
            color: #4a4a4a !important;
          }

          .hs-section-title {
            font-size: 12px !important;
            color: #111111 !important;
            border-left: 3px solid #d33500 !important;
            padding-left: 8px !important;
            margin-top: 18px !important;
          }

          .hs-grid2 {
            gap: 12px 16px !important;
            margin-top: 12px !important;
          }
          .hs-card {
            border-top: 2px solid #141414 !important;
            padding-top: 7px !important;
            page-break-inside: avoid !important;
          }
          .hs-card .idx {
            font-size: 9.5px !important;
            color: #d33500 !important;
          }
          .hs-card .name {
            font-size: 11.5px !important;
            color: #111111 !important;
          }
          .hs-card .sub {
            font-size: 8.5px !important;
            color: #888888 !important;
          }
          .hs-card p {
            font-size: 10.5px !important;
            line-height: 1.5 !important;
            color: #333333 !important;
            margin-top: 4px !important;
          }
          .hs-card p strong {
            color: #111111 !important;
          }
          .hs-card .metric {
            font-size: 8.5px !important;
            color: #d33500 !important;
            margin-top: 6px !important;
          }

          .hs-quote {
            border-left: 3px solid #d33500 !important;
            background: #fafafa !important;
            border-radius: 0 4px 4px 0 !important;
            padding: 10px 14px !important;
            margin-top: 16px !important;
            page-break-inside: avoid !important;
          }
          .hs-quote p {
            font-size: 11px !important;
            line-height: 1.6 !important;
            color: #333333 !important;
          }
          .hs-quote strong {
            color: #111111 !important;
          }

          .hs-tech {
            gap: 14px !important;
            padding: 12px 0 !important;
            border-top: 1px solid #e4e4e4 !important;
            page-break-inside: avoid !important;
          }
          .hs-tech .big {
            font-size: 15px !important;
            color: #d33500 !important;
          }
          .hs-tech .cap {
            font-size: 8.5px !important;
            color: #888888 !important;
          }
          .hs-tech p {
            font-size: 10.5px !important;
            line-height: 1.55 !important;
            color: #333333 !important;
          }
          .hs-tech p strong {
            color: #111111 !important;
          }

          .hs-toolbox {
            border-top: 1px solid #e4e4e4 !important;
            padding-top: 10px !important;
            margin-top: 14px !important;
            page-break-inside: avoid !important;
          }
          .hs-toolbox .t {
            font-size: 8px !important;
            color: #888888 !important;
          }
          .hs-toolbox .items {
            font-size: 9.5px !important;
            color: #333333 !important;
          }
          .hs-toolbox .items b {
            color: #111111 !important;
          }

          .hs-toolrow {
            gap: 14px !important;
            padding: 9px 0 !important;
            border-top: 1px solid #e4e4e4 !important;
            page-break-inside: avoid !important;
          }
          .hs-toolrow .val {
            font-size: 12px !important;
            color: #d33500 !important;
          }
          .hs-toolrow p {
            font-size: 10.5px !important;
            line-height: 1.5 !important;
            color: #333333 !important;
          }
          .hs-toolrow p strong {
            color: #111111 !important;
          }

          .hs-why {
            background: #141414 !important;
            border-radius: 5px !important;
            padding: 14px 16px !important;
            margin-top: 16px !important;
            page-break-inside: avoid !important;
          }
          .hs-why .t {
            color: #ff9a73 !important;
            font-size: 9px !important;
          }
          .hs-why p {
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 11px !important;
            line-height: 1.6 !important;
          }
          .hs-why p strong {
            color: #ffffff !important;
          }

          .hs-contact-strip {
            border: 1px solid #e4e4e4 !important;
            background: #fafafa !important;
            border-radius: 5px !important;
            padding: 12px 14px !important;
            margin-top: 14px !important;
            page-break-inside: avoid !important;
          }
          .hs-contact-strip .cta {
            font-size: 10.5px !important;
            color: #111111 !important;
          }
          .hs-contact-strip .links {
            font-size: 9px !important;
            color: #333333 !important;
          }
          .hs-contact-strip .links b {
            color: #d33500 !important;
          }
          .hs-contact-strip a {
            color: inherit !important;
            text-decoration: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* ─── SCREEN FLOATING CONTROLS ─── */}
      <div className="no-print fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between w-full pointer-events-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-[13px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Về Portfolio</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-accent text-white hover:bg-accent-warm font-heading text-[13px] font-bold shadow-[0_10px_25px_rgba(255,64,0,0.35)] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Lưu PDF / In</span>
          </button>
        </div>
      </div>

      <div className="hs-container max-w-4xl mx-auto px-6 pt-28 pb-20 md:pb-32 relative z-10">
        {/* Glow ambient — screen only */}
        <div className="no-print absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        {/* ════════ TRANG 1 — THÀNH QUẢ KINH DOANH ════════ */}
        <section className="hs-page">
          <p className="hs-overline font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Hồ sơ năng lực — Gửi Ban lãnh đạo
          </p>
          <h1 className="hs-h1 font-heading text-4xl md:text-5xl font-black tracking-tighter leading-tight mt-3 text-white print:text-black">
            {personalInfo.fullName}
          </h1>
          <p className="hs-headline font-heading text-base md:text-lg font-bold text-accent mt-2">
            {personalInfo.headline}
          </p>

          {/* Contact bar */}
          <div className="hs-contact flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 pt-6 border-t border-white/5 text-xs text-white/70 print:text-black">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Mail className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.email}</span>
            </a>
            <a href={personalInfo.phoneHref} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Phone className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.phone}</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.location}</span>
            </span>
            <span>{personalInfo.remote}</span>
            <a
              href={personalInfo.portfolioHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.portfolioUrl}</span>
            </a>
          </div>

          <p className="hs-lead text-sm md:text-[15px] text-white/75 leading-relaxed mt-8 print:text-black/80">
            Tôi xây <strong className="text-white print:text-black">đội video, phòng quay và quy trình sản xuất ngay trong công ty</strong> —
            để mỗi video làm ra không chỉ đẹp, mà đem về khách hàng đo đếm được. Từ 2022 đến nay
            tại ThinkSmart Insurance,{" "}
            <strong className="text-white print:text-black">toàn bộ khách hàng tiềm năng của đội kinh doanh đều đến từ video</strong>{" "}
            do đội tôi sản xuất.
          </p>

          {/* 4 số liệu */}
          <div className="hs-stats grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 print:grid-cols-4">
            {businessStats.map((stat) => (
              <div key={stat.label} className="hs-stat bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                <span className="num font-mono text-2xl md:text-3xl font-black text-accent leading-none mb-2 whitespace-nowrap">
                  {stat.number}
                </span>
                <span className="lbl font-body text-[11px] text-white/60 leading-snug print:text-black/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <h2 className="hs-section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mt-10 border-l-2 border-accent pl-3">
            Bốn mảng làm nên các con số trên
          </h2>

          <div className="hs-grid2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6 print:grid-cols-2">
            {resultBlocks.map((b) => (
              <div key={b.idx} className="hs-card border-t-2 border-white/80 pt-3 print:border-black">
                <div className="flex items-baseline gap-2">
                  <span className="idx font-mono text-xs font-extrabold text-accent">{b.idx}</span>
                  <span className="name font-heading text-sm font-extrabold uppercase tracking-wide text-white print:text-black">
                    {b.name}
                  </span>
                  {b.sub && <span className="sub text-[11px] font-semibold text-white/40">{b.sub}</span>}
                </div>
                <p className="text-[13px] text-white/65 leading-relaxed mt-2 print:text-black/80">{b.body}</p>
                <p className="metric font-mono text-[10px] font-bold text-accent tracking-wide mt-3">{b.metric}</p>
              </div>
            ))}
          </div>

          {/* Quote — tinh thần làm chủ (closing line từ case study Thinksmart) */}
          <div className="hs-quote border-l-[3px] border-accent bg-white/[0.03] rounded-r-lg px-6 py-5 mt-10">
            <p className="text-sm text-white/70 leading-relaxed print:text-black/80">
              “Tôi không nhận hoa hồng theo doanh số. Tôi làm việc bằng{" "}
              <strong className="text-white print:text-black">tinh thần làm chủ</strong> — kết quả của
              đội tôi phải biến thành tăng trưởng thật của công ty, đó mới là thước đo.”
            </p>
          </div>
        </section>

        {/* ════════ TRANG 2 — GÓC NHÌN KỸ THUẬT: A.I ════════ */}
        <section className="hs-page mt-20 print:mt-0">
          <p className="hs-overline font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Góc nhìn kỹ thuật
          </p>
          <h2 className="hs-h1 font-heading text-3xl md:text-4xl font-black tracking-tighter leading-tight mt-3 text-white print:text-black">
            Tôi dùng A.I như nhân sự tăng thêm
          </h2>

          <p className="hs-lead text-sm md:text-[15px] text-white/75 leading-relaxed mt-6 print:text-black/80">
            A.I không thay thế đội ngũ của tôi —{" "}
            <strong className="text-white print:text-black">nó nhân sức đội ngũ lên</strong>. Cùng một
            số người: sản lượng gấp ba, chi phí sản xuất giảm gần hai phần ba, và nội dung nói được
            năm thứ tiếng.
          </p>

          <div className="hs-stats grid grid-cols-3 gap-4 mt-8">
            {aiStats.map((stat) => (
              <div key={stat.label} className="hs-stat bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                <span className="num font-mono text-2xl md:text-3xl font-black text-accent leading-none mb-2 whitespace-nowrap">
                  {stat.number}
                </span>
                <span className="lbl font-body text-[11px] text-white/60 leading-snug print:text-black/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            {techBlocks.map((t) => (
              <div key={t.big.join("")} className="hs-tech grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-6 py-6 border-t border-white/10">
                <div>
                  <p className="big font-mono text-lg md:text-xl font-extrabold text-accent leading-tight whitespace-nowrap">
                    {t.big[0]}
                    <br />
                    {t.big[1]}
                  </p>
                  <p className="cap text-[10px] text-white/40 mt-2 leading-snug">{t.cap}</p>
                </div>
                <p className="text-[13px] text-white/65 leading-relaxed print:text-black/80">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="hs-toolbox flex flex-col md:flex-row items-baseline gap-3 md:gap-6 border-t border-white/10 pt-5 mt-8">
            <span className="t font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/40 whitespace-nowrap">
              Bộ công cụ hằng ngày
            </span>
            <span className="items text-xs text-white/60 leading-relaxed print:text-black/80">
              <b className="text-white print:text-black">HeyGen</b> — người dẫn chuyện ảo &nbsp;·&nbsp;{" "}
              <b className="text-white print:text-black">ElevenLabs</b> — giọng đọc nhân bản &nbsp;·&nbsp;{" "}
              <b className="text-white print:text-black">n8n</b> — tự động hoá quy trình &nbsp;·&nbsp;{" "}
              <b className="text-white print:text-black">Premiere Pro / CapCut</b> — dựng phim &nbsp;·&nbsp;{" "}
              <b className="text-white print:text-black">Meta &amp; TikTok Ads</b> — kênh quảng cáo
            </span>
          </div>
        </section>

        {/* ════════ TRANG 3 — HƯỚNG ĐANG ĐI: AiO STUDIO ════════ */}
        <section className="hs-page mt-20 print:mt-0">
          <p className="hs-overline font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Hướng tôi đang đi
          </p>
          <h2 className="hs-h1 font-heading text-3xl md:text-4xl font-black tracking-tighter leading-tight mt-3 text-white print:text-black">
            AiO Studio — công cụ giúp người dựng phim tiết kiệm thời gian
          </h2>

          <p className="hs-lead text-sm md:text-[15px] text-white/75 leading-relaxed mt-6 print:text-black/80">
            A.I đã giúp người làm video nhanh hơn. Nhưng quan sát chính đội của mình, tôi thấy phần
            lớn giờ làm vẫn mất vào{" "}
            <strong className="text-white print:text-black">những việc lặp đi lặp lại</strong>: cắt bỏ
            khoảng im lặng, gõ phụ đề, tìm file trong kho, đổi video ngang thành dọc cho từng nền
            tảng. Nên tôi đang tự xây{" "}
            <strong className="text-white print:text-black">AiO Studio</strong> — bộ công cụ nằm ngay
            trong phần mềm dựng phim, âm thầm làm giùm những việc đó.
          </p>

          <h3 className="hs-section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mt-8 border-l-2 border-accent pl-3">
            Số đo từ bản đang chạy — không phải ý tưởng trên giấy
          </h3>

          <div className="mt-5">
            {toolRows.map((r) => (
              <div key={r.val} className="hs-toolrow grid grid-cols-1 md:grid-cols-[170px_1fr] gap-2 md:gap-6 items-baseline py-4 border-t border-white/10 last:border-b">
                <span className="val font-mono text-sm font-extrabold text-accent whitespace-nowrap">{r.val}</span>
                <p className="text-[13px] text-white/65 leading-relaxed print:text-black/80">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="hs-why bg-white/[0.04] border border-white/10 rounded-lg px-7 py-6 mt-10 print:border-0">
            <p className="t font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
              Vì sao điều này đáng để anh/chị quan tâm
            </p>
            <p className="text-sm leading-relaxed text-white/85">
              Tôi không chỉ là người làm video. Tôi là người{" "}
              <strong className="text-white">nhìn vào quy trình, thấy chỗ cả đội đang mất
              thời gian, và tự tay xây công cụ xoá chỗ đó</strong>. Một người như vậy trong đội ngũ
              nghĩa là: đội làm nhanh hơn theo từng tháng, và chi phí sản xuất giảm dần theo thời
              gian — đúng như những con số ở hai trang trước.
            </p>
          </div>

          <div className="hs-contact-strip flex flex-col md:flex-row justify-between md:items-center gap-4 border border-white/10 rounded-lg px-6 py-5 mt-8 bg-white/[0.02]">
            <p className="cta text-sm font-bold text-white leading-relaxed print:text-black">
              Toàn bộ số liệu trong hồ sơ này
              <br className="hidden md:block print:block" /> đều xem được tại portfolio trực tuyến.
            </p>
            <div className="links font-mono text-[11px] text-white/60 leading-loose md:text-right print:text-black">
              <p>
                <a href={personalInfo.portfolioHref} target="_blank" rel="noopener noreferrer">
                  <b className="text-accent">{personalInfo.portfolioUrl}</b> — portfolio đầy đủ
                </a>
              </p>
              <p>
                <a href={personalInfo.caseStudyHref} target="_blank" rel="noopener noreferrer">
                  <b className="text-accent">{personalInfo.caseStudyUrl}</b> — case study chuyên sâu
                </a>
              </p>
              <p>
                {personalInfo.email} · {personalInfo.phone}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
