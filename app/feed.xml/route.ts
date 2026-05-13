import { sortedArtifacts } from "@/lib/artifacts";
import { site } from "@/lib/site";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = sortedArtifacts()
    .map((a) => {
      const link = `${site.url}/research/${a.slug}`;
      const pubDate = new Date(a.publishedAt).toUTCString();
      return `    <item>
      <title>${escape(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(a.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>research@gottdata.com (${escape(a.byline)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Research</title>
    <link>${site.url}/research</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(site.description)}</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
