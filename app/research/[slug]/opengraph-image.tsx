import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  artifacts,
  ARTIFACT_TYPE_LABEL,
  getArtifact,
} from "@/lib/artifacts";

export const alt = "Gott Data research artifact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return artifacts.map((a) => ({
    id: a.slug,
    alt: a.title,
    size,
    contentType,
  }));
}

const ink = "#14110f";
const paper = "#faf8f4";
const rule = "#d9d4c8";
const muted = "#6b6760";

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    .toUpperCase();
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArtifact(slug);
  if (!a) notFound();

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
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          <span>
            {ARTIFACT_TYPE_LABEL[a.type]} · {formatDate(a.publishedAt)}
          </span>
          <span>Gott Data</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {a.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ width: 64, height: 2, background: rule }} />
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 20,
                color: muted,
              }}
            >
              {a.byline}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
