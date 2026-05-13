import Link from "next/link";
import type { Metadata } from "next";
import { ARTIFACT_TYPE_LABEL, sortedArtifacts } from "@/lib/artifacts";

export const metadata: Metadata = {
  title: "Research — Gott Data",
  description:
    "Original research, methodology, and points of view on where categories are going.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ResearchIndex() {
  const items = sortedArtifacts();

  return (
    <main>
      <p className="meta">Research</p>
      <h1>What we have published.</h1>
      <p>
        Original research, methodology, and points of view. Every artifact is
        the product of the four-lens method: data, human, technology, category.
      </p>

      {items.length === 0 ? (
        <p className="meta empty-state">
          No artifacts have been published yet.
        </p>
      ) : (
        <ul className="artifact-index">
          {items.map((a) => (
            <li key={a.slug} className="artifact-index-item">
              <p className="meta">
                {ARTIFACT_TYPE_LABEL[a.type]} ·{" "}
                <time dateTime={a.publishedAt}>
                  {formatDate(a.publishedAt)}
                </time>
              </p>
              <h2>
                <Link href={`/research/${a.slug}`}>{a.title}</Link>
              </h2>
              <p>{a.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
