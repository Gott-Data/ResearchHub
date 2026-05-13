import type { MetadataRoute } from "next";
import { sortedArtifacts } from "@/lib/artifacts";
import { publishedShadowCases } from "@/lib/shadow-cases";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now },
    { url: `${site.url}/research`, lastModified: now },
    { url: `${site.url}/selected-work`, lastModified: now },
    { url: `${site.url}/about`, lastModified: now },
  ];

  const artifactRoutes: MetadataRoute.Sitemap = sortedArtifacts().map((a) => ({
    url: `${site.url}/research/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
  }));

  const caseRoutes: MetadataRoute.Sitemap = publishedShadowCases().map((c) => ({
    url: `${site.url}/selected-work/${c.slug}`,
    lastModified: new Date(c.updatedAt ?? c.publishedAt),
  }));

  return [...staticRoutes, ...artifactRoutes, ...caseRoutes];
}
