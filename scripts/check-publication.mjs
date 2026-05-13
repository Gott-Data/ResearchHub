#!/usr/bin/env node
// Build-time checks for the publication checklist (CLAUDE.md §3, §10).
// Scans every artifact MDX file for banned words, exclamation marks,
// emojis, and the section headings required by its artifact type.
// Templates under content/templates/ are scaffolds and are skipped.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const contentDir = join(root, "content", "research");

const BANNED_WORDS = [
  "unlock",
  "leverage",
  "synergy",
  "transform",
  "empower",
  "holistic",
  "disruptive",
  "seamless",
  "robust",
  "journey",
  "ecosystem",
  "curate",
  "paradigm",
  "deep-dive",
  "deep dive",
];

const BANNED_WORDS_NOTE = {
  leverage: "banned as a verb — flag and review use in context",
  transform: "banned as a generic claim — flag and review use in context",
  journey: "banned in the 'transformation journey' sense — review context",
  ecosystem: "banned unless literally meant — review context",
};

const EMOJI_RE =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

const REQUIRED_SECTIONS = {
  flagship: [
    "Why this question matters now",
    "What existing research says",
    "data lens",
    "human lens",
    "technology lens",
    "category lens",
    "Synthesis",
    "Recommendations",
    "What we considered and rejected",
    "What we are uncertain about",
    "Method and sources",
  ],
  whitepaper: [
    "Executive summary",
    "The question",
    "Research approach",
    "Findings",
    "Implications",
    "Recommendation",
    "Limitations",
    "Sources",
  ],
  brief: ["Why it matters", "What the evidence says", "What this means for you"],
  methodology: [
    "problem this method solves",
    "principle behind the method",
    "method",
    "anonymised example",
    "does not do",
  ],
  framework: [
    "problem",
    "framework",
    "components",
    "How to use it",
    "Where it breaks down",
  ],
  essay: [],
  "shadow-case-study": [],
};

function stripMdxComments(src) {
  return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".mdx") || entry.endsWith(".md")) out.push(full);
  }
  return out;
}

function loadArtifactRegistry() {
  const src = readFileSync(join(root, "lib", "artifacts.ts"), "utf8");
  const match = src.match(/export const artifacts: Artifact\[\] = \[([\s\S]*?)\];/);
  if (!match) return new Map();
  const body = match[1];
  const entries = body.match(/\{[\s\S]*?\}/g) ?? [];
  const map = new Map();
  for (const entry of entries) {
    const slug = entry.match(/slug:\s*["']([^"']+)["']/)?.[1];
    const type = entry.match(/type:\s*["']([^"']+)["']/)?.[1];
    if (slug && type) map.set(slug, type);
  }
  return map;
}

function checkFile(file, registry) {
  const findings = [];
  const raw = readFileSync(file, "utf8");
  const text = stripMdxComments(raw);

  for (const word of BANNED_WORDS) {
    const re = new RegExp(`\\b${word.replace(/[-]/g, "[-\\s]?")}\\b`, "gi");
    const hits = [...text.matchAll(re)];
    if (hits.length > 0) {
      const note = BANNED_WORDS_NOTE[word]
        ? ` (${BANNED_WORDS_NOTE[word]})`
        : "";
      findings.push(
        `banned word "${word}" appears ${hits.length} time(s)${note}`,
      );
    }
  }

  const exclam = (text.match(/!/g) || []).length;
  if (exclam > 0) {
    findings.push(`${exclam} exclamation mark(s) — CLAUDE.md §3 forbids them`);
  }

  if (EMOJI_RE.test(text)) {
    findings.push("emoji detected — CLAUDE.md §3 forbids emojis");
  }

  const rel = relative(root, file).replace(/\\/g, "/");
  const slugMatch = rel.match(/^content\/research\/([^/]+)\.mdx$/);
  if (slugMatch) {
    const slug = slugMatch[1];
    const type = registry.get(slug);
    if (!type) {
      findings.push(
        `artifact "${slug}" is not registered in lib/artifacts.ts`,
      );
    } else {
      const required = REQUIRED_SECTIONS[type] ?? [];
      const headings = [...text.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) =>
        m[1].toLowerCase(),
      );
      for (const section of required) {
        const present = headings.some((h) =>
          h.includes(section.toLowerCase()),
        );
        if (!present) {
          findings.push(
            `${type}: missing required section heading containing "${section}"`,
          );
        }
      }
    }
  }

  return findings;
}

function main() {
  let files = [];
  try {
    files = walk(contentDir).filter((f) => f.endsWith(".mdx"));
  } catch {
    // no content/research dir yet — nothing to check
  }

  if (files.length === 0) {
    console.log("publication check: no artifacts to scan.");
    return;
  }

  const registry = loadArtifactRegistry();
  let failed = false;

  for (const file of files) {
    const findings = checkFile(file, registry);
    const rel = relative(root, file).replace(/\\/g, "/");
    if (findings.length === 0) {
      console.log(`ok  ${rel}`);
    } else {
      failed = true;
      console.log(`fail ${rel}`);
      for (const f of findings) console.log(`     - ${f}`);
    }
  }

  if (failed) {
    console.log("\npublication check failed. See CLAUDE.md §3 and §10.");
    process.exit(1);
  }
  console.log("\npublication check passed.");
}

main();
