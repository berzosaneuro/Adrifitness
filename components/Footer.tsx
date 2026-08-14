export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <span className="font-display text-sm uppercase tracking-widest text-foreground-muted">
          Adrián Method
        </span>
        <p className="font-body text-xs text-foreground-muted">
          © {year} Adrián Method. Coaching de fitness online 1:1.
        </p>
        {/* TODO: enlazar aviso legal / política de privacidad en cuanto exista (obligatorio para el formulario de leads en España). */}
      </div>
    </footer>
  );
}
