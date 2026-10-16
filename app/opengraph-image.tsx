import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — digital product studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card — no static asset required. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#08090B",
          color: "#F5F5F5",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(124,108,255,0.28), transparent 45%), radial-gradient(circle at 75% 35%, rgba(199,255,94,0.14), transparent 35%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F5F5F5", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: 8 }}>
            <div style={{ width: 9, height: 9, borderRadius: 9, background: "#C7FF5E" }} />
          </div>
          {siteConfig.name.toLowerCase()}
          <span style={{ color: "#C7FF5E", marginLeft: -16 }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <span>Building digital experiences</span>
          <span>
            that move businesses&nbsp;<span style={{ color: "#C7FF5E" }}>forward.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A1A1AA" }}>
          Strategy · UI/UX Design · Web Development · AI Products
        </div>
      </div>
    ),
    size,
  );
}
