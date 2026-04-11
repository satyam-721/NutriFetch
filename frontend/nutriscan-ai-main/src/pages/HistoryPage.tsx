import { useState } from "react";
import { Clock, RotateCcw, Search } from "lucide-react";

const historyData = [
  {
    date: "Today",
    meals: [
      { id: 1, name: "Greek Yogurt & Berries", time: "8:30 AM", cal: 210, score: 85 },
      { id: 2, name: "Grilled Chicken Salad", time: "12:45 PM", cal: 480, score: 78 },
      { id: 3, name: "Protein Smoothie", time: "3:15 PM", cal: 320, score: 72 },
      { id: 4, name: "Salmon with Quinoa", time: "7:00 PM", cal: 410, score: 88 },
    ],
  },
  {
    date: "Yesterday",
    meals: [
      { id: 5, name: "Oatmeal with Banana", time: "7:45 AM", cal: 280, score: 82 },
      { id: 6, name: "Turkey Wrap", time: "1:00 PM", cal: 420, score: 70 },
      { id: 7, name: "Mixed Nuts", time: "4:00 PM", cal: 180, score: 68 },
      { id: 8, name: "Stir Fry Vegetables", time: "7:30 PM", cal: 350, score: 90 },
    ],
  },
  {
    date: "March 11",
    meals: [
      { id: 9, name: "Scrambled Eggs & Toast", time: "8:00 AM", cal: 310, score: 75 },
      { id: 10, name: "Caesar Salad", time: "12:30 PM", cal: 390, score: 65 },
      { id: 11, name: "Protein Bar", time: "3:30 PM", cal: 200, score: 55 },
      { id: 12, name: "Pasta Primavera", time: "7:15 PM", cal: 520, score: 62 },
    ],
  },
];

const HistoryPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meal History</h1>
        <p className="text-muted-foreground text-sm mt-1">Re-log your favorite meals with one tap</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search past meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-6">
        {historyData.map((day) => (
          <div key={day.date} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{day.date}</h3>
            <div className="space-y-2">
              {day.meals
                .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
                .map((meal) => (
                  <div key={meal.id} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{meal.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {meal.time} • {meal.cal} cal • Score: {meal.score}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">
                      <RotateCcw className="w-3 h-3" />
                      Re-log
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
