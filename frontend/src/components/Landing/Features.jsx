import React from "react";

const features = [
  {
    icon: "calendar_month",
    title: "Smart Study Planner",
    description:
      "Intelligent scheduling that adapts to your learning pace and deadlines automatically.",
  },
  {
    icon: "summarize",
    title: "Instant Notes Summarization",
    description:
      "Turn hundreds of pages of lecture notes into concise, actionable summaries in seconds.",
  },
  {
    icon: "dashboard",
    title: "Progress Tracking Dashboard",
    description:
      "Visualize your growth with beautiful, data-driven dashboards and achievement badges.",
  },
  {
    icon: "psychology",
    title: "Personalized AI Recommendations",
    description:
      "Get custom learning paths and content suggestions based on your unique strengths.",
  },
];

export default function Features() {
  return (
    <section
      className="py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-surface-container-low/30"
      id="features"
    >
      <div className="max-w-container-max mx-auto text-center mb-16 animate-up" data-observe="">
        <h2 className="font-headline-lg text-headline-lg mb-4">
          Master Your Studies
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Powerful features designed to optimize every minute of your learning
          session.
        </p>
      </div>
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-base">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl border border-surface-variant/20 hover:border-primary-container hover:bg-surface-bright transition-all group animate-up"
            data-observe=""
          >
            <div className="w-14 h-14 bg-primary-container/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-headline-md text-2xl mb-3">{feature.title}</h3>
            <p className="text-on-surface-variant">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
