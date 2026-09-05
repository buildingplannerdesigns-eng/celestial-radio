"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Home,
  Heart,
  Clock,
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Menu,
  X,
  Info,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Radio,
  Globe,
} from "lucide-react";
import { GhanaFlagIcon, AfricaIcon } from "./TabIcons";
import BrandMark from "./BrandMark";
import SiteFooter from "./SiteFooter";
import ThemeToggle from "./ThemeToggle";
import LegalSheet from "./LegalSheet";
import { Button } from "@/components/ui/button";
import { GHANA, AFRICA, LOCAL, type Station } from "@/lib/stations";
import { GENRE_CHIPS } from "@/lib/browse";
import type { LegalId } from "@/content/legal";

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";
type NavId = "home" | "ghana" | "africa" | "world" | "recents" | "saved";

interface SleepOption { label: string; secs: number; }
interface RBStation {
  stationuuid: string; name: string; country: string; tags: string;
  url_resolved: string; url: string; favicon: string; bitrate: number; homepage: string;
}

const PLACEHOLDER = ["#F5C542", "#9FAEFD", "#FEC25A", "#FD685F", "#45C6FF", "#86A398"];
const SLEEP_OPTIONS: SleepOption[] = [
  { label: "15 min", secs: 900 },
  { label: "30 min", secs: 1800 },
  { label: "60 min", secs: 3600 },
  { label: "90 min", secs: 5400 },
];
const RB_API = "https://de1.api.radio-browser.info/json";

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const rbToStation = (rb: RBStation): Station => ({
  id: rb.stationuuid, name: rb.name || "Unknown", city: "", country: rb.country || "World",
  freq: rb.bitrate ? `${rb.bitrate}kbps` : "Live", region: "world",
  tags: rb.tags ? rb.tags.split(",").slice(0, 4).map((t) => t.trim()).filter(Boolean) : [],
  streamUrl: rb.url_resolved || rb.url, favicon: rb.favicon || undefined, website: rb.homepage || undefined,
});
const byTag = (list: Station[], tags: string[]) =>
  list.filter((s) => s.tags.some((t) => tags.includes(t.toLowerCase())));
const placeholderColor = (id: string) =>
  PLACEHOLDER[Math.abs([...id].reduce((a, c) => a + c.charCodeAt(0), 0)) % PLACEHOLDER.length];
const initials = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function artCandidates(src?: string, website?: string): string[] {
  const out: string[] = [];
  const tiny = (url: string) => /google\.com\/s2\/favicons/.test(url) && !/sz=256/.test(url);
  if (src && !tiny(src)) {
    const cleaned = src.replace(/^\/?logo\//, "/logos/");
    out.push(cleaned.startsWith("http") || cleaned.startsWith("/") ? cleaned : `/${cleaned}`);
  }
  let host = "";
  try { if (website) host = new URL(website).hostname.replace(/^www\./, ""); } catch { /* ignore */ }
  if (!host && src && !src.startsWith("/") && /^https?:/.test(src)) {
    try { host = new URL(src).hostname.replace(/^www\./, ""); } catch { /* ignore */ }
  }
  if (host) {
    out.push(`https://www.google.com/s2/favicons?sz=256&domain=${host}`);
  }
  return [...new Set(out)];
}

/* ─── Artwork ───────────────────────────────────────────────── */
function StationArt({ src, name, id, website, size = 160, eager = false }: { src?: string; name: string; id: string; website?: string; size?: number; eager?: boolean }) {
  const sources = artCandidates(src, website);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    setIdx(0);
  }, [src, website, id]);
  const currentSrc = ready ? sources[idx] : undefined;
  const skip = () => setIdx((n) => n + 1);
  return (
    <div className="tile-art" style={size !== 160 ? { width: size, height: size } : undefined}>
      {currentSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentSrc} alt="" loading={eager ? "eager" : "lazy"} decoding="async"
          onError={skip}
          onLoad={(e) => { if (e.currentTarget.naturalWidth > 0 && e.currentTarget.naturalWidth < 48) skip(); }}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: size > 80 ? 10 : 6, background: "#fff" }} />
      ) : (
        <div style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: placeholderColor(id), color: "#0B1020", fontWeight: 800, fontSize: size * 0.28, letterSpacing: "-0.04em",
        }}>{initials(name)}</div>
      )}
    </div>
  );
}

