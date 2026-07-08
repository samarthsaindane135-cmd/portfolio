export default function Footer() {
  return (
    <footer className="border-t border-muted/10 py-8">
      <div className="section-padding py-0 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="font-mono text-xs text-muted/40">
          &copy; {new Date().getFullYear()} Samarth Saindane
        </p>
        <p className="font-mono text-xs text-muted/40">
          Built with Next.js &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
