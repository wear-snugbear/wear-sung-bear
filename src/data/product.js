// 🐻 REAL IMAGE ASSETS IMPORTED FOR CENTRAL DATA LAYER
import basicsImg from "../assets/images/basics.png";
import cloudyNapImg from "../assets/images/cloudy_nap.png";
import creamyBearImg from "../assets/images/creamy_beary.png";
import crybabyClubImg from "../assets/images/crybaby_club.png";
import daydreamBloomImg from "../assets/images/daydream_bloom.png";
import deluluImg from "../assets/images/delulu.png";
import honeyBearImg from "../assets/images/Honey_bear.png";
import honeyHugImg from "../assets/images/Honey_Hug.png";
import rosyBearImg from "../assets/images/rosy_bear.png";
import sleepyBabyImg from "../assets/images/sleepy_baby.png";
import tinyTantrumImg from "../assets/images/tiny_tantrum.png";

const products = [
  {
    id: "honey-bear",
    name: "Honey Bear",
    collectionName: "Snugbear Basics",
    badge: "Basics Essential",
    price: 549,
    mrp: 799,
    image: honeyBearImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "Indulge in extra relaxed luxury. This piece features classic cozy patterns made with love, ultra-durable comfort seams, and premium heavy-knit cloud textures."
  },
  {
    id: "rosy-bear",
    name: "Rosy Bear",
    collectionName: "Snugbear Basics",
    badge: "Basics Essential",
    price: 549,
    mrp: 799,
    image: rosyBearImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "A soft, blush-toned oversized fit designed for maximum comfort. Perfect for lounge hours or casual aesthetic layers."
  },
  {
    id: "creamy-bear",
    name: "Creamy Bear",
    collectionName: "Snugbear Basics",
    badge: "Basics Essential",
    price: 549,
    mrp: 799,
    image: creamyBearImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "An essential off-white, milky cloud layer offering premium dropped-shoulder relaxation cuts."
  },
  {
    id: "daydream-bloom",
    name: "Daydream Bloom",
    collectionName: "Moody Collection",
    badge: "Moody Collection",
    price: 699,
    mrp: 999,
    image: daydreamBloomImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "Vibrant custom aesthetics meet heavy premium blends. Expressive styles for moody winter dreamscapes."
  },
  {
    id: "sleepy-baby",
    name: "Sleepy Baby",
    collectionName: "Moody Collection",
    badge: "Cozy Choice",
    price: 699,
    mrp: 999,
    image: sleepyBabyImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "Tailored with loose premium loops to keep you floating all day. Snug, secure, and infinitely lazy."
  },
  {
    id: "crybaby-club",
    name: "Crybaby Club",
    collectionName: "Moody Collection",
    badge: "Trending",
    price: 699,
    mrp: 999,
    image: crybabyClubImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "Join the cozy collective. Features bold, statement-making graphic alignments with premium structural ribbing."
  },
  {
    id: "honey-hug",
    name: "Honey Hug",
    collectionName: "Moody Collection",
    badge: "Oversized Fit",
    price: 699,
    mrp: 999,
    image: honeyHugImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "Literally feels like a big warm hug. Packed with cloud insulation textures and structured drop-lining headers."
  },
  {
    id: "cloudy-nap",
    name: "Cloudy Nap",
    collectionName: "Moody Collection",
    badge: "Limited Drop",
    price: 699,
    mrp: 999,
    image: cloudyNapImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "An exclusive heavy drop featuring high density, low-sheen loops optimized for complete daytime hibernation."
  },
  {
    id: "tiny-tantrum",
    name: "Tiny Tantrum",
    collectionName: "Moody Collection",
    badge: "Classic Drop",
    price: 699,
    mrp: 999,
    image: tinyTantrumImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: false,
    description: "A compact expression of modern oversized streetwear cut directly out of premium pastel threads."
  },
  {
    id: "solulu-diaries",
    name: "He Loves Me (Probably)",
    collectionName: "Delulu Diaries",
    badge: "Coming Soon",
    price: 0,
    mrp: 0,
    image: deluluImg,
    sizes: ["S", "M", "L", "XL"],
    isComingSoon: true,
    description: "Are we daydreaming? Maybe. Our most anticipated coming-soon drop featuring playful cloud silhouettes."
  }
];

export default products;