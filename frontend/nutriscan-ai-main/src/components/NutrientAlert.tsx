import { AlertTriangle, AlertCircle, Info } from "lucide-react";

type AlertLevel = "warning" | "danger" | "info";

interface NutrientAlertProps {
  level: AlertLevel;
  title: string;
  description: string;
}

const iconMap = {
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
};

const styleMap = {
  warning: "border-accent/30 bg-accent/5 text-accent",
  danger: "border-destructive/30 bg-destructive/5 text-destructive",
  info: "border-primary/30 bg-primary/5 text-primary",
};

const NutrientAlert = ({ level, title, description }: NutrientAlertProps) => {
  const Icon = iconMap[level];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${styleMap[level]}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-80">{description}</p>
      </div>
    </div>
  );
};

export default NutrientAlert;
