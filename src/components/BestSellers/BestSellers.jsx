import { Link } from "react-router-dom";

// 🐻 IMPORT YOUR PRODUCT IMAGES HERE

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

  // Duplicate array to enable an unbroken, infinite pixel track loop
  const doubleProducts = [...products, ...products];

  return (
    <section className="relative w-full bg-[#FFF9F6] py-16 overflow-hidden">
      
      {/* Section Typography Title */}
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

      {/* CSS Animation Styles injected directly for portability */}
      <style>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: infiniteScroll 35s linear infinite;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Slider Loop Container */}
      <div className="relative w-full overflow-hidden mask-gradient-edges">
        <div className="animate-marquee-track gap-6 px-4">
          {doubleProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="group relative w-[240px] flex-shrink-0 flex flex-col justify-between rounded-2xl border border-[#6D442C]/10 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-[#FF8580]/30"
            >
              <div>
                {/* Product Card Image Wrapper */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F7F2EF]">
                  
                  {/* Small Info Tag */}
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7A5A3A] shadow-xs">
                    {product.badge}
                  </span>

                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Meta details area below image */}
                <div className="mt-3.5 space-y-1">
                  <h3 className="font-serif text-base font-bold tracking-tight text-[#4D3A2A] truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#FF8580]">
                      {product.price}
                    </p>
                    <span className="text-xs text-[#FFB7B2]/40">♥</span>
                  </div>
                </div>
              </div>

              {/* Shop Now Action Trigger */}
              {/* Shop Now Action Trigger */}
<div className="mt-4">
  <Link
    // Navigate to the collections page, optionally passing a query parameter 
    // to filter by the product's collection name if you have that data
    to={`/collections?filter=${encodeURIComponent(product.collectionName || "All Collections")}`}
    className="inline-flex w-full h-9 items-center justify-center gap-1 rounded-xl bg-[#6D442C] text-[11px] font-bold tracking-wider uppercase text-[#FFF9F6] transition-colors hover:bg-[#FF8580]"
  >
    <span>Shop Now</span>
    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
  </Link>
</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}