import { motion } from "framer-motion";
import PageGlow from "../../components/PageGlow/PageGlow";

export default function LandingPage() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-[#FEFDE4] overflow-hidden p-6">
      <PageGlow />
      
      <motion.img
        src="/images/snugbear.png"
        alt="SnugBear Logo"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        /* - w-[90vw]: Responsive width for mobile
           - sm:max-w-[400px]: Constrained for small screens
           - md:max-w-[550px]: Tablet size
           - lg:max-w-[700px]: Laptop/Desktop size
           - xl:max-w-[850px]: Large screens
           - h-auto: Preserves aspect ratio automatically
        */
        className="w-[90vw] max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[900px] h-auto object-contain drop-shadow-md"
      />

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-12 sm:mt-16 text-[#6D442C]/40 text-sm sm:text-base font-medium tracking-widest uppercase"
      >
        Scroll to Enter ↓
      </motion.div>
    </section>
  );
}