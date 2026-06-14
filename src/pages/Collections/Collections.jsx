import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 🛒 Shared cart hook


// 🐻 REAL IMAGE ASSETS IMPORTED FROM YOUR REPO FILE TREE
import basicsImg from "../../assets/images/basics.png";
import cloudyNapImg from "../../assets/images/cloudy_nap.png";
import creamyBearImg from "../../assets/images/creamy_beary.png";
import crybabyClubImg from "../../assets/images/crybaby_club.png";
import daydreamBloomImg from "../../assets/images/daydream_bloom.png";
import deluluImg from "../../assets/images/delulu.png";
import honeyBearImg from "../../assets/images/Honey_bear.png";
import honeyHugImg from "../../assets/images/Honey_Hug.png";
import rosyBearImg from "../../assets/images/rosy_bear.png";
import sleepyBabyImg from "../../assets/images/sleepy_baby.png";
import tinyTantrumImg from "../../assets/images/tiny_tantrum.png";


// ==========================================
// 1. COMBINED GLOBAL BACKGROUND ANIMATION LAYER
// ==========================================
function BackgroundAnimations() {
  const [elements, setElements] = useState([]);


  useEffect(() => {
    // Generates a subtle assortment of ambient floating objects (Hearts and Bears)
    // Using fixed positions on layout mount to safely avoid hydration mismatches
    const generatedElements = Array.from({ length: 16 }).map((_, i) => {
      const isBear = i % 4 === 0; // Mix of hearts and teddy bears
      const heartPalette = [
        "#FF4D6D", // bright red-pink
        "#FF7AA2", // soft pink
        "#FF5C7A", // rose red
        "#FF9BCB", // pastel pink
      ];

      return {
        id: `bg-art-${i}`,
        type: isBear ? "bear" : "heart",
        left: `${Math.random() * 94 + 3}%`, // Keep safely within horizontal viewport bounds
        scale: isBear ? Math.random() * 0.4 + 0.4 : Math.random() * 0.55 + 0.8, // bigger hearts
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 10, // Slow ambient crawl speed
        opacity: isBear ? Math.random() * 0.06 + 0.03 : Math.random() * 0.35 + 0.28, // stronger visibility
        color: heartPalette[i % heartPalette.length],
      };
    });
    setElements(generatedElements);
  }, []);


  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-10%]"
          style={{ left: el.left, zIndex: 0 }}
          initial={{ y: 0, x: 0, opacity: 0, scale: el.scale }}
          animate={{
            y: "-120vh",
            x: [0, 20, -20, 15, -15, 0], // Sinuous swaying pattern as they rise
            opacity: [0, el.opacity, el.opacity, 0], // Gentle fade-in and soft dissolve
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.type === "bear" ? (
            // Mini Cute Bear SVG Graphic Profile
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#6D442C" style={{ opacity: 0.85 }}>
              <path d="M4.5 10c0-1.38 1.12-2.5 2.5-2.5.38 0 .74.09 1.06.24C8.6 6.64 9.73 6 11 6s2.4.64 2.94 1.74c.32-.15.68-.24 1.06-.24 1.38 0 2.5 1.12 2.5 2.5 0 .9-.48 1.69-1.19 2.13.12.44.19.9.19 1.37 0 3.04-2.46 5.5-5.5 5.5S5.5 16.54 5.5 13.5c0-.47.07-.93.19-1.37C4.98 11.69 4.5 10.9 4.5 10zm4.5 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
            </svg>
          ) : (
            // Cute Ambient Heart SVG Graphic Profile
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill={el.color}
              style={{
                opacity: 1,
                filter:
                  "drop-shadow(0 0 10px rgba(255,77,109,0.35)) drop-shadow(0 0 16px rgba(255,122,162,0.25))",
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}


// ==========================================
// 2. MICRO SPARKLE EFFECT CARD COMPONENT
// ==========================================
function SparkleEffect({ containerId }) {
  const [sparkles, setSparkles] = useState([]);


  useEffect(() => {
    const symbols = ["✨", "🌸", "⭐", "☁️", "💗"];
    const generated = Array.from({ length: 4 }).map((_, i) => ({
      id: `${containerId}-sparkle-${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      top: `${Math.random() * 80 + 5}%`,
      left: `${Math.random() * 80 + 5}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4,
    }));
    setSparkles(generated);
  }, [containerId]);


  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sp) => (
        <motion.span
          key={sp.id}
          style={{ position: "absolute", top: sp.top, left: sp.left }}
          className="text-sm select-none opacity-40 filter blur-[0.5px]"
          animate={{
            scale: [0, 1.2, 1, 0],
            opacity: [0, 0.5, 0.3, 0],
            y: [0, -15, -30],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut"
          }}
        >
          {sp.symbol}
        </motion.span>
      ))}
    </div>
  );
}


