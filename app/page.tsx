import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p className="meta">Gott Data</p>
      <h1>
        Where will your category be in three years, and where should you be
        standing when it gets there.
      </h1>
      <p>
        Gott Data is a confidential research firm. We answer category foresight
        questions through four lenses: data, human, technology, and category.
      </p>
      <p>
        Our public work lives in the{" "}
        <Link href="/research">research hub</Link>.
      </p>
    </main>
  );
}
