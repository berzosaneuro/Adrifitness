interface VideoFrameProps {
  /** URL de vídeo directo (mp4/webm) o embed (YouTube/Vimeo). undefined = placeholder honesto. */
  src?: string;
  title: string;
  className?: string;
}

// Mismo principio que PhotoFrame: mientras Adrián no grabe y mande un
// vídeo de presentación, no fingimos que existe uno roto — mostramos un
// estado vacío diseñado a propósito. En cuanto haya `src`, se renderiza
// tal cual (iframe si es una URL de embed conocida, <video> si es un
// archivo directo) sin tocar el layout de quien lo use.
export function VideoFrame({ src, title, className = "" }: VideoFrameProps) {
  const isEmbed = src ? /youtube\.com|youtu\.be|vimeo\.com/.test(src) : false;

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-3xl border border-border-strong shadow-glow-secondary ${className}`}
    >
      {src ? (
        isEmbed ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <video src={src} controls className="h-full w-full object-cover" />
        )
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-background-elevated via-background to-background-elevated">
          <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-primary/30 text-2xl text-accent-primary/40">
            ▶
          </span>
          <span className="max-w-[70%] text-center font-body text-xs uppercase tracking-widest text-foreground-muted">
            Vídeo de presentación — próximamente
          </span>
        </div>
      )}
    </div>
  );
}
