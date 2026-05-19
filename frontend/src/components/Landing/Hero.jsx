import React,{useEffect} from "react";
import { SignInButton } from "@clerk/react";
import { useAuth } from "@clerk/react";
import { Navigate,useNavigate } from "react-router-dom";
export default function Hero() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  // ✅ Redirect to dashboard when user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log(
        "[Login] User is signed in, redirecting to dashboard in 2 seconds...",
      );
      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, navigate]);
  return (
    <section className="relative overflow-hidden py-section-padding-mobile md:py-section-padding-desktop px-gutter pt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full radial-glow pointer-events-none opacity-50"></div>
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-up" data-observe="">
          <span className="inline-block bg-primary-container text-on-primary-container px-4 py-1 rounded-full font-label-caps text-label-caps mb-6">
            AI-POWERED LEARNING
          </span>
          <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero mb-6">
            Study Smarter, Not Harder with AI
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
            Plan your study schedule and summarize notes instantly using AI.
            Unlock academic excellence without the burnout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-body-md font-bold hover:shadow-lg transition-all active:scale-95">
                Get Started Free
              </button>
            </SignInButton>
            <button className="bg-transparent border border-outline px-8 py-4 rounded-xl font-body-md font-bold text-on-background flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors active:scale-95">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="relative animate-up" data-observe="">
          <div className="bg-white/40 p-4 rounded-3xl border border-white/50 backdrop-blur-sm">
            <img
              alt="Lumina Dashboard Illustration"
              className="w-full h-auto rounded-2xl soft-shadow"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCU4A616lal4IVjV7wnt9j7N-6-vHwC8eVgCxh6HhvKAjL6eIb2i6oLBP2Vf6HnVvlBCRLjBQkARGIV4T3g2e_nKB4TIgAZ17QqkFX9KumLiXV8vbrOCTXGfimaMNWjSie9BzH9eSwpWSAnU8vucAK-HJ3tg1zBdUdM5S8Q1IfVqNF0RgjTdzZXW4m4Ko0VY6jPMgaat2IlpRpx0sJpkNuvhB5fPg0w57eoHwvPw19nQZN82rwZbpJBseCSq5bBpIZhJXX9ixOjaHD"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
