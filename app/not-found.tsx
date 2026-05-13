import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <p className="meta">404</p>
      <h1>This page is not here.</h1>
      <p>
        The artifact you are looking for has either not been published or has
        moved. The research hub is at{" "}
        <Link href="/research">/research</Link>.
      </p>
    </main>
  );
}
