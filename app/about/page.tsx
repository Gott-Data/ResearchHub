import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gott Data is the research arm of Laxatunga ehf. We answer category foresight questions for the people running the categories.",
};

export default function About() {
  return (
    <main>
      <p className="meta">About</p>
      <h1>The research arm of Laxatunga ehf.</h1>
      <p>
        Gott Data is a confidential research firm. We answer one strategic
        question better than anyone else we know of: where will your category
        be in three years, and where should you be standing when it gets
        there.
      </p>
      <p>
        Most of our work is private. We are hired by boards and senior
        operators who need an outside view on a category they are running
        from the inside, and we deliver that view as a confidential research
        artifact. The work does not appear in public unless the client
        approves a shadow case study — and even then, only by category and
        geography, never by name.
      </p>

      <h2>What we publish</h2>
      <p>
        The research hub exists to show how the firm thinks, not to advertise
        what the firm has done. You will find methodology, frameworks,
        points of view on where categories are going, and original public
        research on categories where we have both teachable insight and a
        demonstrable view.
      </p>
      <p>
        You will not find named client work or content written in the voice
        of a generic consulting firm.
      </p>

      <h2>The four-lens method</h2>
      <p>
        Every piece of original Gott Data research is built on four lenses:
        data, human, technology, and category. The discipline is to apply
        all four to any category question before publishing an answer. The
        method is described in full in{" "}
        <Link href="/research/four-lens-framework">
          The Four-Lens Framework
        </Link>
        .
      </p>

      <h2>Working with us</h2>
      <p>
        We take a small number of confidential engagements each year. If you
        run a category and need a three-year answer that is defensible to
        your board, write to us. We respond to every serious enquiry within
        a week.
      </p>
    </main>
  );
}
