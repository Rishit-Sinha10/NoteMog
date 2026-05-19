import React from "react";

const pricingPlans = [
  {
    name: "Free Starter",
    price: "0",
    popular: false,
    features: [
      "5 summaries per month",
      "Basic study calendar",
      "Community support",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro Learner",
    price: "12",
    popular: true,
    features: [
      "Unlimited AI Summaries",
      "Dynamic Study Dashboard",
      "Priority AI processing",
      "Offline Access & Export",
    ],
    buttonText: "Upgrade to Pro",
  },
];

export default function Pricing() {
  return (
    <section
      className="py-section-padding-mobile md:py-section-padding-desktop px-gutter"
      id="pricing"
    >
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 animate-up" data-observe="">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Transparent Pricing
          </h2>
          <p className="text-on-surface-variant">
            Start for free, upgrade as you grow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-10 rounded-3xl flex flex-col animate-up ${
                plan.popular
                  ? "bg-white border-2 border-primary-container relative"
                  : "bg-white border border-surface-variant/20 hover:border-primary-container transition-all"
              }`}
              data-observe=""
            >
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full font-label-caps text-label-caps">
                  MOST POPULAR
                </div>
              )}
              <h4 className="font-headline-md text-2xl mb-2">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-on-surface-variant">/mo</span>
              </div>
              <ul
                className={`space-y-4 mb-10 flex-grow ${plan.popular ? "font-semibold" : "text-on-surface-variant"}`}
              >
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-xl font-bold active:scale-95 transition-all ${
                  plan.popular
                    ? "bg-primary-container text-on-primary-container hover:shadow-lg"
                    : "border border-outline text-on-background hover:bg-surface-container-low"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
