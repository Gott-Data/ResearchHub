import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#14110f";
const paper = "#faf8f4";
const rule = "#d9d4c8";
const muted = "#6b6760";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: paper,
          color: ink,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          Gott Data
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 64,
                height: 2,
                background: rule,
              }}
            />
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 20,
                color: muted,
              }}
            >
              Research hub
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
