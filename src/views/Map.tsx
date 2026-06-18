import { motion } from "motion/react";
import { Map, ExternalLink } from "lucide-react";

export function MapView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-7xl mx-auto pb-4 pt-4"
    >
      <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl">
        <iframe
          src="https://bluemapzzzz.dynmap.xyz/"
          className="w-full h-full border-0 absolute inset-0 z-0"
          title="Server Map"
        />
      </div>
    </motion.div>
  );
}
