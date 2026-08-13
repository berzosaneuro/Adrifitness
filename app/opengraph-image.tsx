import { ImageResponse } from "next/og";
import { BrandOgImage } from "@/lib/brand-og";

export const alt = "Adrián Method — Coaching de fitness online 1:1";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <BrandOgImage
        eyebrow="Coaching de fitness online 1:1"
        headline="Transforma tu cuerpo en"
        highlight="12 semanas"
      />
    ),
    { ...size }
  );
}
