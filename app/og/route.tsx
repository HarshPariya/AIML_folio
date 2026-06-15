import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#05060a",
          backgroundImage:
            "radial-gradient(900px circle at 15% 0%, rgba(124,92,255,0.28), transparent 55%), radial-gradient(900px circle at 100% 100%, rgba(34,211,238,0.20), transparent 55%)",
          color: "#e9ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(135deg,#7c5cff,#a855f7,#f472b6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            HP
          </div>
          <div style={{ fontSize: 26, color: "#9aa3b8" }}>Harsh Pariya</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 30,
              color: "#22d3ee",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.role}
          </div>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, maxWidth: 920 }}>
            Building Intelligent Systems with AI &amp; Machine Learning
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{siteConfig.name}</div>
          <div
            style={{
              fontSize: 24,
              color: "#9aa3b8",
              display: "flex",
              gap: 24,
            }}
          >
            <span>LLMs</span>
            <span>·</span>
            <span>Deep Learning</span>
            <span>·</span>
            <span>GenAI</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
