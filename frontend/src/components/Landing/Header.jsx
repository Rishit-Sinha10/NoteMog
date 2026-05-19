import React from "react";
import { SignInButton, UserButton } from "@clerk/react";

export default function Header() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-sm border-b border-surface-variant/20 dark:border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="material-symbols-outlined text-primary text-2xl transition-transform group-hover:rotate-12">
            lightbulb
          </span>
          <span className="font-bold text-xl text-primary dark:text-primary-fixed-dim">
            Lumina
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, "#how-it-works")}
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors duration-200"
          >
            Process
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, "#pricing")}
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors duration-200"
          >
            Pricing
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-base">
          <SignInButton mode="modal" forceRedirectUrl="/">
            <button className="text-primary dark:text-primary-fixed font-semibold border-b-2 border-primary active:scale-95 transition-transform px-4 py-2 hover:opacity-80">
              Try Now
            </button>
          </SignInButton>
        </div>
      </div>
    </header>
  );
}