function EQ({ on, size = 18 }: { on: boolean; size?: number }) {
  const timings = [0.58, 0.50, 0.65, 0.44, 0.52, 0.62, 0.48, 0.56];
  const delays = [0, 0.09, 0.04, 0.14, 0.07, 0.11, 0.03, 0.06];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: size, flexShrink: 0 }}>
      {timings.map((t, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2, background: on ? "var(--accent)" : "rgba(139,143,168,0.35)",
          height: on ? 4 : 3,
          animation: on ? `ceq${i + 1} ${t}s ease-in-out ${delays[i]}s infinite` : "none",
        }} />
      ))}
    </div>
  );
}

/* ─── Station tile ──────────────────────────────────────────── */
function StationTile({ s, active, playing, loading, fav, onPlay, onFav, onInfo }: {
  s: Station; active: boolean; playing: boolean; loading: boolean; fav: boolean;
  onPlay: (s: Station) => void; onFav: (s: Station) => void; onInfo: (s: Station) => void;
}) {
  return (
    <div className="station-tile" role="button" tabIndex={0}
      onClick={() => onPlay(s)}
      onKeyDown={(e) => e.key === "Enter" && onPlay(s)}
    >
      <div style={{ position: "relative" }}>
        <StationArt src={s.favicon} name={s.name} id={s.id} website={s.website} />
        <div className="tile-play" style={playing || loading ? { opacity: 1 } : undefined}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)",
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          }}>
            {loading ? <Loader2 size={22} className="animate-spin" />
              : playing ? <Pause size={22} fill="currentColor" />
              : <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />}
          </div>
        </div>
        {playing && (
          <span style={{
            position: "absolute", top: 8, left: 8, background: "var(--live)", color: "#fff",
            fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "3px 7px", borderRadius: 4,
          }}>LIVE</span>
        )}
        <div className="tile-actions">
          <button onClick={(e) => { e.stopPropagation(); onFav(s); }} title={fav ? "Unsave" : "Save"}
            style={{
              position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%",
              border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(16,19,31,0.7)", color: fav ? "var(--live)" : "#fff",
            }}>
            <Heart size={14} fill={fav ? "currentColor" : "none"} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onInfo(s); }} title="Station info"
            style={{
              position: "absolute", bottom: 8, right: 8, width: 28, height: 28, borderRadius: "50%",
              border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(16,19,31,0.7)", color: "#fff",
            }}>
            <Info size={14} />
          </button>
        </div>
      </div>
      <p style={{ margin: "10px 0 2px", fontWeight: 700, fontSize: 14, lineHeight: 1.3, color: "var(--text)",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {s.name}
      </p>
      <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {[s.city, s.country, s.freq].filter(Boolean).join(" · ")}
      </p>
    </div>
  );
}

function useHScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (el.scrollWidth <= el.clientWidth + 4) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return {
    ref,
    scroll,
    handlers: {
      onMouseDown: (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        drag.current = { down: true, startX: e.pageX, startLeft: el.scrollLeft, moved: false };
      },
      onMouseMove: (e: React.MouseEvent) => {
        if (!drag.current.down || !ref.current) return;
        const dx = e.pageX - drag.current.startX;
        if (Math.abs(dx) > 6) drag.current.moved = true;
        ref.current.scrollLeft = drag.current.startLeft - dx;
      },
      onMouseUp: () => { drag.current.down = false; },
      onMouseLeave: () => { drag.current.down = false; },
      onClickCapture: (e: React.MouseEvent) => {
        if (!drag.current.moved) return;
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      },
    },
  };
}

