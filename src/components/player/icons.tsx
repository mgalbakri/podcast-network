type P = { className?: string };

export const PlayIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
  </svg>
);

export const PauseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor" />
  </svg>
);

export const BackIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" strokeLinecap="round" />
    <path d="M4 3.5v4h4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fill="currentColor" stroke="none" fontFamily="inherit" fontWeight="700">
      15
    </text>
  </svg>
);

export const ForwardIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" strokeLinecap="round" />
    <path d="M20 3.5v4h-4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fill="currentColor" stroke="none" fontFamily="inherit" fontWeight="700">
      30
    </text>
  </svg>
);
