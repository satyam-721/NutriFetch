import { useState } from "react";

import { loginUser } from "../Auth/loginUser";
import { useEffect } from "react";
import { supabase } from "../Auth/SupaBaseClient";
import { Apple } from "lucide-react";



// ── Inline SVG Icons ──────────────────────────────────────────────
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 2a3 3 0 0 0-3 3c0 1.5.8 2.8 2 3.4A5 5 0 0 0 7 13v1a5 5 0 0 0 10 0v-1a5 5 0 0 0-4-4.9A3.5 3.5 0 0 0 15 5a3 3 0 0 0-3-3z" />
  </svg>
);

const EyeIcon = ({ off }: { off?: boolean }) =>
  off ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 opacity-60">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// ── Floating particle component ───────────────────────────────────
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute rounded-full bg-emerald-500 opacity-[0.15] blur-sm"
    style={style}
  />
);

// ── Main Login Component ──────────────────────────────────────────
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      window.location.href = "/goals";
    }
  };

  checkSession();
}, []);




  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) return;

  try {
    setLoading(true);

    const data = await loginUser(email, password);
    console.log("Logged in:", data);

    // redirect after login
    window.location.href = "/goals";
  } catch (err: any) {
    alert(err);
  } finally {
    setLoading(false);
  }
};

  const particles = [
    { width: 6, height: 6, top: "12%", left: "8%", animation: "float1 6s ease-in-out infinite" },
    { width: 10, height: 10, top: "25%", right: "10%", animation: "float2 8s ease-in-out infinite" },
    { width: 4, height: 4, top: "60%", left: "5%", animation: "float3 7s ease-in-out infinite" },
    { width: 8, height: 8, bottom: "20%", right: "7%", animation: "float1 9s ease-in-out infinite reverse" },
    { width: 5, height: 5, top: "80%", left: "20%", animation: "float2 5s ease-in-out infinite" },
    { width: 12, height: 12, top: "40%", right: "3%", animation: "float3 11s ease-in-out infinite" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #050a05;
          font-family: 'DM Sans', sans-serif;
        }

        .font-syne { font-family: 'Syne', sans-serif; }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-18px) translateX(8px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-24px) rotate(180deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateX(0px) scale(1); }
          50% { transform: translateX(14px) scale(1.3); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-slide { animation: fadeSlideUp 0.6s ease forwards; }
        .animate-fade-slide-1 { animation: fadeSlideUp 0.6s 0.1s ease both; }
        .animate-fade-slide-2 { animation: fadeSlideUp 0.6s 0.2s ease both; }
        .animate-fade-slide-3 { animation: fadeSlideUp 0.6s 0.3s ease both; }
        .animate-fade-slide-4 { animation: fadeSlideUp 0.6s 0.4s ease both; }

        .glow-orb-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
          top: -120px; left: -120px;
          animation: pulse-glow 4s ease-in-out infinite;
          pointer-events: none;
        }
        .glow-orb-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: pulse-glow 6s ease-in-out infinite reverse;
          pointer-events: none;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .card-glass {
          background: rgba(10, 20, 10, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(16,185,129,0.15);
          box-shadow:
            0 0 0 1px rgba(16,185,129,0.05),
            0 32px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .input-field {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(16,185,129,0.12);
          color: #e2e8f0;
          transition: all 0.25s ease;
          outline: none;
        }
        .input-field::placeholder { color: rgba(156,163,175,0.5); }
        .input-field:focus {
          background: rgba(16,185,129,0.05);
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.08), 0 0 20px rgba(16,185,129,0.06);
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
          box-shadow: 0 4px 24px rgba(16,185,129,0.3), 0 1px 0 rgba(255,255,255,0.1) inset;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 200%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transition: left 0.4s ease;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover {
          box-shadow: 0 6px 32px rgba(16,185,129,0.45), 0 1px 0 rgba(255,255,255,0.1) inset;
          transform: translateY(-1px);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-social {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s ease;
        }
        .btn-social:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(16,185,129,0.25);
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .logo-ring {
          animation: spin-slow 20s linear infinite;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7, #34d399, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .checkbox-custom {
          appearance: none;
          width: 16px; height: 16px;
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 4px;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          flex-shrink: 0;
        }
        .checkbox-custom:checked {
          background: #10b981;
          border-color: #10b981;
        }
        .checkbox-custom:checked::after {
          content: '';
          position: absolute;
          left: 4px; top: 1px;
          width: 5px; height: 9px;
          border: 2px solid white;
          border-top: none; border-left: none;
          transform: rotate(45deg);
        }

        .label-float {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          color: rgba(156,163,175,0.6);
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .label-float.active {
          top: 8px;
          transform: translateY(0);
          font-size: 10px;
          color: #10b981;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg" style={{ background: "#050a05" }}>
        {/* Ambient orbs */}
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={{ width: p.width, height: p.height, top: p.top, left: p.left, right: p.right, bottom: p.bottom, animation: p.animation } as React.CSSProperties} />
        ))}

        {/* Brand corner mark */}
        <div className="absolute top-6 left-6 flex items-center gap-2.5 animate-fade-slide">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981, #047857)" }}>
            <Apple className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-syne text-sm font-bold" style={{ color: "#e2e8f0" }}>NutriScan</span>
        </div>

        {/* Version tag */}
        <div className="absolute top-6 right-6 animate-fade-slide">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <LeafIcon />
            <span style={{ fontSize: 11, color: "#10b981", fontFamily: "'DM Sans'" }}>v1.0 · Learning Pro</span>
          </div>
        </div>

        {/* ── Login Card ────────────────────────────── */}
        <div className="card-glass rounded-2xl w-full mx-4 animate-fade-slide" style={{ maxWidth: 420, padding: "40px 36px" }}>

          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-slide-1">
            <div className="relative">
              {/* Spinning ring */}
              <svg className="logo-ring" width="68" height="68" viewBox="0 0 68 68" style={{ position: "absolute", top: -4, left: -4 }}>
                <circle cx="34" cy="34" r="30" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 8" />
              </svg>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981 0%, #047857 100%)", boxShadow: "0 8px 32px rgba(16,185,129,0.35)" }}>
                <Apple className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8 animate-fade-slide-2">
            <h1 className="font-syne font-bold mb-2" style={{ fontSize: 26, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 13.5, color: "rgba(148,163,184,0.7)", lineHeight: 1.6 }}>
              Sign in to continue your nutrition journey
            </p>
          </div>


          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 animate-fade-slide-3">
            <div className="divider-line" />
            <span style={{ fontSize: 11, color: "rgba(148,163,184,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Enter Email and password</span>
            <div className="divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-fade-slide-4" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: focused === "email" || email ? "#10b981" : "rgba(148,163,184,0.4)", transition: "color 0.2s" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="Email address"
                required
                className="input-field w-full rounded-xl"
                style={{ padding: "14px 16px 14px 42px", fontSize: 14 }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: focused === "password" || password ? "#10b981" : "rgba(148,163,184,0.4)", transition: "color 0.2s" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                placeholder="Password"
                required
                className="input-field w-full rounded-xl"
                style={{ padding: "14px 44px 14px 42px", fontSize: 14 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.4)", padding: 0, display: "flex" }}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between" style={{ marginTop: 2 }}>
              <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  className="checkbox-custom"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span style={{ fontSize: 12.5, color: "rgba(148,163,184,0.6)" }}>Remember me</span>
              </label>
              
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full rounded-xl font-syne font-semibold flex items-center justify-center gap-2"
              style={{ padding: "14px 24px", fontSize: 14.5, color: "white", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: 6, opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4" style={{ animation: "spin-slow 1s linear infinite" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center mt-6" style={{ fontSize: 13, color: "rgba(148,163,184,0.55)" }}>
            New to NutriScan?{" "}
            <a href="" style={{ color: "#10b981", textDecoration: "none", fontWeight: 500 }}
              onMouseOver={e => (e.currentTarget.style.color = "#34d399")}
              onMouseOut={e => (e.currentTarget.style.color = "#10b981")}>
              Create a free account
            </a>
          </p>

          {/* Health note */}
          <div className="flex items-center justify-center gap-1.5 mt-5" style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.08)" }}>
            <LeafIcon />
            <p style={{ fontSize: 11, color: "rgba(148,163,184,0.45)", textAlign: "center" }}>
              Your nutrition data is encrypted and never shared.
            </p>
          </div>
        </div>

        {/* Bottom brand line */}
        <p className="absolute bottom-5" style={{ fontSize: 11, color: "rgba(148,163,184,0.2)", letterSpacing: "0.06em" }}>
          © 2026 NutriScan · All rights reserved
        </p>
      </div>
    </>
  );
}