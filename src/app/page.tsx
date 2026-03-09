// ─── Page chính ───
// Mô tả: Trang chủ portfolio — import và sắp xếp các section theo narrative flow
// Thứ tự: Identity → Numbers → Skills → Video → Proof → CTA → Footer

import Navigation from "@/components/00-Navigation/Navigation";
import Overview from "@/components/02-Overview/Overview";
import Services from "@/components/04-Services/Services";
import Showreel from "@/components/05-Showreel/Showreel";
import CaseStudy from "@/components/03-CaseStudy/CaseStudy";
import Contact from "@/components/06-Contact/Contact";
import Footer from "@/components/07-Footer/Footer";

export default function Home() {
  return (
    <main className="bg-primary text-text-primary">
      <Navigation />
      {/* Overview: Tôi là ai */}
      <Overview />
      {/* Case Study: Chứng minh bằng case thực tế */}
      <CaseStudy />
      {/* Work: Tôi làm được gì */}
      <Services />
      {/* Strategy: Xem demo reel */}
      <Showreel />
      {/* Contact: Liên hệ ngay */}
      <Contact />
      {/* Footer */}
      <Footer />
    </main>
  );
}
