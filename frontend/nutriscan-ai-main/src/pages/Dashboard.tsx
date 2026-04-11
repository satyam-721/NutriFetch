import { HealthScoreRing } from "../components/HealthScoreRing";
import NutrientBar from "../components/NutrientBar";
import NutrientAlert from "../components/NutrientAlert";
import {
  Flame,
  Droplets,
  TrendingUp,
  Zap,
  ArrowRight,
  ScanBarcode,
  Lightbulb,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { stat } from "fs";



const recentMeals = [
  { name: "Greek Yogurt & Berries", time: "8:30 AM", cal: 210, score: 85 },
  { name: "Grilled Chicken Salad", time: "12:45 PM", cal: 480, score: 78 },
  { name: "Protein Smoothie", time: "3:15 PM", cal: 320, score: 72 },
  { name: "Salmon with Quinoa", time: "7:00 PM", cal: 410, score: 88 },
];

const aiActions = [
  {
    title: "You need +20g protein",
    action: "Add paneer / eggs in dinner",
  },
  {
    title: "High sugar detected",
    action: "Avoid sweet snacks tonight",
  },
  {
    title: "Low fiber intake",
    action: "Add lentils or broccoli",
  },
];

const ingredientRisks = [
  { name: "Sugar", level: "high" },
  { name: "Palm Oil", level: "moderate" },
  { name: "Sodium Benzoate", level: "low" },
  { name: "Sugar1", level: "high" },
  { name: "Palm Oil1", level: "moderate" },
  { name: "Sodium Benzoate1", level: "low" },
];


type MealItem = {
  id: number;
  food: {
    healthScore: number;
    calories: number;
  };
  quantity: number;
};

type Result = {
  averageHealthScore: number;
  totalCalories: number;
};

export function calculateStats(data: MealItem[]): Result {
  if (!data.length) {
    return { averageHealthScore: 0, totalCalories: 0 };
  }

  let totalHealthScore = 0;
  let totalCalories = 0;
  let totalItems = 0;

  for (const item of data) {
    const qty = item.quantity || 1;

    totalHealthScore += item.food.healthScore * qty;
    totalCalories += item.food.calories * qty;
    totalItems += qty;
  }

  return {
    averageHealthScore: totalHealthScore / totalItems,
    totalCalories,
  };
}


const Dashboard = () => {
  type Result = {
  averageHealthScore: number;
  totalCalories: number;
};
const [stats, setStats] = useState<Result>({
  averageHealthScore: 0,
  totalCalories: 0,
});

  const quickStats = [
  { label: "Calories", value: Number(stats.totalCalories.toFixed(2)), target: "", icon: Flame, color: "text-accent" },
  { label: "Water", value: "6", target: "8 cups", icon: Droplets, color: "text-nutrient-protein" },
  { label: "_____", value: "0721", target: "10,000", icon: TrendingUp, color: "text-primary" },
  { label: "____", value: "12", target: "idk", icon: Zap, color: "text-nutrient-fat" },
];
  

  useEffect(() => {
      const fetchLog = async () => {
        try {
          console.log("check");
          const res = await fetch("http://localhost:8000/products");
          const data = await res.json();
          console.log(data);
          setStats( calculateStats(data));
  
        } catch (err) {
          console.error("Failed to fetch food log", err);
        }
      };
  
      fetchLog();
    }, []);





  return (
    <div className="space-y-6 pb-20 lg:pb-0">

      {/* 🔥 HERO - SPLIT LAYOUT */}
<div className="glass-card p-6">

  <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6">

    {/* LEFT: SCORE */}
    <div className="flex flex-col items-center justify-center text-center space-y-2 lg:w-1/3">
      <HealthScoreRing score={Number(stats.averageHealthScore.toFixed(2))} size={100} />

      <p className="text-sm font-medium text-foreground">
        You're doing okay
      </p>

      
    </div>

    {/* VERTICAL DIVIDER */}
    <div className="hidden lg:block w-px bg-border/50" />

    {/* RIGHT: STATS (2 ROW GRID) */}
    <div className="grid grid-cols-2 gap-4 w-full lg:w-2/3">

      {quickStats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
        >
          <stat.icon className={`w-5 h-5 ${stat.color}`} />

          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold text-foreground">
              {stat.value}
              <span className="text-xs text-muted-foreground ml-1">
                / {stat.target}
              </span>
            </p>
          </div>
        </div>
      ))}

    </div>
  </div>
</div>

          {/* ⚡ QUICK ACTIONS */}
      <div className="grid grid-cols-3 gap-3">
        <Link to="/scan" className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5">
          <ScanBarcode className="w-6 h-6 text-primary" />
          <span className="text-xs font-medium">Scan</span>
        </Link>

        <Link to="/log" className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5">
          <Flame className="w-6 h-6 text-accent" />
          <span className="text-xs font-medium">Log</span>
        </Link>

        <Link to="/compare" className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span className="text-xs font-medium">Compare</span>
        </Link>
      </div>

      {/* ⚠️ ALERTS + 🤖 AI (SIDE BY SIDE) */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Alerts */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Priority Alerts</h3>
          <div className="space-y-3">
            <NutrientAlert level="danger" title="High Sugar" description="Exceeded recommended intake today." />
            <NutrientAlert level="warning" title="Low Fiber" description="Only 14g consumed. Add veggies." />
          </div>
        </div>

        {/* AI Actions */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-muted-foreground">What You Should Do Next</h3>
          </div>

          <div className="space-y-3">
            {aiActions.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-primary font-bold">→</span>
                <div>
                  <p className="text-foreground font-medium">{item.title}</p>
                  <p className="text-muted-foreground">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 MACROS */}
      {/* <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Macro Nutrients</h3>
        <NutrientBar label="Protein" value={82} max={120} unit="g" colorClass="bg-nutrient-protein" />
        <NutrientBar label="Carbs" value={165} max={250} unit="g" colorClass="bg-nutrient-carbs" />
        <NutrientBar label="Fat" value={48} max={65} unit="g" colorClass="bg-nutrient-fat" />
        <NutrientBar label="Fiber" value={14} max={30} unit="g" colorClass="bg-nutrient-fiber" />
      </div> */}

      {/* 🍱 MEALS + 🧪 INGREDIENTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Meals */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Today's Meals</h3>
            <Link to="/log" className="text-xs text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentMeals.map((meal) => (
              <div key={meal.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{meal.name}</p>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{meal.cal} cal</p>
                  <p className={`text-xs ${meal.score >= 75 ? "text-health-excellent" : "text-health-moderate"}`}>
                    Score: {meal.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredient Insights */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Ingredient Insights</h3>

          <div className="space-y-3">
            {ingredientRisks.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-foreground">{item.name}</span>
                <span
                  className={`text-xs ${
                    item.level === "high"
                      ? "text-health-poor"
                      : item.level === "moderate"
                      ? "text-health-moderate"
                      : "text-health-excellent"
                  }`}
                >
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};


export default Dashboard;