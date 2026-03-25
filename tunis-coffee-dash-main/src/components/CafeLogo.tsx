export const CafeLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient
          id="glow"
          cx="60"
          cy="60"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="cupGradient"
          x1="20"
          y1="40"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--terracotta))" />
        </linearGradient>
        <linearGradient
          id="steamGradient"
          x1="60"
          y1="10"
          x2="60"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Background Glow */}
      <circle cx="60" cy="60" r="60" fill="url(#glow)" />

      {/* Zellige / Star Motif Background (Subtle) */}
      <path
        d="M60 15 L66 30 L81 30 L69 40 L74 55 L60 45 L46 55 L51 40 L39 30 L54 30 Z"
        fill="hsla(var(--gold), 0.15)"
        className="animate-pulse-soft"
      />

      {/* Steam / Aroma Lines */}
      <path
        d="M50 35 C45 25, 60 20, 50 10 M60 35 C55 25, 70 20, 60 10 M70 35 C65 25, 80 20, 70 10"
        stroke="url(#steamGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ animation: "pulseSoft 4s ease-in-out infinite" }}
      />

      {/* Coffee Cup Base */}
      <path
        d="M30 40 L90 40 C95 40, 95 45, 95 65 C95 85, 75 90, 60 90 C45 90, 25 85, 25 65 C25 45, 25 40, 30 40 Z"
        fill="url(#cupGradient)"
        stroke="hsl(var(--background))"
        strokeWidth="2"
      />

      {/* Cup Handle */}
      <path
        d="M93 50 C110 50, 110 75, 90 75"
        stroke="hsl(var(--terracotta))"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cup rim / Inside coffee */}
      <ellipse cx="60" cy="40" rx="32" ry="7" fill="hsl(var(--espresso))" />
      <ellipse cx="60" cy="40" rx="28" ry="4" fill="hsl(var(--primary))" opacity="0.3" />

      {/* Decorative center diamond (Tunisian touch) */}
      <path
        d="M60 60 L65 70 L60 80 L55 70 Z"
        fill="hsl(var(--gold))"
      />
    </svg>
  );
};
