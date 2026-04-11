import { useEffect, useState } from "react";
import { HealthScoreRing } from "../components/HealthScoreRing";
import NutrientBar from "../components/NutrientBar";
import { ArrowLeftRight } from "lucide-react";

type MealItem = {
  id: number;
  food: {
    name: string;
    brand: string;
    calories: number;
    healthScore: number;
    nutrients: {
      carbs: number;
      fat: number;
      fiber: number;
      protein: number;
      saturatedFat: number;
      sodium: number;
      sugar: number;
    };
  };
  quantity: number;
};

type FlattenedFood = {
  id: number;
  name: string;
  brand: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  score: number;
};

export function transformMeals(data: MealItem[]): FlattenedFood[] {
  return data.map((item) => {
    const { food } = item;

    return {
      id: item.id,
      name: food.name?.trim() || "Unknown",
      brand: food.brand?.trim() || "Unknown",

      cal: Math.round(food.calories),
      protein: +(food.nutrients.protein).toFixed(2),
      carbs: +(food.nutrients.carbs).toFixed(2),
      fat: +(food.nutrients.fat).toFixed(2),
      fiber: +(food.nutrients.fiber).toFixed(2),
      sugar: +(food.nutrients.sugar).toFixed(2),
      sodium: +(food.nutrients.sodium).toFixed(2),

      score: food.healthScore ?? 0,
    };
  });
}

const ComparePage = () => {
  const [foodDatabase, setFoodDatabase] = useState<FlattenedFood[]>([]);

  // ✅ FIX: initialize as null
  const [foodA, setFoodA] = useState<FlattenedFood | null>(null);
  const [foodB, setFoodB] = useState<FlattenedFood | null>(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        console.log("check");
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();
        console.log(data);

        const transformed = transformMeals(data);
        setFoodDatabase(transformed);

        // ✅ FIX: set default values safely
        setFoodA(transformed[0] || null);
        setFoodB(transformed[1] || transformed[0] || null);

      } catch (err) {
        console.error("Failed to fetch food log", err);
      }
    };
    fetchLog();
  }, []);

  // ✅ FIX: proper typing + null guard
  const renderSelector = (
    selected: FlattenedFood | null,
    onChange: (f: FlattenedFood) => void
  ) => {
    if (!selected) return null;

    return (
      <select
        value={selected.id}
        onChange={(e) =>
          onChange(
            foodDatabase.find((f) => f.id === Number(e.target.value))!
          )
        }
        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {foodDatabase.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name} — {f.brand}
          </option>
        ))}
      </select>
    );
  };

  const nutrients = [
    { key: "cal", label: "Calories", unit: "kcal", max: 300 },
    { key: "protein", label: "Protein", unit: "g", max: 30 },
    { key: "carbs", label: "Carbs", unit: "g", max: 50 },
    { key: "fat", label: "Fat", unit: "g", max: 20 },
    { key: "fiber", label: "Fiber", unit: "g", max: 10 },
    { key: "sugar", label: "Sugar", unit: "g", max: 50 },
    { key: "sodium", label: "Sodium", unit: "mg", max: 500 },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Compare Foods</h1>
        <p className="text-muted-foreground text-sm mt-1">Side-by-side nutritional comparison</p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Food A</label>
          {renderSelector(foodA, setFoodA)}
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Food B</label>
          {renderSelector(foodB, setFoodB)}
        </div>
      </div>

      {/* ✅ Guard rendering */}
      {foodA && foodB && (
        <>
          {/* Score Comparison */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 flex flex-col items-center space-y-2">
              <HealthScoreRing score={foodA.score} size={100} />
              <p className="text-sm font-medium text-foreground">{foodA.name}</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center space-y-2">
              <HealthScoreRing score={foodB.score} size={100} />
              <p className="text-sm font-medium text-foreground">{foodB.name}</p>
            </div>
          </div>

          {/* Nutrient Comparison */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Nutrient Comparison</h3>
            {nutrients.map((n) => {
              const valA = (foodA as any)[n.key];
              const valB = (foodB as any)[n.key];
              const better =
                n.key === "sodium" || n.key === "sugar" || n.key === "fat" || n.key === "cal"
                  ? valA < valB
                    ? "A"
                    : valA > valB
                    ? "B"
                    : "tie"
                  : valA > valB
                  ? "A"
                  : valA < valB
                  ? "B"
                  : "tie";

              return (
                <div key={n.key} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  <div className="text-right">
                    <span className={`text-sm font-medium ${better === "A" ? "text-primary" : "text-foreground"}`}>
                      {valA}
                      {n.unit}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">{n.label}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${better === "B" ? "text-primary" : "text-foreground"}`}>
                      {valB}
                      {n.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          
        </>
      )}
    </div>
  );
};

export default ComparePage;