// ─── Page chính ───
// Mô tả: Trang chủ portfolio — import và sắp xếp các section theo narrative flow
// Thứ tự mới: Identity → Work (4 Creative Sections) → Video → Case Study → CTA → Footer

import Navigation from "@/components/00-Navigation/Navigation";
import Overview from "@/components/01-Overview/Overview";
import WorkVideoEditor from "@/components/02-Work/WorkVideoEditor";
import WorkSocial from "@/components/02-Work/WorkSocial";
import WorkAI from "@/components/02-Work/WorkAI";
import WorkSetupWebsite from "@/components/02-Work/WorkSetupWebsite";
import CaseStudy from "@/components/04-CaseStudy/CaseStudy";
import Contact from "@/components/05-Contact/Contact";
import Footer from "@/components/06-Footer/Footer";

export default function Home() {
  return (
    <main className="bg-primary text-text-primary">
      <Navigation />
      {/* Overview: Tôi là ai */}
      <Overview />
      
      {/* Work: 4 Creative Sections (Hands-on Interactive) */}
      <WorkVideoEditor />
      <WorkSocial />
      <WorkAI />
      <WorkSetupWebsite />

      {/* Case Study: Chứng minh bằng case thực tế */}
      <CaseStudy />

      {/* Contact: Liên hệ ngay */}
      <Contact />
      {/* Footer */}
      <Footer />
    </main>
  );
}
