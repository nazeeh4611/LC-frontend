"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-bg-elevated">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? name}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-faint">No image available</div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, i) => (
            <button
              key={image.url + i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded border transition-colors",
                i === activeIndex ? "border-gold-bright" : "border-border hover:border-border-strong"
              )}
            >
              <Image src={image.url} alt={image.alt ?? name} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
