import type { LucideIcon } from "lucide-react";
import {
  Newspaper,
  Trophy,
  Music2,
  Mic,
  Church,
  AudioLines,
  Guitar,
  Headphones,
} from "lucide-react";

export const GENRE_CHIPS: {
  label: string;
  tag: string;
  color: string;
  gradEnd: string;
  Icon: LucideIcon;
}[] = [
  { label: "News",      tag: "news",      color: "#FD685F", gradEnd: "#c62828", Icon: Newspaper },
  { label: "Sports",    tag: "sports",    color: "#E24B44", gradEnd: "#8e1c1c", Icon: Trophy },
  { label: "Music",     tag: "music",     color: "#F5C542", gradEnd: "#c8890a", Icon: Music2 },
  { label: "Talk",      tag: "talk",      color: "#9FAEFD", gradEnd: "#5c6bc0", Icon: Mic },
  { label: "Gospel",    tag: "gospel",    color: "#FEC25A", gradEnd: "#e09800", Icon: Church },
  { label: "Afrobeats", tag: "afrobeats", color: "#45C6FF", gradEnd: "#0277bd", Icon: AudioLines },
  { label: "Highlife",  tag: "highlife",  color: "#86A398", gradEnd: "#476054", Icon: Guitar },
  { label: "Urban",     tag: "urban",     color: "#B39DDB", gradEnd: "#5e35b1", Icon: Headphones },
];
