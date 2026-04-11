import { useState } from "react";
import { Target, Activity, User, Scale, TrendingUp, Dumbbell } from "lucide-react";
import NutrientBar from "../components/NutrientBar";

const GoalsPage = () => {
  const [profile, setProfile] = useState({
    age: 28,
    gender: "male",
    weight: 75,
    height: 178,
    activity: "moderate",
    goal: "maintain",
  });

  const [goals,setGoals] = useState({
    calories: 1700,
    protein: 120,
    carbs: 250,
    fat: 65,
    fiber: 30,
  });

  const current = { calories: 1420, protein: 82, carbs: 165, fat: 48, fiber: 14 };

  const goalOptions = [
    { value: "lose", label: "Lose Weight", icon: Scale, desc: "Calorie deficit with high protein" },
    { value: "maintain", label: "Maintain", icon: Activity, desc: "Balanced nutrition plan" },
    { value: "gain", label: "Gain Muscle", icon: Dumbbell, desc: "Calorie surplus with training" },
  ];

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", desc: "Little to no exercise. Mostly sitting (desk job, minimal movement)." },
    { value: "light", label: "Light", desc: "Light exercise 1–3 days/week. Some walking or casual activity." },
    { value: "moderate", label: "Moderate", desc: "Moderate exercise 3–5 days/week. Regular workouts or active lifestyle." },
    { value: "active", label: "Active", desc: "Hard exercise 6–7 days/week or physically demanding job." },
  ];

  const fetchNutri = async () => {
        try {
          console.log("check");
          const res = await fetch("http://localhost:8000/profile/nutri");
          const data = await res.json();
          console.log(data)
          setGoals(data);
  
        } catch (err) {
          console.error("Failed to fetch food log", err);
        }
      };
  // ✅ NEW: backend call function
  const saveProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to save");

      console.log("Profile saved successfully");
      fetchNutri();
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  // ✅ NEW: get selected activity description
  const selectedActivity = activityLevels.find(a => a.value === profile.activity);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Diet Goals</h1>
        <p className="text-muted-foreground text-sm mt-1">Personalize your nutrition targets</p>
      </div>

      {/* Goal Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {goalOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setProfile({ ...profile, goal: opt.value })}
            className={`p-5 rounded-xl border text-left transition-all ${
              profile.goal === opt.value
                ? "border-primary bg-primary/5 glow-primary"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <opt.icon className={`w-6 h-6 mb-2 ${profile.goal === opt.value ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-semibold text-foreground">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Your Profile</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Weight (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Height (cm)</label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Activity Level</label>
            <div className="flex flex-wrap gap-2">
              {activityLevels.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setProfile({ ...profile, activity: a.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    profile.activity === a.value
                      ? "gradient-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            {/* ✅ NEW: Description */}
            {selectedActivity && (
              <p className="text-xs text-muted-foreground mt-2 bg-secondary/50 p-2 rounded-md">
                {selectedActivity.desc}
              </p>
            )}
          </div>

          {/* ✅ NEW: Save Button */}
          <button
            onClick={saveProfile}
            className="w-full mt-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Save Profile
          </button>
        </div>

        {/* Calculated Targets */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Daily Targets</h3>
          </div>
          <div className="text-center py-3 border-b border-border/50">
            <p className="text-3xl font-bold text-foreground">{goals.calories}</p>
            <p className="text-xs text-muted-foreground">Calories / day</p>
          </div>
          <NutrientBar label="Protein" value={current.protein} max={goals.protein} unit="g" colorClass="bg-nutrient-protein" />
          <NutrientBar label="Carbs" value={current.carbs} max={goals.carbs} unit="g" colorClass="bg-nutrient-carbs" />
          <NutrientBar label="Fat" value={current.fat} max={goals.fat} unit="g" colorClass="bg-nutrient-fat" />
          <NutrientBar label="Fiber" value={current.fiber} max={goals.fiber} unit="g" colorClass="bg-nutrient-fiber" />
          <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <TrendingUp className="w-4 h-4 text-primary" />
            <p className="text-xs text-foreground">Remember to drink water</p>
          </div>
        </div>
      </div>

      {/* AI Meal Plan */}
      {/* <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">🤖 AI-Generated Meal Plan</h3>
        <div className="grid lg:grid-cols-4 gap-3">
          {[
            { meal: "Breakfast", suggestion: "Oatmeal with berries, chia seeds & almond butter", cal: 380 },
            { meal: "Lunch", suggestion: "Grilled chicken bowl with quinoa, avocado & greens", cal: 520 },
            { meal: "Snack", suggestion: "Greek yogurt with honey & walnuts", cal: 200 },
            { meal: "Dinner", suggestion: "Baked salmon with sweet potato & steamed broccoli", cal: 480 },
          ].map((m) => (
            <div key={m.meal} className="p-4 bg-secondary/50 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-primary">{m.meal}</p>
              <p className="text-sm text-foreground">{m.suggestion}</p>
              <p className="text-xs text-muted-foreground">{m.cal} cal</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default GoalsPage;