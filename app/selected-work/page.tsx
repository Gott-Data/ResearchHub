import Link from "next/link";
import type { Metadata } from "next";
import { publishedShadowCases } from "@/lib/shadow-cases";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Shadow case studies. The shape of confidential engagements, without the client.",
};

export default function SelectedWorkIndex() {
  const cases = publishedShadowCases();

  return (
    <main>
      <p className="meta">Selected work</p>
      <h1>The shape of confidential engagements.</h1>
      <p>
        Most of our work is confidential. These shadow case studies describe
        the shape of engagements without identifying the client. Each follows
        the same five-part structure: the question, why existing research
        could not answer it, what we did, what we delivered, what changed.
      </p>
      <p>
        Clients approve every case study before it is published. Where
        identification risk remains, we do not publish.
      </p>

      {cases.length === 0 ? (
        <p className="meta empty-state">
          No case studies have been cleared for publication yet.
        </p>
      ) : (
        <ul className="artifact-index">
          {cases.map((c) => (
            <li key={c.slug} className="artifact-index-item">
              <p className="meta">
                Shadow case study · {c.engagementYear}
              </p>
              <h2>
                <Link href={`/selected-work/${c.slug}`}>
                  {c.categoryAndGeography}
                </Link>
              </h2>
              <p>{c.theQuestion}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
