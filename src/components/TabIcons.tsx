// TabIcons.tsx
// Provides SVG icons for Ghana, Africa, and World tabs

export function GhanaFlagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="6" fill="#e71a1a" />
      <rect y="6" width="30" height="6" fill="#ffce00" />
      <rect y="12" width="30" height="6" fill="#008751" />
      <polygon points="15,7 16,10 19,10 16.5,12 17.5,15 15,13.5 12.5,15 13.5,12 11,10 14,10" fill="#111" />
    </svg>
  );
}

export function AfricaIcon({ size = 20, color = "#34d399" }: { size?: number; color?: string }) {
  // Simple Africa continent SVG (stylized)
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2 Q7 1 10 2 Q15 3 16 7 Q17 10 13 13 Q13 15 10 17 Q7 15 7 13 Q4 12 4 10 Q2 7 5 2 Z" fill={color} stroke="#059669" strokeWidth="1.2" />
    </svg>
  );
}

export function GlobeIcon({ size = 20, color = "#60a5fa" }: { size?: number; color?: string }) {
  // Simple globe SVG
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <ellipse cx="10" cy="10" rx="8" ry="3.5" stroke={color} strokeWidth="1.1" fill="none" />
      <ellipse cx="10" cy="10" rx="3.5" ry="8" stroke={color} strokeWidth="1.1" fill="none" />
      <circle cx="10" cy="10" r="2.2" fill={color} />
    </svg>
  );
}
