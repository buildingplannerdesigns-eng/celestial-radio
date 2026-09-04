"use client";

interface EQBarsProps {
  playing: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const configs = [
  { height: "20px", delay: "0s", dur: "0.58s" },
  { height: "18px", delay: "0.09s", dur: "0.50s" },
  { height: "5px", delay: "0.04s", dur: "0.65s" },
  { height: "22px", delay: "0.14s", dur: "0.44s" },
  { height: "4px", delay: "0.07s", dur: "0.52s" },
  { height: "18px", delay: "0.11s", dur: "0.62s" },
  { height: "14px", delay: "0.03s", dur: "0.48s" },
  { height: "6px", delay: "0.06s", dur: "0.56s" },
];

export default function EQBars({ playing, size = "md", color = "#a855f7" }: EQBarsProps) {
  const barWidth = size === "sm" ? 2 : size === "lg" ? 4 : 3;
  const maxH = size === "sm" ? 14 : size === "lg" ? 28 : 22;

  return (
    <div
      className="flex items-end gap-[2px] shrink-0"
      style={{ height: `${maxH}px` }}
      aria-label={playing ? "Playing" : "Stopped"}
    >
      {configs.map((c, i) => (
        <div
          key={i}
          style={{
            width: `${barWidth}px`,
            borderRadius: "2px",
            backgroundColor: playing ? color : "rgba(74,72,117,0.5)",
            height: playing ? "4px" : "3px",
            animation: playing
              ? `eq${i + 1} ${c.dur} ease-in-out ${c.delay} infinite`
              : "none",
            transition: "background-color 0.3s",
          }}
        />
      ))}
      <style>{`
        @keyframes eq1{0%,100%{height:4px}50%{height:20px}}
        @keyframes eq2{0%,100%{height:10px}50%{height:18px}}
        @keyframes eq3{0%,100%{height:16px}50%{height:5px}}
        @keyframes eq4{0%,100%{height:6px}50%{height:22px}}
        @keyframes eq5{0%,100%{height:20px}50%{height:4px}}
        @keyframes eq6{0%,100%{height:8px}50%{height:18px}}
        @keyframes eq7{0%,100%{height:4px}50%{height:14px}}
        @keyframes eq8{0%,100%{height:14px}50%{height:6px}}
      `}</style>
    </div>
  );
}
