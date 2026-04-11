const NutrientBar = ({
  label,
  value,
  max,
  unit,
  colorClass,
}: {
  label: string;
  value?: number;
  max: number;
  unit: string;
  colorClass?: string;
}) => {
  // ✅ Handle undefined / null safely
  const safeValue = typeof value === "number" ? value : 0;

  // ✅ Prevent divide-by-zero
  const percentage =
    max > 0 ? Math.min((safeValue / max) * 100, 100) : 0;

  // ✅ Dynamic color logic (fallback if no colorClass passed)
  const getColor = () => {
    if (colorClass) return colorClass;

    if (percentage < 40) return "bg-green-500";
    if (percentage < 100) return "bg-yellow-500";
    return "bg-red-500";
  };

  // ✅ Insight label (adds meaning, not just visuals)
  const getLabel = () => {
    if (percentage < 40) return "Low";
    if (percentage < 100) return "Moderate";
    return "High";
  };

  return (
    <div className="space-y-1.5">
      {/* Top Row */}
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>

        <span className="text-foreground font-medium">
          {safeValue}
          {unit}{" "}
          <span className="text-muted-foreground">
            / {max}
            {unit}
          </span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Insight Text */}
      <p className="text-xs text-muted-foreground">
        {getLabel()}
      </p>
    </div>
  );
};

export default NutrientBar;