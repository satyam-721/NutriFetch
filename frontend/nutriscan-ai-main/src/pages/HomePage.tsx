import { Link } from "react-router-dom";
import {
  Apple,
  ScanBarcode,
  BarChart3,
  Shield,
  Camera,
  Target,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ScanBarcode,
    title: "Barcode Scanning",
    desc: "Instantly scan any food barcode to get full nutrition data, ingredients, and health scores.",
  },
  {
    icon: Shield,
    title: "Allergen Detection",
    desc: "Automatically detect harmful additives and allergens like nuts, gluten, and lactose.",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    desc: "Visualize your nutrition trends with interactive charts and AI-powered analysis.",
  },
  {
    icon: Camera,
    title: "Photo Identification",
    desc: "Snap a photo and let AI identify any food item with full nutritional breakdown.",
  },
  {
    icon: Target,
    title: "Goal Planning",
    desc: "Set personalized diet goals and get AI-generated meal plans tailored to you.",
  },
  {
    icon: Zap,
    title: "Health Score Rating",
    desc: "Every food gets a 0–100 score based on nutrient density, sugar, and additives.",
  },
];

const testimonials = [
  { name: "Sarah M.", role: "Fitness Coach", quote: "NutriScan completely changed how I plan meals for my clients. The barcode scanning is incredibly fast.", rating: 5 },
  { name: "James R.", role: "Health Enthusiast", quote: "The allergen detection saved me multiple times. I finally feel safe trying new foods.", rating: 5 },
  { name: "Priya K.", role: "Nutritionist", quote: "The AI insights and health scores are surprisingly accurate. I recommend it to all my patients.", rating: 5 },
];

const stats = [
  { value: "50", label: "Foods Scanned" },
  { value: "3", label: "Active Users" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "4.9★", label: "User Rating" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Apple className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">NutriScan</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Log In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" /> AI-Powered Nutrition Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
            Know What You Eat.
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Live Healthier.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scan barcodes, identify food with photos, get instant health scores, detect allergens, and receive AI-powered diet recommendations — all in one app.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="gradient-primary text-primary-foreground text-base px-8 gap-2 w-full sm:w-auto">
                Start Scanning Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-border text-foreground text-base px-8 w-full sm:w-auto">
                See Features
              </Button>
            </a>
          </div>
          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Everything You Need for Smarter Eating</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Powerful tools that give you complete control over your nutrition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">Three simple steps to better nutrition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Scan or Snap", desc: "Use the barcode scanner or take a photo of any food item." },
              { step: "02", title: "Get Instant Analysis", desc: "Receive health score, nutrient breakdown, and allergen warnings." },
              { step: "03", title: "Track & Improve", desc: "Log meals, monitor trends, and follow AI-generated diet plans." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Loved by Health-Conscious People</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center glass-card p-8 sm:p-12 glow-primary">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Take Control of Your Nutrition?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            Join thousands of users making smarter food choices every day.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gradient-primary text-primary-foreground text-base px-10 gap-2">
              Get Started — It's Free <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Free forever plan</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Apple className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">NutriScan</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 NutriScan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
