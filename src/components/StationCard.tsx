"use client";

import { Heart, Radio } from "lucide-react";
import EQBars from "./EQBars";
import type { Station } from "@/lib/stations";
import type { PlayerState } from "@/hooks/useRadio";

interface StationCardProps {
  station: Station;
  isActive: boolean;
  playerState: PlayerState;
  isFavorite: boolean;
  onPlay: (s: Station) => void;
  onToggleFavorite: (s: Station) => void;
}

const regionBadge: Record<Station["region"], { label: string; cls: string }> = {
  ghana: { label: "🇬🇭 GH", cls: "text-yellow-400 bg-yellow-400/10" },
  africa: { label: "🌍 AF", cls: "text-emerald-400 bg-emerald-400/10" },
  world: { label: "🌐 WD", cls: "text-blue-400 bg-blue-400/10" },
};

export default function StationCard({
  station,
  isActive,
  playerState,
  isFavorite,
  onPlay,
  onToggleFavorite,
}: StationCardProps) {
  const badge = regionBadge[station.region];
  const playing = isActive && playerState === "playing";
  const loading = isActive && playerState === "loading";

  return (
    <div
      onClick={() => onPlay(station)}
      className={`glass-card rounded-xl p-4 cursor-pointer relative overflow-hidden group select-none ${
        isActive ? "active" : ""
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Play ${station.name}`}
      onKeyDown={(e) => e.key === "Enter" && onPlay(station)}
    >
      {/* Active glow pulse */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* Scan line on active */}
      {playing && <div className="scan-line" />}

      {/* Top row: favicon + freq + fav button */}
      <div className="flex items-start justify-between mb-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-void border border-white/5 flex items-center justify-center overflow-hidden">
            {station.favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={station.favicon}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <Radio size={18} className="text-dim" />
            )}
          </div>
          {/* Live indicator */}
          {isActive && (
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-cosmos" />
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(station);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="p-1 rounded-md transition-transform hover:scale-125 focus:outline-none"
        >
          <Heart
            size={15}
            className={
              isFavorite ? "fill-arc text-arc" : "text-dim/60"
            }
          />
        </button>
      </div>

      {/* Name */}
      <p className="font-sans font-semibold text-[13px] leading-tight text-star/90 mb-1 line-clamp-2 group-hover:text-arc transition-colors">
        {station.name}
      </p>

      {/* City / country */}
      <p className="font-mono text-[10px] text-dim/70 mb-2">
        {station.city ? `${station.city}, ` : ""}
        {station.country}
        {station.freq ? ` · ${station.freq}` : ""}
      </p>

      {/* Tags + EQ */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          <span
            className={`font-mono text-[9px] px-1.5 py-0.5 rounded-full font-medium ${badge.cls}`}
          >
            {badge.label}
          </span>
          {station.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded-full text-dim/70 bg-dim/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* EQ or loading */}
        {loading ? (
          <div className="flex gap-[3px] items-end h-[16px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-arc"
                style={{
                  height: "6px",
                  animation: `eq${i} 0.6s ease-in-out ${i * 0.12}s infinite`,
                }}
              />
            ))}
          </div>
        ) : (
          <EQBars playing={playing} size="sm" />
        )}
      </div>
    </div>
  );
}
