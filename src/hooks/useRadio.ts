"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Station } from "@/lib/stations";

export type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

interface RadioStore {
  current: Station | null;
  state: PlayerState;
  volume: number;
  muted: boolean;
  favorites: Station[];
  play: (station: Station) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleFavorite: (station: Station) => void;
  isFavorite: (id: string) => boolean;
}

const FAV_KEY = "celestial_radio_favs";

export function useRadio(): RadioStore {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Station | null>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [favorites, setFavorites] = useState<Station[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAV_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  // Init audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audio.preload = "none";
    audioRef.current = audio;

    const onPlaying = () => setState("playing");
    const onPause = () => setState((s) => (s === "loading" ? s : "paused"));
    const onWaiting = () => setState("loading");
    const onError = () => setState("error");
    const onCanPlay = () => {
      audio.play().catch(() => setState("error"));
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("error", onError);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", onCanPlay);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback(async (station: Station) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Same station toggle
    if (current?.id === station.id) {
      if (state === "playing") {
        audio.pause();
        setState("paused");
      } else {
        setState("loading");
        try { await audio.play(); } catch { setState("error"); }
      }
      return;
    }

    // New station
    audio.pause();
    audio.src = "";
    setState("loading");
    setCurrent(station);

    try {
      audio.src = station.streamUrl;
      audio.load();
      // canplay event will trigger play
    } catch {
      setState("error");
    }
  }, [current, state]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (state === "playing") {
      audio.pause();
      setState("paused");
    } else {
      setState("loading");
      try { await audio.play(); } catch { setState("error"); }
    }
  }, [current, state]);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
    setVolumeState(v);
    if (v > 0) setMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  }, [muted]);

  const toggleFavorite = useCallback((station: Station) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === station.id);
      const next = exists ? prev.filter((f) => f.id !== station.id) : [...prev, station];
      try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return { current, state, volume, muted, favorites, play, togglePlay, setVolume, toggleMute, toggleFavorite, isFavorite };
}
