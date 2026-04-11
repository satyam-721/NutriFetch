import { useState, useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import { ScanBarcode, Camera, Search, X } from "lucide-react";
import { HealthScoreRing } from "../components/HealthScoreRing";
import NutrientAlert from "../components/NutrientAlert";
import NutrientBar from "../components/NutrientBar";
import styles from "./ScanPage.module.css";
import { useRef } from "react";


type Product = {
  name: string;
  brand: string;
  barcode: string;
  servingSize: string;
  healthScore: number;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    saturatedFat: number;
  };
  ingredients: string[];
  allergens: string[];
  additives: string[];
  alerts: {
    level: "danger" | "warning" | "info";
    title: string;
    description: string;
  }[];
};

const mockProduct: Product = {
  name: "Lay's Classic Potato Chips",
  brand: "Frito-Lay",
  barcode: "028400028431",
  servingSize: "28g (about 15 chips)",
  healthScore: 32,
  calories: 160,
  nutrients: {
    protein: 2,
    carbs: 15,
    fat: 10,
    fiber: 1,
    sugar: 1,
    sodium: 170,
    saturatedFat: 1.5,
  },
  ingredients: ["Potatoes", "Vegetable Oil", "Salt"],
  allergens: ["None"],
  additives: ["None"],
  alerts: [
    { level: "danger", title: "High Sodium", description: "Watch intake" },
    { level: "warning", title: "High Fat", description: "Limit consumption" },
    { level: "info", title: "Low Fiber", description: "Add veggies" },
  ],
};

const ScanPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [servings, setServings] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogModal, setShowLogModal] = useState(false);
const [mealType, setMealType] = useState("breakfast");
      const [quantity, setQuantity] = useState(0.1);
const fileInputRef = useRef<HTMLInputElement | null>(null);



const handleUploadClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result as string;

    img.onload = () => {
      Quagga.decodeSingle(
        {
          src: img.src,
          numOfWorkers: 0,
          decoder: {
            readers: ["ean_reader", "upc_reader"],
          },
        },
        (result) => {
          if (result?.codeResult?.code) {
            const code = result.codeResult.code;
            setBarcode(code);
            fetchProduct(code);
          } else {
            setError("Barcode not detected");
          }
        }
      );
    };
  };

  reader.readAsDataURL(file);
};
  const [maxNutri, setMaxNutri] = useState({

                            'protein':0,
                            'calories':0,
                            'carbs':0,
                            'fat':0,
                            'fiber':0
                              });

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

  // ✅ NEW STATE
  const [showDetails, setShowDetails] = useState(false);

  const fetchProduct = async (code: string) => {
    try {
      setLoading(true);
      setError("");
      console.log(code);
      const res = await fetch(`http://localhost:8000/food/${code}`);
      if (!res.ok) throw new Error("Not found");

      const data = await res.json();
      console.log(data);
      setProduct(data);
    } catch (err) {
      console.error(err);
      setProduct(mockProduct);
      setError("Using fallback data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isCameraOn) return;

    let isDetected = false;

    const handleDetected = (data: any) => {
      if (isDetected) return;
      isDetected = true;

      const code = data.codeResult.code;
      console.log(code);
      setBarcode(code);
      fetchProduct(code);
      setIsCameraOn(false);
    };

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner"),
          constraints: { facingMode: "environment" },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
      },
      (err) => {
        if (!err) Quagga.start();
      }
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.stop();
      Quagga.offDetected(handleDetected);
    };
  }, [isCameraOn]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setBarcode(searchQuery);
    fetchProduct(searchQuery);
  };

  const addToFoodLog = async () => {
    if (!product) return;

    try {
      const payload = {
        food:product,
        name: product.name,
        mealType: mealType,
        quantity: quantity,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:8000/food-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      console.log("Logged successfully");

      setShowLogModal(false); // close after success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Scan Food</h1>
        <p className={styles.subtitle}>
          Scan a barcode or search for a food item
        </p>
      </div>

      {!product ? (
        <>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search or enter barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={styles.searchInput}
            />
          </div>

          {isCameraOn ? (
            <div id="scanner" className={styles.scannerBox} />
          ) : (
            <div className={styles.card}>
              <div className={styles.centerBox}>
                <ScanBarcode size={40} />
                <p className={styles.subtitle}>Point camera at barcode</p>

                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => setIsCameraOn(true)}
                    className={styles.buttonPrimary}
                  >
                    <ScanBarcode size={16} />
                    Start Scan
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={handleUploadClick}
                    className={styles.buttonSecondary}
                  >
                    <Camera size={16} />
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading && <p className={styles.loading}>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setProduct(null);
              setBarcode("");
              setError("");
            }}
            className={styles.resetBtn}
          >
            <X size={16} /> Scan Another
          </button>

          <div className={styles.productCard}>
            <HealthScoreRing score={product.healthScore} size={100} />
            <div>
              <h2 className={styles.productTitle}>{product.name}</h2>
              <p className={styles.productMeta}>
                {product.brand} • {barcode}
              </p>
              <p className={styles.productMeta}>
                Serving: {product.servingSize}
              </p>
            </div>
          </div>

          <div className={styles.nutritionGrid}>
            <div className={styles.card}>
              <h3>Nutrition ({servings} servings)</h3>
              <p className={styles.calories}>
                {product.calories * servings}
              </p>

              <NutrientBar
                label="Protein"
                value={product.nutrients.protein * servings}
                max={maxNutri.protein}
                unit="g"
              />
              <NutrientBar
                label="Carbs"
                value={product.nutrients.carbs * servings}
                max={maxNutri.carbs}
                unit="g"
              />
              <NutrientBar
                label="Fat"
                value={product.nutrients.fat * servings}
                max={maxNutri.fat}
                unit="g"
              />
            </div>

            <div>
              <h3>Health Alerts</h3>
              {product.alerts.map((a, i) => (
                <NutrientAlert key={i} {...a} />
              ))}
            </div>
          </div>

          {/* ✅ NEW BUTTONS */}
          <div className={styles.bottomActions}>
            <button
              onClick={() => setShowDetails(true)}
              className={styles.buttonPrimary}
            >
              View Details
            </button>

            <button
              onClick={() => setShowLogModal(true)}
              className={styles.buttonSecondary}
            >
              Add to Food Log
            </button>
          </div>
        </>
      )}

      {/* ✅ MODAL */}
      {showDetails && product && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              onClick={() => setShowDetails(false)}
              className={styles.closeBtn}
            >
              <X size={18} />
            </button>

            <h2>{product.name}</h2>
            <p>{product.brand}</p>
            <p>Barcode: {product.barcode}</p>
            <p>Serving Size: {product.servingSize}</p>

            {/* Health Score */}
            <div style={{ margin: "16px 0" }}>
              <HealthScoreRing score={Number(product.healthScore.toFixed(2))} size={80} />
            </div>

            {/* Calories */}
            <h3>Calories</h3>
            <p className={styles.calories}>{product.calories.toFixed(2)}</p>

            {/* ALL Nutrients */}
            <h3>Nutrition</h3>
            <NutrientBar
              label="Protein"
              value={Number(product.nutrients.protein.toFixed(2))}
              max={120}
              unit="g"
            />
            <NutrientBar
              label="Carbs"
              value={Number(product.nutrients.carbs.toFixed(2))}
              max={250}
              unit="g"
            />
            <NutrientBar
              label="Fat"
              value={Number(product.nutrients.fat.toFixed(2))}
              max={65}
              unit="g"
            />
            <NutrientBar
              label="Fiber"
              value={Number(product.nutrients.fiber.toFixed(2))}
              max={30}
              unit="g"
            />
            <NutrientBar
              label="Sugar"
              value={Number(product.nutrients.sugar.toFixed(2))}
              max={50}
              unit="g"
            />
            <NutrientBar
              label="Sodium"
              value={Number(product.nutrients.sodium.toFixed(2))}
              max={2300}
              unit="mg"
            />
            <NutrientBar
              label="Saturated Fat"
              value={Number(product.nutrients.saturatedFat.toFixed(2))}
              max={20}
              unit="g"
            />

            {/* Alerts */}
            <h3>Health Alerts</h3>
            {product.alerts.map((a, i) => (
              <NutrientAlert key={i} {...a} />
            ))}

            {/* Ingredients */}
            <h3>Ingredients</h3>
            <ul>
              {product.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            {/* Allergens */}
            <h3>Allergens</h3>
            <ul>
              {product.allergens.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>

            {/* Additives */}
            <h3>Additives</h3>
            <ul>
              {product.additives.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>

            {/* Action */}
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowLogModal(true)}
                className={styles.buttonSecondary}
              >
                Add to Food Log
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogModal && product && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <button
        onClick={() => setShowLogModal(false)}
        className={styles.closeBtn}
      >
        <X size={18} />
      </button>

      <h2>Add to Food Log</h2>
      <p className={styles.productMeta}>{product.name}</p>

      {/* ✅ Meal Selection */}
      <h3>Meal Type</h3>
      <div className={styles.mealOptions}>
        {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
          <button
            key={meal}
            onClick={() => setMealType(meal)}
            className={`${styles.mealButton} ${
              mealType === meal ? styles.activeMeal : ""
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      {/* ✅ Quantity */}
      <h3>Quantity (servings)</h3>

        <div className={styles.quantityWrapper}>
          <button
            onClick={() => setQuantity((q) => Math.max(0.1, +(q - 0.1).toFixed(1)))}
            className={styles.qtyBtn}
          >
            -&nbsp;&nbsp;
          </button>

          <span className={styles.quantityValue}>{quantity}</span>

          <button
            onClick={() => setQuantity((q) => +(q + 0.1).toFixed(1))}
            className={styles.qtyBtn}
          >
            &nbsp;&nbsp;+
          </button>
        </div>

      {/* ✅ Submit */}
      <div className={styles.modalActions}>
        <button
          onClick={addToFoodLog}
          className={styles.buttonPrimary}
        >
          Confirm & Add
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ScanPage;