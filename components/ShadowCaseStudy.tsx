import type { ShadowCase } from "@/lib/shadow-cases";

export function ShadowCaseStudy({ caseStudy }: { caseStudy: ShadowCase }) {
  return (
    <article className="shadow-case">
      <header className="artifact-header">
        <p className="meta artifact-type">
          Shadow case study · {caseStudy.engagementYear}
        </p>
        <h1>{caseStudy.categoryAndGeography}</h1>
      </header>

      <section>
        <h2>The Question</h2>
        <p>{caseStudy.theQuestion}</p>
      </section>

      <section>
        <h2>Why Existing Research Couldn&rsquo;t Answer It</h2>
        <p>{caseStudy.whyExistingResearchCouldntAnswerIt}</p>
      </section>

      <section>
        <h2>What We Did</h2>
        <p>{caseStudy.whatWeDid}</p>
      </section>

      <section>
        <h2>What We Delivered</h2>
        <p>{caseStudy.whatWeDelivered}</p>
      </section>

      <section>
        <h2>What Changed</h2>
        {caseStudy.whatChanged ? (
          <p>{caseStudy.whatChanged}</p>
        ) : (
          <p className="meta">
            Outcome not yet reportable. This section is left open
            deliberately.
          </p>
        )}
      </section>

      <footer className="artifact-footer">
        <p className="meta">Gott Data</p>
      </footer>
    </article>
  );
}
