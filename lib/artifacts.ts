export type ArtifactType =
  | "flagship"
  | "whitepaper"
  | "brief"
  | "methodology"
  | "framework"
  | "essay"
  | "shadow-case-study";

export type Lens = "data" | "human" | "technology" | "category";

import type { ComponentType } from "react";

export type Artifact = {
  slug: string;
  type: ArtifactType;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  byline: string;
  lenses: Lens[];
  content: () => Promise<{ default: ComponentType }>;
};

export const ARTIFACT_TYPE_LABEL: Record<ArtifactType, string> = {
  flagship: "Flagship research",
  whitepaper: "Whitepaper",
  brief: "Brief",
  methodology: "Methodology",
  framework: "Framework",
  essay: "Essay",
  "shadow-case-study": "Shadow case study",
};

export const LENS_LABEL: Record<Lens, string> = {
  data: "Data",
  human: "Human",
  technology: "Technology",
  category: "Category",
};

export const artifacts: Artifact[] = [];

export function getArtifact(slug: string): Artifact | undefined {
  return artifacts.find((a) => a.slug === slug);
}

export function artifactsByType(type: ArtifactType): Artifact[] {
  return artifacts.filter((a) => a.type === type);
}

export function sortedArtifacts(): Artifact[] {
  return [...artifacts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}
