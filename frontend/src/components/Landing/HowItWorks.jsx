import React from "react";

const steps = [
  {
    number: "1",
    title: "Upload Notes",
    description: "PDFs, images, or raw text—just drop your materials in.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpfbQuHihSNVi2ZnLTT5k69mQ-oJexWI8qWA9wkDBh_HSntgMr7dDk5Slam55t4K0MFA9uGxRKXyEwD25gJTe2O7q9P4YE1tURVl7UhqgjjpB5JMghwOzKyXTiutGUwm82_yp8KBXJ2rDuECHZ_B8Ok4BZ7IClgJhEnPZRiOl193vdVxnetLrVgMVcWIOMr9u4GMB8yz1Q8We2WCJf3HoeLMwSBOQmb3LXfRloPR8CbbW82uHfuTa2jeB8tcCyz1KQajRK5NwopL6e",
  },
  {
    number: "2",
    title: "AI Generates Plan",
    description: "Our engine parses your content and builds a logical timeline.",
    delay: "100ms",
  },
  {
    number: "3",
    title: "Track Progress",
    description: "Follow the plan and watch your knowledge base grow.",
    delay: "200ms",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-section-padding-mobile md:py-section-padding-desktop px-gutter overflow-hidden"
      id="how-it-works"
    >
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 animate-up" data-observe="">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Simple Three-Step Process
          </h2>
          <p className="text-on-surface-variant">From chaos to clarity in minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-10 bg-surface-bright rounded-3xl border border-surface-variant/10 overflow-hidden group animate-up"
              data-observe=""
              style={{ transitionDelay: step.delay }}
            >
              <span className="absolute -top-4 -right-4 text-9xl font-bold text-primary-container opacity-20">
                {step.number}
              </span>
              <div className="relative z-10">
                <h4 className="font-headline-md text-2xl mb-4">{step.title}</h4>
                <p className="text-on-surface-variant">{step.description}</p>
                <div className="mt-8 p-4 bg-white rounded-2xl soft-shadow border border-surface-variant/20 translate-y-4 group-hover:translate-y-0 transition-transform">
                  {step.number === "1" && (
                    <img
                      className="w-full h-32 object-cover rounded-xl"
                      alt="Upload notes"
                      src={step.image}
                    />
                  )}
                  {step.number === "2" && (
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-primary-container/20 rounded"></div>
                      <div className="h-2 w-3/4 bg-primary-container/40 rounded"></div>
                      <div className="h-2 w-5/6 bg-primary-container/10 rounded"></div>
                    </div>
                  )}
                  {step.number === "3" && (
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-8 border-primary-container flex items-center justify-center text-primary font-bold text-2xl">
                        85%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
