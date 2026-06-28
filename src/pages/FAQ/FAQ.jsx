import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  { q: "How do I track my order?", a: "Once your Snugbear is on its way, you'll receive a tracking link via email! You can also head over to our 'Track Order' page." },
  { q: "What is the Founding Circle?", a: "The Founding Circle is our inner community of the first 50 supporters who helped us launch. It comes with exclusive perks and early access." },
  { q: "How do I return a Snugbear item?", a: "We want you to be perfectly cozy! If it's not a match, reach out to us within 14 days of delivery for a stress-free return." },
  { q: "Are your materials sustainable?", a: "We prioritize softness and durability. We're committed to ethical sourcing and cozy, long-lasting fabrics for all our pieces." },
  { q: "Do you ship internationally?", a: "Currently, we are spreading cozy vibes across India. We're working hard to bring the Snugbear to more places soon!" }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#FFFBF9] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-serif text-[#4D3A2A] mb-4">
            Cozy Questions 🧸
          </h1>
          <p className="text-[#A68F81]">Everything you need to know to stay comfy.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="bg-white border border-[#E5DCD5] rounded-3xl overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center font-bold text-[#6D442C]"
              >
                {item.q}
                <span className="text-[#FF8580]">{activeIndex === i ? "−" : "+"}</span>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-sm text-[#8D7B6F] leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-[#FFF0EF] p-8 rounded-3xl">
          <h3 className="font-bold text-[#4D3A2A] mb-2">Still have questions?</h3>
          <p className="text-sm text-[#A68F81] mb-4">We're always here to help you get cozy.</p>
          <a href="mailto:snugbearofficial@gmail.com" className="inline-block bg-[#6D442C] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#FF8580] transition-colors">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}