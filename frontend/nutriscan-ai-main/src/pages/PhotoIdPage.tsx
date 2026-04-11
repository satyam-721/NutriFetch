import { useState } from "react";
import { Camera, Upload, Loader2, CheckCircle } from "lucide-react";
import { HealthScoreRing } from "../components/HealthScoreRing";

const PhotoIdPage = () => {
  const [state, setState] = useState<"idle" | "loading" | "result">("idle");

  const mockResult = {
    name: "Snickers Bar",
    brand: "Mars",
    confidence: 94,
    cal: 250,
    score: 22,
    protein: 4,
    carbs: 33,
    fat: 12,
    sugar: 27,
  };

  const handleUpload = () => {
    setState("loading");
    setTimeout(() => setState("result"), 2000);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Photo Identification</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload a photo and AI will identify the food</p>
      </div>

      {state === "idle" && (
        <div className="glass-card p-8 flex flex-col items-center justify-center space-y-6 min-h-[350px]">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-foreground font-medium">Take or upload a food photo</p>
            <p className="text-sm text-muted-foreground">AI will identify the product and fetch nutrition data</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              className="px-6 py-3 gradient-primary rounded-xl text-primary-foreground font-medium text-sm flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
            <button
              onClick={handleUpload}
              className="px-6 py-3 bg-secondary rounded-xl text-secondary-foreground font-medium text-sm flex items-center gap-2 hover:bg-muted transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      )}

      {state === "loading" && (
        <div className="glass-card p-8 flex flex-col items-center justify-center space-y-4 min-h-[350px]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Analyzing image with AI...</p>
        </div>
      )}

      {state === "result" && (
        <div className="space-y-6">
          <div className="glass-card p-6 flex flex-col lg:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-xl bg-secondary flex items-center justify-center">
              <span className="text-4xl">🍫</span>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">{mockResult.confidence}% confidence</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mt-1">{mockResult.name}</h2>
              <p className="text-sm text-muted-foreground">{mockResult.brand}</p>
            </div>
            <HealthScoreRing score={mockResult.score} size={100} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Calories", value: `${mockResult.cal} kcal` },
              { label: "Protein", value: `${mockResult.protein}g` },
              { label: "Carbs", value: `${mockResult.carbs}g` },
              { label: "Fat", value: `${mockResult.fat}g` },
            ].map((n) => (
              <div key={n.label} className="glass-card p-4 text-center">
                <p className="text-lg font-bold text-foreground">{n.value}</p>
                <p className="text-xs text-muted-foreground">{n.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 gradient-primary rounded-xl text-primary-foreground font-medium text-sm">
              + Add to Log
            </button>
            <button
              onClick={() => setState("idle")}
              className="px-6 py-3 bg-secondary rounded-xl text-secondary-foreground font-medium text-sm"
            >
              Scan Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoIdPage;
