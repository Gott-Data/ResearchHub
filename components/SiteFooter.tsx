export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="meta">
          Gott Data is the research arm of Laxatunga ehf.
        </p>
        <p className="meta">
          &copy; {new Date().getFullYear()} Laxatunga ehf.
        </p>
      </div>
    </footer>
  );
}
