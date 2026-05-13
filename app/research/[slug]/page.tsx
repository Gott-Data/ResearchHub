import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artifacts, getArtifact } from "@/lib/artifacts";
import { Article } from "@/components/Article";

export function generateStaticParams() {
  return artifacts.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArtifact(slug);
  if (!a) return { title: "Research" };
  return {
    title: a.title,
    description: a.summary,
  };
}

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArtifact(slug);
  if (!a) notFound();

  const mod = await a.content();
  const Content = mod.default;

  return (
    <main>
      <Article artifact={a}>
        <Content />
      </Article>
    </main>
  );
}
