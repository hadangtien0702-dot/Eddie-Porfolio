"use client";

import { useSyncExternalStore } from "react";

/**
 * Component giúp tránh lỗi Hydration Mismatch bằng cách chỉ render nội dung
 * sau khi component đã được khởi tạo hoàn toàn trên trình duyệt.
 * Sử dụng useSyncExternalStore — giải pháp chính thức từ React để check Client/Server.
 */
function subscribe() {
  return () => {}; // No-op subscribe
}

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const isServer = useSyncExternalStore(
    subscribe,
    () => false, // Client snapshot
    () => true   // Server snapshot
  );

  if (isServer) {
    return null;
  }

  return <>{children}</>;
}
