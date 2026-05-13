import type { ReactNode } from "react";
import {
  ARTIFACT_TYPE_LABEL,
  LENS_LABEL,
  type Artifact,
} from "@/lib/artifacts";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Article({
  artifact,
  children,
}: {
  artifact: Artifact;
  children: ReactNode;
}) {
  return (
    <article className="artifact">
      <header className="artifact-header">
        <p className="meta artifact-type">
          {ARTIFACT_TYPE_LABEL[artifact.type]}
        </p>
        <h1>{artifact.title}</h1>
        <p className="artifact-summary">{artifact.summary}</p>
        <div className="artifact-byline meta">
          <span>{artifact.byline}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={artifact.publishedAt}>
            {formatDate(artifact.publishedAt)}
          </time>
          {artifact.updatedAt ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>Updated {formatDate(artifact.updatedAt)}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="artifact-body">{children}</div>

      {artifact.lenses.length > 0 ? (
        <footer className="artifact-footer">
          <p className="meta">Lenses applied</p>
          <ul className="lens-list">
            {artifact.lenses.map((lens) => (
              <li key={lens}>{LENS_LABEL[lens]}</li>
            ))}
          </ul>
        </footer>
      ) : null}
    </article>
  );
}
