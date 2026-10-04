"use client";

import Image from "next/image";
import { useState } from "react";

// Nothing is requested from YouTube before the click: the privacy policy promises no tracker until then.
export default function VideoEmbed({
  videoId,
  poster,
  title,
  playLabel,
  aspect = "16/9",
  className = "",
  playPosition = "bottom",
}: {
  videoId: string;
  poster: string;
  title: string;
  playLabel: string;
  aspect?: "9/16" | "16/9";
  className?: string;
  // "corner": white button bottom-right, the corner left empty on the designed Thrax thumbnails.
  playPosition?: "bottom" | "corner";
}) {
  const [playing, setPlaying] = useState(false);
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
  });

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-border bg-bg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            unoptimized
            className="object-cover"
          />
          <span
            className={
              playPosition === "corner"
                ? "absolute bottom-[3%] right-[3%]"
                : "absolute inset-x-0 bottom-[6%] flex flex-col items-center gap-2 sm:bottom-[8%] sm:gap-3"
            }
          >
            <span
              className={`flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 ${
                playPosition === "corner"
                  ? "h-9 w-9 bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.55)] sm:h-14 sm:w-14"
                  : "h-12 w-12 bg-accent text-bg sm:h-16 sm:w-16"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-5 w-5 sm:h-6 sm:w-6"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
            {playPosition === "bottom" ? (
              <span className="hidden text-sm font-medium text-text sm:block">{playLabel}</span>
            ) : null}
          </span>
        </button>
      )}
    </div>
  );
}
