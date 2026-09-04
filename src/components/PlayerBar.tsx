"use client";

import { Play, Pause, Volume2, VolumeX, Radio, Loader2 } from "lucide-react";
import EQBars from "./EQBars";
import type { Station } from "@/lib/stations";
import type { PlayerState } from "@/hooks/useRadio";

interface PlayerBarProps {
  current: Station | null;
  state: PlayerState;
  volume: number;
  muted: boolean;
  onTogglePlay: () => void;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
}

export default function PlayerBar({
  current,
  state,
  volume,
  muted,
  onTogglePlay,
  onVolumeChange,
  onToggleMute,
}: PlayerBarProps) {
  const playing = state === "playing";
  const loading = state === "loading";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-plasma/20"
      style={{
        background: "rgba(7,7,26,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Progress shimmer */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, #a855f7, #22d3ee, #a855f7, transparent)",
              animation: "shimmer 1.4s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      )}

      {/* Solid progress bar when playing */}
      {playing && current && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-plasma via-arc to-cyan" />
      )}

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Station info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="relative shrink-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
              style={{
                background: current
                  ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(34,211,238,0.1))"
                  : "rgba(13,13,38,0.8)",
              }}
            >
              {current?.favicon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.favicon}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <Radio size={16} className="text-dim" />
              )}
            </div>
            {playing && (
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-cosmos" />
            )}
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            {current ? (
              <>
                <p className="font-sans font-semibold text-sm text-star truncate leading-tight">
                  {current.name}
                </p>
                <p className="font-mono text-[10px] text-dim/70 truncate">
                  {[current.city, current.country, current.freq]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </>
            ) : (
              <p className="font-orbitron text-xs text-dim tracking-widest uppercase">
                Select a station
              </p>
            )}
          </div>

          {/* EQ bars */}
          <div className="player-meta">
            <EQBars playing={playing} size="md" color="#22d3ee" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live badge */}
          {playing && (
            <div className="player-meta flex items-center gap-1.5">
              <div className="relative w-2 h-2">
                <div className="live-ring" />
                <div className="relative w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-[10px] text-green-400 tracking-widest uppercase">
                Live
              </span>
            </div>
          )}

          {/* Play/Pause button */}
          <button
            onClick={onTogglePlay}
            disabled={!current}
            aria-label={playing ? "Pause" : "Play"}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
            style={{
              background: current
                ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                : "rgba(74,72,117,0.3)",
              boxShadow: current && (playing || loading)
                ? "0 0 24px rgba(168,85,247,0.5)"
                : "none",
            }}
          >
            {loading ? (
              <Loader2 size={18} className="text-white animate-spin" />
            ) : playing ? (
              <Pause size={18} className="text-white fill-white" />
            ) : (
              <Play size={18} className="text-white fill-white translate-x-0.5" />
            )}
          </button>

          {/* Volume */}
          <div className="player-meta flex items-center gap-2 w-32">
            <button
              onClick={onToggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-dim hover:text-arc transition-colors shrink-0"
            >
              {muted || volume === 0 ? (
                <VolumeX size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="flex-1"
              style={
                {
                  "--vol": `${(muted ? 0 : volume) * 100}%`,
                } as React.CSSProperties
              }
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
