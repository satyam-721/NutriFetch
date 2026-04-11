const getScoreColor = (score: number) => {
  if (score >= 80) return "gradient-score-excellent";
  if (score >= 60) return "gradient-score-good";
  if (score >= 40) return "gradient-score-moderate";
  if (score >= 20) return "gradient-score-poor";
  return "gradient-score-bad";
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  if (score >= 20) return "Poor";
  return "Bad";
};

const HealthScoreRing = ({ score, size = 120 }: { score: number; size?: number }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={
            score >= 80
              ? "hsl(var(--health-excellent))"
              : score >= 60
              ? "hsl(var(--health-good))"
              : score >= 40
              ? "hsl(var(--health-moderate))"
              : score >= 20
              ? "hsl(var(--health-poor))"
              : "hsl(var(--health-bad))"
          }
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
};

export { HealthScoreRing, getScoreColor, getScoreLabel };
