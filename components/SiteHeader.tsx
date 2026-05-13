import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark">
          Gott Data
        </Link>
        <nav aria-label="Primary">
          <Link href="/research">Research</Link>
          <Link href="/selected-work">Selected work</Link>
        </nav>
      </div>
    </header>
  );
}
