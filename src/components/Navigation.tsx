import { motion } from "motion/react";
import { Tab, TabId } from "../types";
import {
  Home,
  Activity,
  BookOpen,
  Terminal,
  Hammer,
  ScrollText,
  Map as MapIcon,
} from "lucide-react";

interface NavigationProps {
  currentTab: TabId;
  onTabChange: (tabId: TabId) => void;
  tabs: Tab[];
}

const getTabIcon = (id: TabId) => {
  const props = { className: "w-4 h-4 shrink-0 transition-transform duration-300" };
  switch (id) {
    case "home": return <Home {...props} />;
    case "status": return <Activity {...props} />;
    case "wiki": return <BookOpen {...props} />;
    case "commands": return <Terminal {...props} />;
    case "recipes": return <Hammer {...props} />;
    case "lore": return <ScrollText {...props} />;
    case "map": return <MapIcon {...props} />;
    default: return null;
  }
};

export function Navigation({ currentTab, onTabChange, tabs }: NavigationProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            onClick={() => onTabChange("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-10 w-10 items-center justify-center drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] cursor-pointer focus:outline-none rounded-full"
          >
            <img
              src="/logo.png"
              alt="MineCore Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </motion.button>
          <span className="hidden font-logo text-xl md:text-2xl uppercase tracking-[0.1em] text-white lg:block drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] select-none">
            MINE<span className="text-orange-500">CORE</span>
          </span>
        </div>

        <nav className="flex-1 flex justify-end overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 lg:gap-10 pr-2">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`group relative flex items-center gap-2 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap focus-visible:outline-none cursor-pointer ${
                    isActive
                      ? "text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                      : "text-white/40 hover:text-white/90"
                  }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={isActive ? "text-orange-500" : "text-white/30 group-hover:text-white/80 transition-colors"}>
                      {getTabIcon(tab.id)}
                    </span>
                    <span className="hidden md:block">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
