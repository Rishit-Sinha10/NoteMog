import React, { useState } from "react";

const faqs = [
  {
    question: "How accurate is the AI summarization?",
    answer:
      "Our models are trained on academic datasets and specifically tuned for clarity and information density. We achieve 98% factual retention in our tests.",
  },
  {
    question: "Can I import notes from Notion or Google Docs?",
    answer:
      "Yes! We support direct integrations with Notion, Google Drive, and OneDrive for seamless content syncing.",
  },
  {
    question: "Is there a student discount for the Pro plan?",
    answer:
      "Absolutely. Students with a valid .edu email address get 40% off the annual Pro subscription.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-surface-container-low/10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-up" data-observe="">
          <h2 className="font-headline-lg text-headline-lg">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-surface-variant/10 animate-up"
              data-observe=""
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-toggle w-full px-8 py-6 flex justify-between items-center text-left hover:bg-surface-bright transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span
                  className="material-symbols-outlined transition-transform duration-300"
                  style={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </button>
              <div
                className="faq-content overflow-hidden transition-all duration-300 px-8 text-on-surface-variant"
                style={{
                  maxHeight: openIndex === index ? "500px" : "0px",
                }}
              >
                <p className="pb-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