function StationRow({ title, stations, current, state, favorites, onPlay, onFav, onInfo, onSeeAll }: {
  title: string; stations: Station[]; current: Station | null; state: PlayerState; favorites: Station[];
  onPlay: (s: Station) => void; onFav: (s: Station) => void; onInfo: (s: Station) => void; onSeeAll?: () => void;
}) {
  const { ref, scroll, handlers } = useHScroll();
  if (!stations.length) return null;
  return (
    <section style={{ marginBottom: 36, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
        <h2 className="row-title">{title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {onSeeAll && (
            <button onClick={onSeeAll} style={{ background: "none", border: 0, color: "var(--accent)", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              See all
            </button>
          )}
          <Button variant="outline" size="icon-sm" onClick={() => scroll(-1)} aria-label="Scroll left"><ChevronLeft /></Button>
          <Button variant="outline" size="icon-sm" onClick={() => scroll(1)} aria-label="Scroll right"><ChevronRight /></Button>
        </div>
      </div>
      <div ref={ref} className="station-scroller" {...handlers}>
        {stations.map((s) => (
          <StationTile key={s.id} s={s}
            active={current?.id === s.id}
            playing={current?.id === s.id && state === "playing"}
            loading={current?.id === s.id && state === "loading"}
            fav={favorites.some((f) => f.id === s.id)}
            onPlay={onPlay} onFav={onFav} onInfo={onInfo} />
        ))}
      </div>
    </section>
  );
}

function BrowseRow({ onPick }: { onPick: (tag: string) => void }) {
  const { ref, scroll, handlers } = useHScroll();
  return (
    <section style={{ marginBottom: 36, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
        <h2 className="row-title">Browse</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="outline" size="icon-sm" onClick={() => scroll(-1)} aria-label="Scroll browse left"><ChevronLeft /></Button>
          <Button variant="outline" size="icon-sm" onClick={() => scroll(1)} aria-label="Scroll browse right"><ChevronRight /></Button>
        </div>
      </div>
      <div ref={ref} className="browse-row" {...handlers}>
        {GENRE_CHIPS.map((g) => (
          <button
            key={g.tag}
            type="button"
            className="browse-card"
            style={{ background: `linear-gradient(135deg, ${g.color} 0%, ${g.gradEnd} 100%)` }}
            onClick={() => onPick(g.tag)}
          >
            <g.Icon className="browse-card-icon" size={36} strokeWidth={1.8} />
            <span className="browse-card-label">{g.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function StationGrid({ stations, current, state, favorites, onPlay, onFav, onInfo, empty }: {
  stations: Station[]; current: Station | null; state: PlayerState; favorites: Station[];
  onPlay: (s: Station) => void; onFav: (s: Station) => void; onInfo: (s: Station) => void; empty: string;
}) {
  if (!stations.length) {
    return <p style={{ color: "var(--muted)", padding: "48px 0", textAlign: "center" }}>{empty}</p>;
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px 16px" }}>
      {stations.map((s) => (
        <StationTile key={s.id} s={s}
          active={current?.id === s.id}
          playing={current?.id === s.id && state === "playing"}
          loading={current?.id === s.id && state === "loading"}
          fav={favorites.some((f) => f.id === s.id)}
          onPlay={onPlay} onFav={onFav} onInfo={onInfo} />
      ))}
    </div>
  );
}

/* ─── Info modal ────────────────────────────────────────────── */
function InfoModal({ s, onClose, onPlay, playing, onShare }: {
  s: Station; onClose: () => void; onPlay: (s: Station) => void; playing: boolean; onShare: (s: Station) => void;
}) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200, background: "var(--overlay)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 24,
        maxWidth: 420, width: "100%", animation: "modalIn .2s ease",
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
          <StationArt src={s.favicon} name={s.name} id={s.id} website={s.website} size={72} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>{s.name}</h3>
            <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 13 }}>
              {[s.city, s.country, s.freq].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: 0, color: "var(--muted)", cursor: "pointer" }}><X size={20} /></button>
        </div>
        {s.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {s.tags.map((t) => (
              <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(245,197,66,0.16)", color: "var(--accent)", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onPlay(s)} style={{
            flex: 1, padding: "12px 0", borderRadius: 10, border: 0, cursor: "pointer",
            background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 800, fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            {playing ? "Pause" : "Listen now"}
          </button>
          {s.website && (
            <a href={s.website} target="_blank" rel="noopener noreferrer" style={{
              padding: 12, borderRadius: 10, border: "1px solid var(--line)", color: "var(--text)", display: "flex",
            }}><ExternalLink size={16} /></a>
          )}
          <button onClick={() => onShare(s)} style={{
            padding: 12, borderRadius: 10, border: "1px solid var(--line)", background: "none", color: "var(--text)", cursor: "pointer",
          }}><Share2 size={16} /></button>
        </div>
      </div>
    </div>
  );
}

/* ─── Player ────────────────────────────────────────────────── */
function PlayerBar({ current, state, volume, muted, sleepLeft, fav, onToggle, onVolume, onMute, onSleep, onClearSleep, onFav }: {
  current: Station | null; state: PlayerState; volume: number; muted: boolean;
  sleepLeft: number | null; fav: boolean;
  onToggle: () => void; onVolume: (v: number) => void; onMute: () => void;
  onSleep: (s: number) => void; onClearSleep: () => void; onFav: () => void;
}) {
  const playing = state === "playing", loading = state === "loading", err = state === "error";
  const [showSleep, setShowSleep] = useState(false);

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 80,
      background: "var(--player)", borderTop: "1px solid var(--line)", backdropFilter: "blur(20px)",
    }}>
      {loading && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,transparent,var(--accent),transparent)", animation: "shimmer 1.3s linear infinite", backgroundSize: "200% 100%" }} />
        </div>
      )}
      {playing && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--accent)" }} />}

      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px 12px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          {current
            ? <StationArt src={current.favicon} name={current.name} id={current.id} website={current.website} size={56} />
            : (
              <div className="tile-art" style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", background: "#0B1020" }}>
                <Radio size={20} color="#F5C542" />
              </div>
            )
          }
          <div style={{ minWidth: 0 }}>
            {current ? (
              <>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{current.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: err ? "var(--live)" : "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {err ? "Stream unavailable" : [current.city, current.country, current.freq].filter(Boolean).join(" · ")}
                </p>
              </>
            ) : (
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>Pick a station to start listening</p>
            )}
          </div>
          {playing && (
            <span className="player-live" style={{ display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ position: "relative", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--live)", animation: "livePulse 1.6s ease-out infinite" }} />
                <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: "var(--live)", position: "relative" }} />
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--live)", letterSpacing: "0.08em" }}>LIVE</span>
            </span>
          )}
        </div>

        <button onClick={onToggle} disabled={!current} aria-label={playing ? "Pause" : "Play"} style={{
          width: 52, height: 52, borderRadius: "50%", border: 0, flexShrink: 0,
          cursor: current ? "pointer" : "not-allowed",
          background: current ? "var(--accent)" : "var(--card)",
          color: current ? "var(--accent-ink)" : "var(--muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {loading ? <Loader2 size={22} className="animate-spin" />
            : playing ? <Pause size={22} fill="currentColor" />
            : <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />}
        </button>

        <ThemeToggle label={false} />
        <div className="player-desktop">
          {playing && <EQ on />}
          {current && (
            <button onClick={onFav} style={{ background: "none", border: 0, cursor: "pointer", color: fav ? "var(--live)" : "var(--muted)" }}>
              <Heart size={18} fill={fav ? "currentColor" : "none"} />
            </button>
          )}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowSleep((v) => !v)} style={{
              background: "none", border: 0, cursor: "pointer", color: sleepLeft ? "var(--accent)" : "var(--muted)",
              display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700,
            }}>
              <Clock size={16} />
              {sleepLeft != null ? fmtTime(sleepLeft) : "Sleep"}
            </button>
            {showSleep && (
              <div style={{
                position: "absolute", bottom: "calc(100% + 8px)", right: 0, background: "var(--card)",
                border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", minWidth: 120, zIndex: 90,
              }}>
                {SLEEP_OPTIONS.map((o) => (
                  <button key={o.secs} onClick={() => { onSleep(o.secs); setShowSleep(false); }}
                    style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: 0, cursor: "pointer", textAlign: "left", color: "var(--text)", fontSize: 13 }}>
                    {o.label}
                  </button>
                ))}
                {sleepLeft != null && (
                  <button onClick={() => { onClearSleep(); setShowSleep(false); }}
                    style={{ display: "block", width: "100%", padding: "10px 14px", background: "none", border: 0, borderTop: "1px solid var(--line)", cursor: "pointer", textAlign: "left", color: "var(--live)", fontSize: 13 }}>
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="player-volume">
          <button type="button" onClick={onMute} aria-label={muted || volume === 0 ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
            onChange={(e) => onVolume(parseFloat(e.target.value))}
            aria-label="Volume"
            style={{ "--vol": `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function CelestialRadio() {
  const [nav, setNav] = useState<NavId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [current, setCurrent] = useState<Station | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [favorites, setFavorites] = useState<Station[]>([]);
  const [recent, setRecent] = useState<Station[]>([]);
  const [worldStations, setWorldStations] = useState<Station[]>([]);
  const [worldLoading, setWorldLoading] = useState(false);
  const [modal, setModal] = useState<Station | null>(null);
  const [sleepSecs, setSleepSecs] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [searchD, setSearchD] = useState("");
  const [legalPage, setLegalPage] = useState<LegalId | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<Station | null>(null);
  const sleepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audioRef.current = audio;
    audio.addEventListener("playing", () => setPlayerState("playing"));
    audio.addEventListener("waiting", () => setPlayerState("loading"));
    audio.addEventListener("error", () => setPlayerState("error"));
    audio.addEventListener("pause", () => setPlayerState((s) => (s === "loading" ? s : "paused")));
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    try { const f = localStorage.getItem("cr_favs"); if (f) setFavorites(JSON.parse(f)); } catch {}
    try { const r = localStorage.getItem("cr_recent"); if (r) setRecent(JSON.parse(r)); } catch {}
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "ghana" || tab === "africa" || tab === "world" || tab === "saved" || tab === "recents") {
      setNav(tab);
    }
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); handleToggle(); }
      if (e.code === "KeyM") handleMute();
      if (e.code === "ArrowUp") { e.preventDefault(); handleVolume(Math.min(1, (audioRef.current?.volume ?? 0.8) + 0.05)); }
      if (e.code === "ArrowDown") { e.preventDefault(); handleVolume(Math.max(0, (audioRef.current?.volume ?? 0.8) - 0.05)); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  useEffect(() => {
    const t = setTimeout(() => setSearchD(search), 380);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (nav !== "home" && nav !== "world") return;
    if (nav === "home" && (searchD || activeTag)) return;
    let cancelled = false;
    const load = () => {
      const p = new URLSearchParams({
        limit: nav === "world" ? "48" : "16",
        order: "votes",
        reverse: "true",
        hidebroken: "true",
      });
      if (nav === "world") {
        if (searchD) p.set("name", searchD);
        if (activeTag) p.set("tag", activeTag);
        setWorldLoading(true);
      }
      fetch(`${RB_API}/stations/search?${p}`)
        .then((r) => r.json())
        .then((d: RBStation[]) => {
          if (cancelled) return;
          setWorldStations(d.map(rbToStation));
          setWorldLoading(false);
        })
        .catch(() => { if (!cancelled) setWorldLoading(false); });
    };
    const delay = nav === "home" ? 1800 : 0;
    const t = setTimeout(load, delay);
    return () => { cancelled = true; clearTimeout(t); };
  }, [nav, searchD, activeTag]);

  useEffect(() => {
    if (sleepSecs == null) return;
    if (sleepRef.current) clearInterval(sleepRef.current);
    sleepRef.current = setInterval(() => {
      setSleepSecs((s) => {
        if (s == null || s <= 1) {
          clearInterval(sleepRef.current!);
          audioRef.current?.pause();
          setPlayerState("paused");
          showToast("Sleep timer ended");
          return null;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (sleepRef.current) clearInterval(sleepRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleepSecs !== null]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const handlePlay = useCallback(async (s: Station) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!s.streamUrl) {
      setPlayerState("error");
      setCurrent(s); currentRef.current = s;
      showToast("This station has no live stream right now");
      setModal(null);
      return;
    }
    if (currentRef.current?.id === s.id) {
      if (audio.paused) { setPlayerState("loading"); audio.play().catch(() => setPlayerState("error")); }
      else audio.pause();
      setModal(null); return;
    }
    audio.pause();
    setPlayerState("loading");
    setCurrent(s); currentRef.current = s;
    audio.src = s.streamUrl;
    try {
      await audio.play();
      setRecent((prev) => {
        const next = [s, ...prev.filter((r) => r.id !== s.id)].slice(0, 12);
        try { localStorage.setItem("cr_recent", JSON.stringify(next)); } catch {}
        return next;
      });
    } catch { setPlayerState("error"); showToast("This stream is unavailable right now"); }
    setModal(null);
  }, []);

  const handleToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentRef.current) return;
    if (!audio.paused) audio.pause();
    else { setPlayerState("loading"); audio.play().catch(() => setPlayerState("error")); }
  }, []);

  const handleVolume = (v: number) => { if (audioRef.current) audioRef.current.volume = v; setVolumeState(v); setMuted(false); };
  const handleMute = () => { const a = audioRef.current; if (!a) return; a.muted = !a.muted; setMuted(a.muted); };

  const handleFav = (s: Station) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === s.id);
      const next = exists ? prev.filter((f) => f.id !== s.id) : [...prev, s];
      try { localStorage.setItem("cr_favs", JSON.stringify(next)); } catch {}
      showToast(exists ? `Removed ${s.name}` : `Saved ${s.name}`);
      return next;
    });
  };

  const handleShare = (s: Station) => {
    const url = `${window.location.href.split("?")[0]}?station=${s.id}`;
    navigator.clipboard?.writeText(url).then(() => showToast("Link copied")).catch(() => {});
  };

  const go = (id: NavId) => { setNav(id); setSidebarOpen(false); setActiveTag(""); if (id !== "world") setSearch(""); };

  const filterList = (list: Station[]) => {
    const q = searchD.toLowerCase();
    return list.filter((s) =>
      (!q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)) &&
      (!activeTag || s.tags.includes(activeTag))
    );
  };

  const searching = searchD.length > 0 || activeTag.length > 0;
  const searchPool = nav === "world" ? worldStations : nav === "africa" ? AFRICA : nav === "saved" ? favorites : nav === "recents" ? recent : nav === "ghana" ? GHANA : LOCAL;
  const searchResults = filterList(searchPool);
  const featured = current || recent[0] || GHANA[0];
  const pageTitle: Record<NavId, string> = {
    home: "Home", ghana: "Ghana Radio", africa: "Africa", world: "World", recents: "Recently Played", saved: "Saved",
  };

  const navItems: { id: NavId; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "ghana", label: "Ghana", icon: <GhanaFlagIcon size={18} /> },
    { id: "africa", label: "Africa", icon: <AfricaIcon size={18} color="currentColor" /> },
    { id: "world", label: "World", icon: <Globe size={18} /> },
    { id: "recents", label: "Recents", icon: <Clock size={18} /> },
    { id: "saved", label: "Saved", icon: <Heart size={18} /> },
  ];

  const tileProps = { current, state: playerState, favorites, onPlay: handlePlay, onFav: handleFav, onInfo: setModal };

  const sidebarInner = (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "0 4px 28px" }}>
        <button onClick={() => go("home")} aria-label="Celestial Radio home" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "inherit" }}>
          <BrandMark size={42} />
        </button>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={18} /></button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {navItems.slice(0, 1).map((item) => (
          <button key={item.id} className={`nav-item${nav === item.id ? " active" : ""}`} onClick={() => go(item.id)}>
            {item.icon}
            {item.label}
          </button>
        ))}
        {navItems.slice(4).map((item) => (
          <button key={item.id} className={`nav-item${nav === item.id ? " active" : ""}`} onClick={() => go(item.id)}>
            {item.icon}
            {item.label}
            {item.id === "saved" && favorites.length > 0 && (
              <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.8 }}>{favorites.length}</span>
            )}
          </button>
        ))}
        <div className="nav-label">Browse</div>
        {navItems.slice(1, 4).map((item) => (
          <button key={item.id} className={`nav-item${nav === item.id ? " active" : ""}`} onClick={() => go(item.id)}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="theme-sidebar">
        <ThemeToggle />
      </div>
    </>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", display: "flex" }}>
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="sidebar-backdrop" />
      )}

      <aside className={`app-sidebar${sidebarOpen ? " open" : ""}`}>
        {sidebarInner}
      </aside>

      <div style={{ flex: 1, minWidth: 0, paddingBottom: 96 }}>
        <header style={{
          position: "sticky", top: 0, zIndex: 30, background: "var(--header)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--line)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12,
        }}>
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu" className="mobile-menu">
            <Menu size={22} />
          </button>
          <div style={{ position: "relative", flex: 1, maxWidth: 560 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
            <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search live radio, cities, or genres" />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: 0, color: "var(--muted)", cursor: "pointer" }}>
                <X size={16} />
              </button>
            )}
          </div>
          <ThemeToggle />
        </header>

        <main style={{ padding: "24px 20px 8px", maxWidth: 1180, minWidth: 0 }}>
          {searching ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <h1 className="row-title">
                  {activeTag ? GENRE_CHIPS.find((g) => g.tag === activeTag)?.label || activeTag : `Results for “${searchD}”`}
                </h1>
                <button onClick={() => { setSearch(""); setActiveTag(""); }} style={{ background: "none", border: 0, color: "var(--accent)", cursor: "pointer", fontWeight: 700 }}>
                  Clear
                </button>
              </div>
              {worldLoading && nav === "world"
                ? <p style={{ color: "var(--muted)" }}>Searching the world dial…</p>
                : <StationGrid stations={searchResults} empty="No stations found" {...tileProps} />}
            </>
          ) : nav === "home" ? (
            <>
              <section className="hero-banner">
                <div className="hero-copy">
                  <p className="hero-kicker">{current ? "Now playing" : "Live radio"}</p>
                  <h1>{current ? featured.name : "Hear Ghana. Hear Africa. Hear the world."}</h1>
                  <p className="hero-sub">
                    {current
                      ? [featured.city, featured.country, featured.freq].filter(Boolean).join(" · ")
                      : "News, music, talk and gospel from the stations you already love — plus the rest of the dial."}
                  </p>
                  <button className="listen-btn" onClick={() => handlePlay(featured)}>
                    {current?.id === featured.id && playerState === "playing"
                      ? <><Pause size={16} fill="currentColor" /> Pause</>
                      : <><Play size={16} fill="currentColor" /> Listen now</>}
                  </button>
                </div>
                <div className="hero-art-wrap">
                  <div className="hero-art-offset" />
                  <StationArt src={featured.favicon} name={featured.name} id={featured.id} website={featured.website} size={180} eager />
                </div>
              </section>

              <BrowseRow onPick={setActiveTag} />

              <StationRow title="Recently played" stations={recent} onSeeAll={() => go("recents")} {...tileProps} />
              <StationRow title="Local radio" stations={GHANA} onSeeAll={() => go("ghana")} {...tileProps} />
              <StationRow title="Volta" stations={byTag(GHANA, ["volta"])} {...tileProps} />
              <StationRow title="Africa" stations={AFRICA} onSeeAll={() => go("africa")} {...tileProps} />
              <StationRow title="Sports" stations={byTag(LOCAL, ["sports"])} {...tileProps} />
              <StationRow title="News & talk" stations={byTag(LOCAL, ["news", "talk"])} {...tileProps} />
              <StationRow title="Music" stations={byTag(LOCAL, ["music", "afrobeats", "urban", "hiphop", "pop", "highlife"])} {...tileProps} />
              <StationRow title="Gospel" stations={byTag(LOCAL, ["gospel", "christian"])} {...tileProps} />
              <StationRow title="World radio" stations={worldStations.slice(0, 16)} onSeeAll={() => go("world")} {...tileProps} />
            </>
          ) : (
            <>
              <h1 className="row-title" style={{ marginBottom: 18 }}>{pageTitle[nav]}</h1>
              {nav === "world" && worldLoading
                ? <p style={{ color: "var(--muted)" }}>Tuning into stations worldwide…</p>
                : (
                  <StationGrid
                    stations={
                      nav === "ghana" ? GHANA
                        : nav === "africa" ? AFRICA
                        : nav === "world" ? worldStations
                        : nav === "recents" ? recent
                        : favorites
                    }
                    empty={nav === "saved" ? "Save a station with the heart to find it here." : nav === "recents" ? "Play something and it will show up here." : "No stations found"}
                    {...tileProps}
                  />
                )}
            </>
          )}
        </main>
        <SiteFooter onListen={go} onLegal={setLegalPage} />
      </div>

      <PlayerBar
        current={current} state={playerState} volume={volume} muted={muted} sleepLeft={sleepSecs}
        fav={!!current && favorites.some((f) => f.id === current.id)}
        onToggle={handleToggle} onVolume={handleVolume} onMute={handleMute}
        onSleep={setSleepSecs}
        onClearSleep={() => { if (sleepRef.current) clearInterval(sleepRef.current); setSleepSecs(null); showToast("Sleep timer cancelled"); }}
        onFav={() => { if (current) handleFav(current); }}
      />

      <LegalSheet page={legalPage} onClose={() => setLegalPage(null)} />
      {modal && (
        <InfoModal s={modal} onClose={() => setModal(null)} onPlay={handlePlay}
          playing={current?.id === modal.id && playerState === "playing"} onShare={handleShare} />
      )}
      {toast && (
        <div style={{
          position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
          background: "var(--ink, #1C203C)", color: "#fff", padding: "10px 18px", borderRadius: 999,
          fontSize: 13, zIndex: 9999, animation: "toastIn .25s ease",
        }}>{toast}</div>
      )}
    </div>
  );
}
