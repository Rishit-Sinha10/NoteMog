import React from "react";

export default function Testimonials() {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-surface-container-low/20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-up" data-observe="">
          <h2 className="font-headline-lg text-headline-lg mb-6">
            Loved by Students Everywhere
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Join over 10,000+ students from top universities who are reclaiming
            their time with Lumina.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-white bg-surface-variant"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-primary-container"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-secondary-fixed"></div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-surface-container-highest"></div>
            </div>
            <div className="text-on-surface-variant text-sm font-semibold flex items-center">
              4.9/5 Average Rating
            </div>
          </div>
        </div>
        <div className="space-y-6 animate-up" data-observe="">
          <div className="bg-white p-8 rounded-2xl soft-shadow border border-surface-variant/10 italic">
            "Lumina transformed my finals week. What used to take 5 hours of
            planning now takes 5 minutes. The summaries are frighteningly
            accurate."
            <div className="mt-4 not-italic font-bold text-primary">
              — Sarah J., Medical Student
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl soft-shadow border border-surface-variant/10 italic ml-8">
            "The clean interface helps me focus. I love the Notion-like
            aesthetic, it makes studying feel less like a chore and more like
            a creative session."
            <div className="mt-4 not-italic font-bold text-primary">
              — Marcus K., Computer Science
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
