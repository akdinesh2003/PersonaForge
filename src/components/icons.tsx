export function PersonaForgeLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      <path
        d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 Z M 50 20 C 66.6 20 80 33.4 80 50 C 80 58.8 75.8 66.7 70 72.1 C 69.3 62.5 61.9 55 52.5 55 L 47.5 55 C 38.1 55 30.7 62.5 30 72.1 C 24.2 66.7 20 58.8 20 50 C 20 33.4 33.4 20 50 20 Z M 37.5 78.5 C 40.8 72.6 46.2 69 52.5 69 L 47.5 69 C 41.8 69 36.6 72.4 33.2 77.6 C 34.6 78 36 78.3 37.5 78.5 Z"
        fill="url(#logoGradient)"
      />
    </svg>
  );
}
