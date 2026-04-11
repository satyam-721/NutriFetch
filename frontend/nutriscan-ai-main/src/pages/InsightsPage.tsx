import { useState,useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";



type FoodEntry = {
  timestamp: string;
  quantity: number;
  food: {
    calories: number;
    nutrients: {
      sugar: number;
    };
  };
};

function getLast7DaysStats(data: FoodEntry[]) {
  const caloriesArr = new Array(7).fill(0);
  const sugarArr = new Array(7).fill(0);
  const daysArr: string[] = new Array(7);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    // Example: "Fri", "Thu"
    daysArr[i] = d.toLocaleDateString("en-US", { weekday: "short" });
  }

  for (const item of data) {
    const entryDate = new Date(item.timestamp);
    entryDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - entryDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays < 7) {
      const calories = item.food.calories * item.quantity;
      const sugar = item.food.nutrients.sugar * item.quantity;

      caloriesArr[diffDays] += calories;
      sugarArr[diffDays] += sugar;
    }
  }

  return {
    calories: caloriesArr,
    sugar: sugarArr,
    days: daysArr,
  };
}

type Nutrients = {
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  sodium: number;
};

type MealLogItem = {
  quantity: number;
  food: {
    nutrients: Nutrients;
  };
};

type Totals = {
  totalCarbs: number;
  totalFats: number;
  totalProtein: number;
  totalFiber: number;
  totalSodium: number;
};

export function calculateTotals(data: MealLogItem[]): Totals {
  return data.reduce(
    (totals, item) => {
      const qty = item.quantity;
      const nutrients = item.food.nutrients;

      totals.totalCarbs += (nutrients.carbs || 0) * qty;
      totals.totalFats += (nutrients.fat || 0) * qty;
      totals.totalProtein += (nutrients.protein || 0) * qty;
      totals.totalFiber += (nutrients.fiber || 0) * qty;
      totals.totalSodium += (nutrients.sodium || 0) * qty;

      return totals;
    },
    {
      totalCarbs: 0,
      totalFats: 0,
      totalProtein: 0,
      totalFiber: 0,
      totalSodium: 0,
    }
  );
}









const topFoods = [
  { name: "Chicken Breast", count: 12, cal: 165 },
  { name: "Brown Rice", count: 10, cal: 215 },
  { name: "Greek Yogurt", count: 9, cal: 130 },
  { name: "Banana", count: 8, cal: 105 },
  { name: "Oatmeal", count: 7, cal: 150 },
];

const InsightsPage = () => {

  const [period, setPeriod] = useState("week");
  type Stats = {
    calories: number[];
    sugar: number[];
    days: string[];
  };

  const [last7DaysStats, setLast7DaysStats] = useState<Stats>({
    calories: new Array(7).fill(0),
    sugar: new Array(7).fill(0),
    days: new Array(7).fill(""),
  });

  type Totals = {
    totalCarbs: number;
    totalFats: number;
    totalProtein: number;
    totalFiber: number;
    totalSodium: number;
  };

  const [totals, setTotals] = useState<Totals>({
    totalCarbs: 0,
    totalFats: 0,
    totalProtein: 0,
    totalFiber: 0,
    totalSodium: 0,
  });




const weeklyCalories = [
  { day: last7DaysStats.days[6], calories: last7DaysStats.calories[6], target: 2000 },
  { day: last7DaysStats.days[5], calories: last7DaysStats.calories[5], target: 2000 },
  { day: last7DaysStats.days[4], calories: last7DaysStats.calories[4], target: 2000 },
  { day: last7DaysStats.days[3], calories: last7DaysStats.calories[3], target: 2000 },
  { day: last7DaysStats.days[2], calories: last7DaysStats.calories[2], target: 2000 },
  { day: last7DaysStats.days[1], calories: last7DaysStats.calories[1], target: 2000 },
  { day: last7DaysStats.days[0], calories: last7DaysStats.calories[0], target: 2000 },
];



const sugarTrend = [
  { day: last7DaysStats.days[6], sugar: last7DaysStats.sugar[6] },
  { day: last7DaysStats.days[5], sugar: last7DaysStats.sugar[5] },
  { day: last7DaysStats.days[4], sugar: last7DaysStats.sugar[4] },
  { day: last7DaysStats.days[3], sugar: last7DaysStats.sugar[3] },
  { day: last7DaysStats.days[2], sugar: last7DaysStats.sugar[2] },
  { day: last7DaysStats.days[1], sugar: last7DaysStats.sugar[1] },
  { day: last7DaysStats.days[0], sugar: last7DaysStats.sugar[0] },
];

const macroDistribution = [
  { name: "Protein", value: Number(totals.totalProtein.toFixed(2)), color: "hsl(210, 80%, 60%)" },
  { name: "Carbs", value: Number(totals.totalCarbs.toFixed(2)), color: "hsl(38, 92%, 55%)" },
  { name: "Fat", value: Number(totals.totalFats.toFixed(2)), color: "hsl(340, 70%, 60%)" },
  { name: "Fiber", value: Number(totals.totalFiber.toFixed(2)), color: "hsl(277, 59%, 59%)" }

];


















  useEffect(() => {
    const fetchLog = async () => {
      try {
        console.log("check");
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();
        console.log(data)
        setLast7DaysStats(getLast7DaysStats(data));
        setTotals(calculateTotals(data));
        console.log(last7DaysStats);

      } catch (err) {
        console.error("Failed to fetch food log", err);
      }
    };
    fetchLog();
  }, []);







  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Insights</h1>
          <p className="text-muted-foreground text-sm mt-1">Your nutrition trends & patterns</p>
        </div>
        <div className="flex bg-secondary rounded-xl">
          {["week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-xs font-medium rounded-xl capitalize transition-colors ${
                period === p ? "gradient-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calorie Chart */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Calorie Intake vs Target</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyCalories}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 12%)",
                  border: "1px solid hsl(220, 14%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(160, 10%, 92%)",
                }}
              />
              <Bar dataKey="calories" fill="hsl(152, 60%, 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="hsl(220, 14%, 22%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macro Pie */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Macro Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={macroDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {macroDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 18%, 12%)",
                    border: "1px solid hsl(220, 14%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(160, 10%, 92%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            {macroDistribution.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name} {m.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sugar Trend */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Sugar Intake Trend (g)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sugarTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 12%)",
                  border: "1px solid hsl(220, 14%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(160, 10%, 92%)",
                }}
              />
              <Area type="monotone" dataKey="sugar" stroke="hsl(38, 92%, 55%)" fill="hsl(38, 92%, 55%)" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Foods */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Most Eaten Foods</h3>
          <div className="space-y-3">
            {topFoods.map((food, i) => (
              <div key={food.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{food.name}</span>
                    <span className="text-xs text-muted-foreground">{food.count}x • {food.cal} cal</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(food.count / topFoods[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default InsightsPage;
