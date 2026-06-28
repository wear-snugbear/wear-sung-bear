import { motion } from "framer-motion";
import PageGlow from "../../components/PageGlow/PageGlow";


export default function LandingPage() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#FEFDE4]">
      <PageGlow />
      
      <motion.img
  src="/images/snugbear.png" // UPDATED PATH
  alt="SnugBear Logo"
  initial={{ opacity: 0, y: 30, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 2.5,
    ease: [0.25, 1, 0.5, 1],
  }}
  className="w-[95%] max-w-[500px] object-contain drop-shadow-md sm:max-w-[650px] md:max-w-[850px]"
/>

    </section>
  );
}