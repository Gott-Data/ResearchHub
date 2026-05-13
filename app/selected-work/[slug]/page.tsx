import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getShadowCase,
  publishedShadowCases,
} from "@/lib/shadow-cases";
import { ShadowCaseStudy } from "@/components/ShadowCaseStudy";

export function generateStaticParams() {
  return publishedShadowCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getShadowCase(slug);
  if (!c) return { title: "Selected work" };
  return {
    title: `${c.categoryAndGeography} — Selected work`,
    description: c.theQuestion,
  };
}

export default async function ShadowCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getShadowCase(slug);
  if (!caseStudy) notFound();

  return (
    <main>
      <ShadowCaseStudy caseStudy={caseStudy} />
    </main>
  );
}