// ==========================================
// 3. SORT DROPDOWN COMPONENT
// ==========================================
function SortDropdown({ currentSort, setCurrentSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "featured", label: "Featured Cozy" },
    { value: "low-high", label: "Price: Low to High" },
    { value: "high-low", label: "Price: High to Low" }
  ];


  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 items-center justify-between gap-2 rounded-full border border-[#6D442C]/15 bg-white px-4 text-xs font-bold tracking-wide text-[#7A6B5C] outline-none transition-all focus:border-[#FF8580]"
      >
        <span>🎀 Sort: {options.find(o => o.value === currentSort)?.label}</span>
        <span className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-[#6D442C]/10 bg-white p-1.5 shadow-lg z-30"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setCurrentSort(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  currentSort === opt.value ? "bg-[#FFEAE8] text-[#FF8580]" : "text-[#7A6B5C] hover:bg-[#FFF9F6]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// ==========================================
// 4. FILTER SIDEBAR COMPONENT
// ==========================================
function FilterSidebar({ selectedCategory, setSelectedCategory, selectedSize, setSelectedSize }) {
  const categories = ["All Collections", "Snugbear Basics", "Moody Collection", "Delulu Diaries"];
  const sizes = ["S", "M", "L", "XL"];


  return (
    <div className="space-y-7 rounded-2xl border border-[#6D442C]/10 bg-white/70 backdrop-blur-xs p-5 shadow-xs">
      <div className="space-y-3">
        <h3 className="font-serif text-sm font-black uppercase tracking-wider text-[#4D3A2A] flex items-center gap-1.5">
          <span>🧸</span> Collections
        </h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedCategory === cat 
                  ? "bg-[#6D442C] text-white translate-x-1" 
                  : "text-[#7A6B5C] hover:bg-[#FFEAE8]/50 hover:text-[#4D3A2A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      <div className="space-y-3 pt-4 border-t border-[#6D442C]/5">
        <h3 className="font-serif text-sm font-black uppercase tracking-wider text-[#4D3A2A] flex items-center gap-1.5">
          <span>📏</span> Size Fit
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
              className={`h-8 w-8 inline-flex items-center justify-center rounded-xl text-xs font-bold border transition-all ${
                selectedSize === size
                  ? "bg-[#6D442C] text-white border-[#6D442C]"
                  : "bg-white text-[#7A6B5C] border-[#6D442C]/15 hover:border-[#FF8580] hover:text-[#FF8580]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>


      <div className="rounded-xl bg-[#FFF0F0] p-3 text-[11px] font-medium text-[#6D442C] leading-normal">
        ✨ <b>Cozy Tip:</b> All collection drops feature an oversized relaxed fit design. Order true to size!
      </div>
    </div>
  );
}


// ==========================================
// 5. COMPACT PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({ product, index, onQuickView }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const discountPercentage = product.mrp > 0 ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;


  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#6D442C]/10 bg-white p-3 shadow-xs hover:shadow-md transition-shadow z-10"
    >
      <div>
        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#7A5A3A] uppercase shadow-xs">
            {product.badge}
          </span>
          {product.isComingSoon ? (
            <span className="inline-flex items-center rounded-full bg-[#FFD1DA] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#6D442C] uppercase shadow-xs">
              Soon ✨
            </span>
          ) : (
            <button className="pointer-events-auto h-7 w-7 flex items-center justify-center rounded-full bg-white/95 shadow-xs text-sm text-[#FFB7B2] hover:text-[#FF8580] hover:scale-110 active:scale-95 transition-all">
              ♥
            </button>
          )}
        </div>


        <SparkleEffect containerId={product.id} />


        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FFF9F6]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>


        <div className="mt-3 px-1">
          <h4 className="text-[11px] font-bold tracking-wider text-[#7A6B5C] uppercase">
            {product.collectionName}
          </h4>
          <h3 className="font-serif text-base font-extrabold text-[#4D3A2A] tracking-tight truncate mt-0.5">
            {product.name}
          </h3>
          
          <div className="mt-1 flex items-baseline gap-2 font-sans">
            {product.isComingSoon ? (
              <span className="text-sm font-bold tracking-wide text-[#FF8580] bg-[#FFF0F0] px-2 py-0.5 rounded-md uppercase">
                Coming Soon
              </span>
            ) : (
              <>
                <span className="text-base font-black text-[#6D442C]">₹{product.price}</span>
                <span className="text-xs font-medium text-[#7A6B5C]/50 line-through">₹{product.mrp}</span>
                {discountPercentage > 0 && (
                  <span className="text-[10px] font-bold text-[#FF8580] bg-[#FFF0F0] px-1.5 py-0.5 rounded-md">
                    SAVE {discountPercentage}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>


      <div className="mt-4 grid grid-cols-2 gap-2">
        <button 
          onClick={() => !product.isComingSoon && onQuickView(product)}
          disabled={product.isComingSoon}
          className={`inline-flex h-9 items-center justify-center rounded-xl bg-[#FFF9F6] border border-[#6D442C]/10 text-[11px] font-bold uppercase tracking-wider text-[#6D442C] transition-all ${
            product.isComingSoon ? "opacity-50 cursor-not-allowed" : "hover:bg-[#6D442C] hover:text-white"
          }`}
        >
          Quick View
        </button>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.isComingSoon}
          className={`inline-flex h-9 items-center justify-center rounded-xl text-[11px] font-bold uppercase tracking-wider text-white shadow-xs transition-all ${
            product.isComingSoon 
              ? "bg-[#6D442C] opacity-40 cursor-not-allowed" 
              : isAdded 
                ? "bg-[#4CAF50] hover:bg-[#4CAF50]" 
                : "bg-[#6D442C] hover:opacity-90 active:scale-98"
          }`}
        >
          {product.isComingSoon ? "Unavailable" : isAdded ? "Added! 🎉" : "Add To Cart"}
        </button>
      </div>
    </motion.div>
  );
}


// ==========================================
// MAIN COLLECTIONS PAGE CONTAINER COMPONENT
// ==========================================
export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentSort, setCurrentSort] = useState("featured");
  const [activePreviewProduct, setActivePreviewProduct] = useState(null);


  const mockProducts = [
    { id: "honey-bear", name: "Honey Bear", collectionName: "Snugbear Basics", badge: "Basics Essential", price: 549, mrp: 799, image: honeyBearImg },
    { id: "rosy-bear", name: "Rosy Bear", collectionName: "Snugbear Basics", badge: "Basics Essential", price: 549, mrp: 799, image: rosyBearImg },
    { id: "creamy-bear", name: "Creamy Bear", collectionName: "Snugbear Basics", badge: "Basics Essential", price: 549, mrp: 799, image: creamyBearImg },
    { id: "daydream-bloom", name: "Daydream Bloom", collectionName: "Moody Collection", badge: "Moody Collection", price: 699, mrp: 999, image: daydreamBloomImg },
    { id: "sleepy-baby", name: "Sleepy Baby", collectionName: "Moody Collection", badge: "Cozy Choice", price: 699, mrp: 999, image: sleepyBabyImg },
    { id: "crybaby-club", name: "Crybaby Club", collectionName: "Moody Collection", badge: "Trending", price: 699, mrp: 999, image: crybabyClubImg },
    { id: "honey-hug", name: "Honey Hug", collectionName: "Moody Collection", badge: "Oversized Fit", price: 699, mrp: 999, image: honeyHugImg },
    { id: "cloudy-nap", name: "Cloudy Nap", collectionName: "Moody Collection", badge: "Limited Drop", price: 699, mrp: 999, image: cloudyNapImg },
    { id: "tiny-tantrum", name: "Tiny Tantrum", collectionName: "Moody Collection", badge: "Classic Drop", price: 699, mrp: 999, image: tinyTantrumImg },
    { id: "solulu-diaries", name: "He Loves Me (Probably)", collectionName: "Delulu Diaries", badge: "Coming Soon", price: 0, mrp: 0, image: deluluImg, isComingSoon: true }
  ];


  // Filtering Logic
  let filteredProducts = mockProducts.filter((p) => {
    return selectedCategory === "All Collections" || p.collectionName === selectedCategory;
  });


  // Sorting Logic
  if (currentSort === "low-high") {
    filteredProducts.sort((a, b) => {
      if (a.isComingSoon) return 1;
      if (b.isComingSoon) return -1;
      return a.price - b.price;
    });
  } else if (currentSort === "high-low") {
    filteredProducts.sort((a, b) => {
      if (a.isComingSoon) return 1;
      if (b.isComingSoon) return -1;
      return b.price - a.price;
    });
  }


  return (
    <div className="relative min-h-screen bg-[#FFFDFB] text-[#4D3A2A] px-4 py-8 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Crawling Background Layer */}
      <BackgroundAnimations />


      <div className="max-w-7xl mx-auto relative z-10 space-y-8 mt-12">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#6D442C]/10 pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#3A2A1D]">
              The Snug Drop Catalog
            </h1>
            <p className="text-sm font-medium text-[#7A6B5C] mt-1">
              Explore your next favorite piece of heavy-knitted cloud aesthetics.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
          </div>
        </div>


        {/* Dynamic Dual Grid Layout Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Side Control Station */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <FilterSidebar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </aside>


          {/* Core Collection Listing Matrix */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 border border-dashed border-[#6D442C]/20 rounded-2xl p-6">
                <span className="text-4xl mb-3">☁️</span>
                <h3 className="font-serif text-lg font-bold text-[#4D3A2A]">No cozy items matched</h3>
                <p className="text-xs text-[#7A6B5C] max-w-xs mt-1">
                  Try swapping your active collections profile filter to discover items.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={idx} 
                    onQuickView={setActivePreviewProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>


      {/* Quick View Interactive Overlay System */}
      <AnimatePresence>
        {activePreviewProduct && (
          <QuickViewModal 
            product={activePreviewProduct} 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            onClose={() => setActivePreviewProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}


// ==========================================
// 6. ISOLATED QUICK VIEW MODAL OVERLAY
// ==========================================
function QuickViewModal({ product, selectedSize, setSelectedSize, onClose }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const sizes = ["S", "M", "L", "XL"];


  const handleModalAddToCart = () => {
    addToCart({ ...product, selectedSize: selectedSize || "M" });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#3A2A1D]/40 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", damping: 26, stiffness: 220 }}
        className="relative bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#6D442C]/10 grid grid-cols-1 md:grid-cols-2 z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-sm border border-[#6D442C]/10 text-[#7A6B5C] hover:text-[#FF8580] transition-colors z-20"
        >
          ✕
        </button>

        <div className="relative aspect-square md:h-full bg-[#FFF9F6] overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#7A5A3A] tracking-wider uppercase">
            {product.badge}
          </span>
        </div>

        <div className="p-6 flex flex-col justify-between space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7A6B5C]">{product.collectionName}</h4>
            <h2 className="font-serif text-2xl font-black text-[#4D3A2A] mt-1">{product.name}</h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#6D442C]">₹{product.price}</span>
              <span className="text-sm font-medium text-[#7A6B5C]/40 line-through">₹{product.mrp}</span>
            </div>
            <p className="text-xs font-medium text-[#7A6B5C] leading-relaxed mt-4">
              Indulge in extra relaxed luxury. This piece serves cozy patterns made with love, ultra-durable comfort seams, and premium textures.
            </p>

            <div className="mt-5 space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#4D3A2A]">Select Fit Size</label>
              <div className="flex gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-8 px-3 rounded-lg text-xs font-bold border transition-all ${
                      selectedSize === sz
                        ? "bg-[#6D442C] text-white border-[#6D442C]"
                        : "bg-white text-[#7A6B5C] border-[#6D442C]/15 hover:border-[#FF8580]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleModalAddToCart}
            className={`w-full h-11 inline-flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all ${
              isAdded ? "bg-[#4CAF50]" : "bg-[#6D442C] hover:opacity-95"
            }`}
          >
            {isAdded ? "Success! 🎉" : "Confirm & Add To Cart"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}