export default function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <div className="brand-mark" style={{ display: "flex", alignItems: "center", gap: 10, color: "inherit" }}>
      <svg
        className="brand-icon"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="#0B1020" />
        <circle cx="10" cy="11" r="1.1" fill="#F5C542" opacity="0.7" />
        <circle cx="38" cy="10" r="0.9" fill="#fff" opacity="0.45" />
        <circle cx="37" cy="37" r="1" fill="#F5C542" opacity="0.45" />
        {/* radio broadcast origin */}
        <circle cx="20" cy="24" r="4.2" fill="#F5C542" />
        <path fill="#0B1020" d="M20 21.2l.7 2.1 2.2.05-1.75 1.35.65 2.1L20 25.5l-1.8 1.3.65-2.1-1.75-1.35 2.2-.05z" />
        {/* radio waves */}
        <path fill="none" stroke="#F5C542" strokeWidth="2.4" strokeLinecap="round" d="M26.5 17.5c4.2 3.2 4.2 9.8 0 13" />
        <path fill="none" stroke="#F5C542" strokeWidth="2.4" strokeLinecap="round" d="M30.8 14.2c6.2 4.8 6.2 14.8 0 19.6" />
        <path fill="none" stroke="#F5C542" strokeWidth="2.4" strokeLinecap="round" d="M35.2 11c8.2 6.4 8.2 19.6 0 26" />
      </svg>
      <div>
        <div className="brand-name">Celestial</div>
        <div className="brand-tag">Radio</div>
      </div>
    </div>
  );
}
