import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";

const STATUES = [
  {
    id: 2023,
    img: "/2023.webp",
    title: "Эпоха 2023",
    desc: "Первый скриншот, самое начало.",
    bounds: { top: "28%", left: "9%", width: "35%", height: "25%" },
  },
  {
    id: 2024,
    img: "/2024.webp",
    title: "Эпоха 2024",
    desc: "Полное развитие, самое лучшее веремя, первые появления японского стиля.",
    bounds: { top: "60%", left: "47%", width: "35%", height: "26%" },
  },
  {
    id: 2025,
    img: "/2025.webp",
    title: "Эпоха 2025",
    desc: "Посторойка подземной системы, куча автоферм, новые города.",
    bounds: { top: "35%", left: "43%", width: "34%", height: "25%" },
  },
];

const VETERAN_MEDALS = [
  { img: "/vt1.png", name: "Lord_KapR1za792" },
  { img: "/vt2.png", name: "Art3x3" },
  { img: "/vt3.png", name: "Genes1s" },
  { img: "/vt4.png", name: "Haterz14" },
];

export function LoreView() {
  const [activeTab, setActiveTab] = useState<"history" | "full">("history");
  const [selectedStatue, setSelectedStatue] = useState<number | null>(null);
  const [hoveredStatue, setHoveredStatue] = useState<number | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate cursor position relative to the container
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Prevent the popup from flying outside the container limits
    const popupWidth = 320;
    const popupHeight = 240;

    if (x + popupWidth + 20 > rect.width) x = rect.width - popupWidth - 20;
    if (y + popupHeight + 20 > rect.height) y = rect.height - popupHeight - 20;

    setMousePos({ x, y });
  };

  const selectedData = STATUES.find((s) => s.id === selectedStatue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-6xl pb-24 pt-8 px-4 flex flex-col gap-12"
    >
      <div className="flex justify-center">
        <div className="flex bg-white/5 border border-white/10 rounded-full p-1.5 gap-2 backdrop-blur-md shadow-2xl">
          <button
            onClick={() => {
              setActiveTab("history");
              setSelectedStatue(null);
            }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === "history"
                ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            История
          </button>
          <button
            onClick={() => {
              setActiveTab("full");
              setSelectedStatue(null);
            }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === "full"
                ? "bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Полный лор
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "full" ? (
          <motion.div
            key="full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-col gap-1">
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-75" />
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-300" />
            </div>
            <p className="text-neutral-500 uppercase tracking-widest text-sm font-bold">
              В разработке...
            </p>
          </motion.div>
        ) : !selectedStatue ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-24"
          >
            <div
              ref={containerRef}
              className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group bg-black cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredStatue(null)}
            >
              {/* Image 2 + Hotspots container (revealed on hover) */}
              <div className="absolute inset-0 z-10 w-full h-full transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                <img
                  src="/world2.jpg"
                  alt="World Future"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Hotspots */}
                <div className="absolute inset-0">
                  {STATUES.map((statue) => (
                    <div
                      key={statue.id}
                      className="absolute cursor-crosshair border border-black/50"
                      style={{
                        top: statue.bounds.top,
                        left: statue.bounds.left,
                        width: statue.bounds.width,
                        height: statue.bounds.height,
                      }}
                      onMouseEnter={() => setHoveredStatue(statue.id)}
                      onClick={() => setSelectedStatue(statue.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Image 1 (default) */}
              <img
                src="/world1.jpg"
                alt="World Past"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 opacity-100 group-hover:scale-[1.5] group-hover:opacity-0 pointer-events-none z-0"
              />

              {/* Mini popup on hover */}
              <AnimatePresence>
                {hoveredStatue && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute z-20 pointer-events-none rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black/80 backdrop-blur-xl"
                    style={{
                      left: mousePos.x + 20,
                      top: mousePos.y + 20,
                      width: 320,
                    }}
                  >
                    <img
                      src={STATUES.find((s) => s.id === hoveredStatue)?.img}
                      className="w-full aspect-video object-cover"
                      alt={`Preview ${hoveredStatue}`}
                    />
                    <div className="p-4 text-left border-t border-white/10 bg-black/60">
                      <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-1">
                        {hoveredStatue} Год
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        {STATUES.find((s) => s.id === hoveredStatue)?.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-6 tracking-tighter">
                Медали ветерана
              </h2>
              <div className="w-12 h-1 bg-orange-500 rounded-full mb-12" />
              <p className="text-neutral-400 text-center uppercase tracking-widest text-sm mb-16 max-w-2xl">
                Награды за долгое нахождение игроков на сервере, их преданность и огромный вклад в развитие проекта
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl mx-auto">
                {VETERAN_MEDALS.map((medal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col items-center gap-6 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 md:p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-700 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md overflow-hidden hover:bg-white/5"
                  >
                    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center p-4 rounded-full overflow-hidden">
                      <div className="absolute inset-0 rounded-full bg-black/40 border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
                      
                      {/* Straight running glare strip */}
                      <motion.div
                        animate={{ left: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] z-20 pointer-events-none"
                      />
                      
                      <img
                        src={medal.img}
                        alt={medal.name}
                        className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                      />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                      <span className="text-white/70 font-bold tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm uppercase text-center group-hover:text-white transition-colors duration-500 drop-shadow-md truncate w-full">
                        {medal.name}
                      </span>
                      <div className="h-[1px] w-6 bg-white/20 group-hover:w-16 group-hover:bg-white/60 transition-all duration-700 ease-[0.22,1,0.36,1]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 items-center"
          >
            <button
              onClick={() => setSelectedStatue(null)}
              className="self-start flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white uppercase tracking-widest text-xs sm:text-sm font-bold"
            >
              <ArrowLeft size={16} /> Назад к статуям
            </button>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] aspect-square"
              >
                <img
                  src={selectedData?.img}
                  alt={selectedData?.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-6"
              >
                <h2 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tighter">
                  {selectedData?.title}
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full" />
                <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-light">
                  {selectedData?.desc}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
