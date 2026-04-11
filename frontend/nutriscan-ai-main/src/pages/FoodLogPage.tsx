import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import NutrientBar from "../components/NutrientBar";
import styles from "./FoodLogPage.module.css"; // ✅ added

/* ================= TYPES ================= */

type MealItem = {
  id: number;
  name: string;
  brand: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  time: string;
  full?: any; // ✅ added (store full backend data)
};

type LogType = {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
};

/* ================= COMPONENT ================= */

const mealCategories: (keyof LogType)[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
];

const FoodLogPage = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState<string | null>(null); 
 const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);
  const [analysisInput, setAnalysisInput] = useState("");
  const [analysisResponse, setAnalysisResponse] = useState<string | null>(null);


  const [log, setLog] = useState<LogType>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [activeCategory, setActiveCategory] =
    useState<keyof LogType>("breakfast");

  const [selectedItem, setSelectedItem] = useState<MealItem | null>(null); // ✅ added

  const [maxNutri, setMaxNutri] = useState({

                            'protein':0,
                            'calories':0,
                            'carbs':0,
                            'fat':0,
                            'fiber':0
                              });

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchLog = async () => {
      try {
        console.log("check");
        const res = await fetch("http://localhost:8000/nutri");
        const data = await res.json();
        console.log(data);
        setMaxNutri(data);

      } catch (err) {
        console.error("Failed to fetch food log", err);
      }
    };

    fetchLog();
  }, []);





  useEffect(() => {
    const fetchLog = async () => {
      try {
        console.log("check");
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();
        console.log(data);

        const grouped: LogType = {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        };

        data.forEach((item: any) => {
          const cat =
            (item.mealType?.toLowerCase() as keyof LogType) || "snacks";

          const meal: MealItem = {
            id: item.id,
            name: item.food.name,
            brand: item.food.brand,
            cal: item.food.calories * item.quantity,
            protein: (item.food.nutrients.protein * item.quantity),
            carbs: item.food.nutrients.carbs * item.quantity,
            fat: item.food.nutrients.fat * item.quantity,
            quantity: item.quantity,
            time: new Date(item.timestamp).toLocaleTimeString(),
            full: item, // ✅ store full data
          };

          grouped[cat].push(meal);
        });

        setLog(grouped);
      } catch (err) {
        console.error("Failed to fetch food log", err);
      }
    };

    fetchLog();
  }, []);

  const handleAnalyze = () => {
  setShowAnalysis(true);
  setAnalysisInput("");
  setAnalysisResponse(null);
  setAnalysisError(false);
};

