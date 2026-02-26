// ─── Page chính ───
// Mô tả: Trang chủ portfolio — import và sắp xếp các section theo narrative flow
// Thứ tự: Identity → Capability → Proof → Craft → Strategy → Future Direction

import Navigation from "@/components/00-Navigation/Navigation";
import Overview from "@/components/02-Overview/Overview";
import CaseStudy from "@/components/03-CaseStudy/CaseStudy";

export default function Home() {
  return (
    <main className="bg-primary text-text-primary">
      <Navigation />
      {/* Capability: Tôi làm được gì */}
      <Overview />
      {/* Proof: Chứng minh bằng case thực tế */}
      <CaseStudy />
    </main>
  );
}
