import React from "react";

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Desktop App"],
  },
  {
    title: "Resources",
    links: ["Study Tips", "Help Center", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];
export default function Footer() {
  return (
    <footer className="w-full py-section-padding-desktop bg-surface-bright dark:bg-inverse-surface mt-20">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-base">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-headline-md">
              lightbulb
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
              Lumina
            </span>
          </div>
          <p className="text-on-surface-variant dark:text-surface-variant text-body-md mb-4">
            Empowering students with AI-driven clarity.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              alternate_email
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              groups
            </span>
          </div>
        </div>
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h5 className="font-bold text-primary dark:text-primary-fixed mb-6">
              {section.title}
            </h5>
            <ul className="space-y-4">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href="#"
                    className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-20 pt-10 border-t border-surface-variant/20">
        <p className="text-on-surface-variant dark:text-surface-variant text-body-md">
          © 2024 Lumina AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
