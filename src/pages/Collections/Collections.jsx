import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 🛒 Shared cart hook
import { useWishlist } from "../../context/WishlistContext";

// ==========================================
// 1. COMBINED GLOBAL BACKGROUND ANIMATION LAYER
// ==========================================
function BackgroundAnimations() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const heartColors = ["#FF4D6D", "#FF7AA2", "#FF9BCB", "#FFB3C6"];

    const generatedElements = Array.from({ length: 20 }).map((_, i) => {
      const isBear = i % 4 === 0;
      return {
        id: `bg-art-${i}`,
        type: isBear ? "bear" : "heart",
        left: `${Math.random() * 90 + 5}%`,
        scale: isBear
          ? Math.random() * 0.35 + 0.4
          : Math.random() * 0.6 + 0.9, // hearts slightly bigger
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 12,
        opacity: isBear
          ? Math.random() * 0.06 + 0.04
          : Math.random() * 0.35 + 0.3, // more visible hearts
        color: heartColors[i % heartColors.length],
      };
    });
    setElements(generatedElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient wash to make background feel premium */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#FFE5EC_0,_#FFFBF9_35%,_#FFF7F0_70%,_#FFEAF4_100%)] opacity-80" />

      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-10%]"
          style={{ left: el.left }}
          initial={{ y: 0, x: 0, opacity: 0, scale: el.scale }}
          animate={{
            y: "-120vh",
            x: [0, 24, -24, 18, -18, 0],
            opacity: [0, el.opacity, el.opacity, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.type === "bear" ? (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#6D442C"
              style={{
                opacity: 0.8,
                filter: "drop-shadow(0 6px 10px rgba(109,68,44,0.18))",
              }}
            >
              <path d="M4.5 10c0-1.38 1.12-2.5 2.5-2.5.38 0 .74.09 1.06.24C8.6 6.64 9.73 6 11 6s2.4.64 2.94 1.74c.32-.15.68-.24 1.06-.24 1.38 0 2.5 1.12 2.5 2.5 0 .9-.48 1.69-1.19 2.13.12.44.19.9.19 1.37 0 3.04-2.46 5.5-5.5 5.5S5.5 16.54 5.5 13.5c0-.47.07-.93.19-1.37C4.98 11.69 4.5 10.9 4.5 10zm4.5 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
            </svg>
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill={el.color}
              style={{
                opacity: 0.98,
                filter:
                  "drop-shadow(0 0 10px rgba(255,109,141,0.45)) drop-shadow(0 0 18px rgba(255,155,203,0.35))",
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
            ease: "easeInOut",
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
    { value: "high-low", label: "Price: High to Low" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 items-center justify-between gap-2 rounded-full border border-[#6D442C]/15 bg-white/90 px-4 text-[11px] font-bold tracking-wide text-[#7A6B5C] shadow-sm hover:shadow-md outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#FFB3C6]"
      >
        <span>🎀 Sort: {options.find((o) => o.value === currentSort)?.label}</span>
        <span
          className={`text-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-[#6D442C]/10 bg-white/95 p-1.5 shadow-lg z-30"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setCurrentSort(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[11px] font-semibold rounded-lg transition-colors ${
                  currentSort === opt.value
                    ? "bg-[#FFE5EC] text-[#FF4D6D]"
                    : "text-[#7A6B5C] hover:bg-[#FFF7F2]"
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
function FilterSidebar({ selectedCategory, setSelectedCategory }) {
  const categories = ["All Collections", "Snugbear Basics", "Moody Collection", "Delulu Diaries"];

  return (
    <div className="space-y-7 rounded-2xl border border-[#6D442C]/10 bg-white/80 backdrop-blur-md p-5 shadow-[0_18px_40px_rgba(111,63,34,0.08)]">
      <div className="space-y-3">
        <h3 className="font-serif text-sm font-black uppercase tracking-[0.18em] text-[#4D3A2A] flex items-center gap-1.5">
          <span>🧸</span> Collections
        </h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedCategory === cat
                  ? "bg-[#6D442C] text-white translate-x-1 shadow-sm"
                  : "text-[#7A6B5C] hover:bg-[#FFE5EC] hover:text-[#4D3A2A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#FFF0F5] border border-[#FFB3C6]/40 p-3 text-[11px] font-medium text-[#6D442C] leading-normal shadow-xs">
        ✨ <b>Cozy Tip:</b> All collection drops feature an oversized relaxed fit design. Order true to size!
      </div>
    </div>
  );
}
// ==========================================
// 5. ENHANCED PRODUCT CARD COMPONENT (UPDATED)
// ==========================================
function ProductCard({ product, index, onQuickView }) {
  const { addToCart } = useCart();
  const [selectedCardSize, setSelectedCardSize] = useState("M");
  const [isAdded, setIsAdded] = useState(false);
  const { wishlist, toggleWishlist } = useWishlist();

  // Ensure consistent ID comparison
  const isLiked = wishlist?.some((item) => String(item.id) === String(product.id));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.isComingSoon) return;
    addToCart(product, selectedCardSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#6D442C]/10 bg-white/95 p-3 shadow-[0_14px_30px_rgba(77,58,42,0.08)] hover:shadow-[0_18px_40px_rgba(77,58,42,0.12)] transition-shadow"
    >
      {/* 
        HEART BUTTON LAYER 
        Placed outside the main content flow to ensure it captures clicks first.
      */}
      {/* HEART BUTTON LAYER */}
{/* HEART BUTTON LAYER */}
{!product.isComingSoon && (
  <div className="absolute top-4 right-4 z-[100]">
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); 
        toggleWishlist(product);
      }}
      className={`h-10 w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300 border border-[#6D442C]/10 active:scale-90 touch-none ${
        isLiked ? "text-[#FF4D6D]" : "text-[#FFB7B2]"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="text-xl leading-none select-none pointer-events-none">
        {isLiked ? "♥" : "♡"}
      </span>
    </button>
  </div>
)}

      {/* Main Card Content */}
      <div className="relative">
        {/* Badge Layer */}
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#7A5A3A] uppercase shadow-xs">
            {product.badge}
          </span>
        </div>

        <SparkleEffect containerId={product.id} />

        {/* CLICKABLE IMAGE WRAPPER */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FFF9F6] cursor-pointer"
          onClick={() => !product.isComingSoon && onQuickView(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {!product.isComingSoon && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
              <span className="bg-white/95 text-[#4D3A2A] text-xs font-bold px-3 py-2 rounded-xl shadow-sm">
                Quick View 👀
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 px-1">
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#A08A76] uppercase">
            {product.collectionName}
          </h4>
          <h3 className="font-serif text-base font-extrabold text-[#4D3A2A] tracking-tight mt-0.5 line-clamp-1">
            {product.name}
          </h3>

          <div className="mt-1 flex items-baseline gap-2 font-sans">
            {product.isComingSoon ? (
              <span className="text-sm font-bold tracking-wide text-[#FF4D6D] bg-[#FFE5EC] px-2 py-0.5 rounded-md uppercase">
                Coming Soon
              </span>
            ) : (
              <>
                <span className="text-base font-black text-[#6D442C]">₹{product.price}</span>
                <span className="text-xs font-medium text-[#7A6B5C]/50 line-through">
                  ₹{product.mrp}
                </span>
              </>
            )}
          </div>

          {!product.isComingSoon && (
            <div className="mt-3 space-y-1.5">
              <span className="text-[10px] font-bold text-[#7A6B5C]/70 block">Select Size:</span>
              <div className="flex gap-1">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCardSize(sz);
                    }}
                    className={`h-6 w-7 text-[10px] font-black rounded-md border transition-all ${
                      selectedCardSize === sz
                        ? "bg-[#6D442C] text-white border-[#6D442C]"
                        : "bg-white text-[#7A6B5C] border-[#6D442C]/10 hover:border-[#FF4D6D]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-xl py-2 text-xs font-bold tracking-wide transition-all duration-300 ${
            isAdded
              ? "bg-[#E2F7ED] text-[#1FA66A]"
              : "bg-[#6D442C] text-white hover:bg-[#4D3A2A] active:scale-[0.98]"
          }`}
        >
          {isAdded ? `Added ${selectedCardSize}! 🎀` : "Quick Add 🧸"}
        </button>
      </div>
    </motion.div>
  );
}
// ==========================================
// 6. QUICK VIEW OVERLAY MODAL SYSTEM
// ==========================================
function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [modalSize, setModalSize] = useState("M");
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleModalAdd = () => {
    addToCart(product, modalSize);
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
        className="absolute inset-0 bg-[#2B1C13]/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_24px_60px_rgba(43,28,19,0.35)] relative z-10 grid grid-cols-1 md:grid-cols-2 border border-[#6D442C]/12"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#FFF9F6] border border-[#6D442C]/10 text-sm font-bold text-[#7A6B5C] hover:text-[#FF4D6D] z-20 flex items-center justify-center shadow-xs"
        >
          ✕
        </button>

        <div className="bg-[#FFF9F6] p-6 flex items-center justify-center aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[300px] object-contain rounded-2xl"
          />
        </div>

        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D6D] bg-[#FFE5EC] px-2 py-0.5 rounded-md inline-block">
              {product.collectionName}
            </span>
            <h2 className="font-serif text-xl font-black text-[#4D3A2A] mt-1.5">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-black text-[#6D442C]">₹{product.price}</span>
              <span className="text-xs text-[#7A6B5C]/50 line-through">₹{product.mrp}</span>
            </div>
            <p className="text-xs text-[#7A6B5C] leading-relaxed mt-3">{product.description}</p>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-[#4D3A2A] block mb-1.5">
                Selected Variant Size:
              </span>
              <div className="flex gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setModalSize(sz)}
                    className={`h-8 w-9 rounded-xl text-xs font-bold border transition-all ${
                      modalSize === sz
                        ? "bg-[#6D442C] text-white border-[#6D442C]"
                        : "bg-white text-[#7A6B5C] border-[#6D442C]/15 hover:border-[#FF4D6D]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleModalAdd}
              className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors ${
                isAdded
                  ? "bg-[#E2F7ED] text-[#1FA66A]"
                  : "bg-[#6D442C] text-white hover:bg-[#4D3A2A]"
              }`}
            >
              {isAdded ? "Added to your Snuggle List! 🎀" : "Add Selected Size to Cart 🧸"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 7. MAIN COLLECTIONS WRAPPER COMPONENT
// ==========================================
export default function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState("featured");
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [searchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") || "All Collections";
  const [selectedCategory, setSelectedCategory] = useState(filterFromUrl);

  // CORRECTED: Single useEffect to fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use the Render backend URL
        const API_URL = "https://snugbear-backend.onrender.com/api/products";
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Only runs once on mount

  const filteredProducts = products
    .filter((product) => {
      return (
        selectedCategory === "All Collections" ||
        product.collectionName === selectedCategory
      );
    })
    .sort((a, b) => {
      if (currentSort === "low-high") return a.price - b.price;
      if (currentSort === "high-low") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF9] text-[#4D3A2A]">
        <div className="mb-2 text-2xl">🧺</div>
        <p className="text-sm font-medium tracking-wide">
          Loading Cozy Items... please hold your snuggles ✨
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FFFBF9] px-4 py-12 md:px-8 z-10 overflow-hidden">
      <BackgroundAnimations />

      <div className="relative max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-[#6D442C]/8 pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#3A2A1D]">
                {selectedCategory}
              </h2>
              <p className="text-[11px] font-medium text-[#7A6B5C] mt-1">
                Showing {filteredProducts.length} cozy result
                {filteredProducts.length === 1 ? "" : "s"}
              </p>
            </div>
            <SortDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={(p) => setActiveQuickView(p)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeQuickView && (
          <QuickViewModal
            product={activeQuickView}
            onClose={() => setActiveQuickView(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}