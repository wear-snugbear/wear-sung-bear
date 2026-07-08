import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BestSellers() {
  const products = [
    { id: "honey-bear", name: "Honey Bear", price: "₹549", img: "/images/Honey_bear.png", badge: "Basics Essential", collectionName: "Snugbear Basics" },
    { id: "rosy-bear", name: "Rosy Bear", price: "₹549", img: "/images/rosy_bear.png", badge: "Best Seller", collectionName: "Snugbear Basics" },
    { id: "creamy-bear", name: "Creamy Bear", price: "₹549", img: "/images/creamy_beary.png", badge: "Comfy Pick", collectionName: "Snugbear Basics" },
    { id: "daydream-bloom", name: "Daydream Bloom", price: "₹699", img: "/images/daydream_bloom.png", badge: "Cute Choice", collectionName: "Moody Collection" },
    { id: "sleepy-baby", name: "Sleepy Baby", price: "₹699", img: "/images/sleepy_baby.png", badge: "Cozy Essential", collectionName: "Moody Collection" },
    { id: "crybaby-club", name: "Crybaby Club", price: "₹699", img: "/images/crybaby_club.png", badge: "New Trend", collectionName: "Moody Collection" },
    { id: "honey-hug", name: "Honey Hug", price: "₹699", img: "/images/Honey_Hug.png", badge: "Oversized Fit", collectionName: "Moody Collection" },
    { id: "cloudy-nap", name: "Cloudy Nap", price: "₹699", img: "/images/cloudy_nap.png", badge: "Must Have", collectionName: "Moody Collection" },
    { id: "tiny-tantrum", name: "Tiny Tantrum", price: "₹699", img: "/images/tiny_tantrum.png", badge: "Classic Drop", collectionName: "Moody Collection" },
  ];

  return (
    <section className="relative w-full bg-[#FFF9F6] pt-16 pb-16 overflow-hidden">
      <div className="mb-10 text-center space-y-2 px-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFEAE8] px-3.5 py-1 text-xs font-bold tracking-wide text-[#FF8580]">
          ♥ CUTE SELECTIONS ♥
        </span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-[#4D3A2A] sm:text-4xl">
          Our Sweet <span className="text-[#FF8580]">Best Sellers</span>
        </h2>
        <p className="mx-auto max-w-sm text-xs text-[#7A6B5C]">
          Catch them before they find a new home! Hand-crafted comfort pieces.
        </p>
      </div>

      {/* 
        Using framer-motion drag constraints. 
        x: ["0%", "-50%"] creates the infinite loop effect.
        drag="x" allows user touch/mouse swipe.
      */}
      <div className="cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div 
  className="flex gap-6 px-4"
  animate={{ x: ["0%", "-50%"] }}
  transition={{
    duration: 7, // Decrease this number to make it faster (e.g., 3-7)
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop", // Ensures smooth transition back to 0%
  }}
  whileHover={{ animationPlayState: "paused" }}
>
          {[...products, ...products].map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="group relative w-[240px] flex-shrink-0 flex flex-col justify-between rounded-2xl border border-[#6D442C]/10 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-[#FF8580]/30"
            >
              {/* Wrapped in a Link so the whole card is clickable */}
              <Link to={`/collections?filter=${encodeURIComponent(product.collectionName)}`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F7F2EF]">
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7A5A3A] shadow-xs">
                    {product.badge}
                  </span>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-3.5 space-y-1">
                  <h3 className="font-serif text-base font-bold tracking-tight text-[#4D3A2A] truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#FF8580]">{product.price}</p>
                    <span className="text-xs text-[#FFB7B2]/40">♥</span>
                  </div>
                </div>
              </Link>

              <div className="mt-4">
                <Link
                  to={`/collections?filter=${encodeURIComponent(product.collectionName)}`}
                  className="inline-flex w-full h-9 items-center justify-center gap-1 rounded-xl bg-[#6D442C] text-[11px] font-bold tracking-wider uppercase text-[#FFF9F6] transition-colors hover:bg-[#FF8580]"
                >
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}