const handleSendAnalysis = async () => {
  if (!analysisInput.trim()) return;

  setLoadingAnalysis(true);
  setAnalysisError(false);
  setAnalysisResponse(null);

  try {
    const res = await fetch("http://localhost:8000/productAnalyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: analysisInput,
         // optional but VERY useful
      }),
    });

    const data = await res.text(); // backend returns string
    setAnalysisResponse(data);
  } catch (err) {
    console.error("Analysis failed", err);
    setAnalysisError(true);
  } finally {
    setLoadingAnalysis(false);
  }
};

  /* ================= TOTALS ================= */

  const allMeals: MealItem[] = Object.values(log).flat();

  const totalCal = allMeals.reduce((s, m) => s + m.cal, 0);
  const totalProtein = allMeals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = allMeals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = allMeals.reduce((s, m) => s + m.fat, 0);

  /* ================= UI ================= */

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Food Log</h1>
          <p className="text-muted-foreground text-sm mt-1">Today</p>
        </div>

        <button
          onClick={handleAnalyze}
          className="px-4 py-2 text-sm font-medium rounded-xl gradient-primary text-white"
        >
          Analyze Your Intake
        </button>
      </div>

      {/* Summary */}
      <div className="glass-card p-6 space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">{totalCal.toFixed(2)} <small>cal</small></p>
          <p className="text-xs text-muted-foreground">
            For each 100g
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NutrientBar label="Protein" value={Number(totalProtein.toFixed(2))} max={maxNutri.protein} unit="g" />
          <NutrientBar label="Carbs" value={Number(totalCarbs.toFixed(2))} max={maxNutri.carbs} unit="g" />
          <NutrientBar label="Fat" value={Number(totalFat.toFixed(2))} max={maxNutri.fat} unit="g" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {mealCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${
              activeCategory === cat
                ? "gradient-primary text-white"
                : "bg-secondary"
            }`}
          >
            {cat}
            <span className="ml-1 text-xs">
              ({log[cat].length})
            </span>
          </button>
        ))}
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {log[activeCategory].map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)} // ✅ click handler
            className="glass-card p-4 flex items-center justify-between cursor-pointer"
          >
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.brand} • {item.time}
              </p>
              <p className="text-xs text-muted-foreground">
                Qty: {item.quantity} • P:{item.protein.toFixed(2)}g C:{item.carbs.toFixed(2)}g F:{item.fat.toFixed(2)}g
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold">{item.cal.toFixed(2)} cal</span>
              <button className="text-red-500 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
{selectedItem && (
  <div className={styles.overlay} onClick={() => setSelectedItem(null)}>
    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className={styles.header}>
        <h2>{selectedItem.name}</h2>
        <p>{selectedItem.brand}</p>
      </div>

      {/* HERO CALORIES */}
      <div className={styles.hero}>
        <span className={styles.cal}>{selectedItem.cal.toFixed(2)}</span>
        <span className={styles.unit}>kcal</span>
        <p className={styles.sub}>Qty: {selectedItem.quantity}</p>
      </div>

      {/* NUTRIENTS */}
      <div className={styles.section}>
        <h3>Nutrients</h3>
        <div className={styles.nutrients}>
          <div className={styles.card}>
            <span>Protein</span>
            <strong>{selectedItem.protein.toFixed(2)}g</strong>
          </div>
          <div className={styles.card}>
            <span>Carbs</span>
            <strong>{selectedItem.carbs.toFixed(2)}g</strong>
          </div>
          <div className={styles.card}>
            <span>Fat</span>
            <strong>{selectedItem.fat.toFixed(2)}g</strong>
          </div>
        </div>
      </div>

      {/* ALERTS */}
      {selectedItem.full?.food?.alerts?.length > 0 && (
        <div className={styles.section}>
          <h3>Health Alerts</h3>
          <div className={styles.alertContainer}>
            {selectedItem.full.food.alerts.map((a: any, i: number) => (
              <span key={i} className={`${styles.badge} ${styles[a.level]}`}>
                {a.title.replace("en:", "")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* INGREDIENTS */}
      <div className={styles.section}>
        <h3>Ingredients</h3>
        <div className={styles.box}>
          {selectedItem.full?.food?.ingredients?.join(", ")}
        </div>
      </div>

      {/* ALLERGENS */}
      <div className={styles.section}>
        <h3>Allergens</h3>
        <div className={styles.alertContainer}>
          {selectedItem.full?.food?.allergens?.map((a: string, i: number) => (
            <span key={i} className={styles.allergen}>
              {a.replace("en:", "").trim()}
            </span>
          ))}
        </div>
      </div>

      <button
        className={styles.closeBtn}
        onClick={() => setSelectedItem(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

{showAnalysis && (
  <div className={styles.overlay} onClick={() => setShowAnalysis(false)}>
    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Ask About Your Intake</h2>
        <p>Get insights based on your food log</p>
      </div>

      {/* INPUT */}
      <div className={styles.section}>
        <textarea
  value={analysisInput}
  onChange={(e) => setAnalysisInput(e.target.value)}
  placeholder="e.g. Am I eating enough protein today?"
  className="w-full p-3 rounded-lg border text-sm bg-gray-900 text-white border-gray-700 placeholder-gray-400"
  rows={3}
/>

        <button
          onClick={handleSendAnalysis}
          className="mt-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm"
        >
          Send
        </button>
      </div>

      {/* RESPONSE AREA */}
      <div className={styles.section}>
        {loadingAnalysis && (
          <p className="text-center">Analyzing...</p>
        )}

        {!loadingAnalysis && analysisError && (
          <p className="text-sm">
            Something went wrong. Showing sample:
            <br /><br />
            • Protein intake looks good  
            • Carbs are slightly high  
            • Fat intake is balanced  
          </p>
        )}

        {!loadingAnalysis && analysisResponse && (
          <div className="text-sm whitespace-pre-wrap">
            {analysisResponse}
          </div>
        )}
      </div>

      {/* CLOSE */}
      <button
        className={styles.closeBtn}
        onClick={() => setShowAnalysis(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default FoodLogPage;