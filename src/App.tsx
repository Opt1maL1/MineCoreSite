/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Tab, TabId } from "./types";
import { HomeView } from "./views/Home";
import { WikiView } from "./views/Wiki";
import { CommandsView } from "./views/Commands";
import { RecipesView } from "./views/Recipes";
import { LoreView } from "./views/Lore";
import { MapView } from "./views/Map";
import { StatusView } from "./views/Status";

const tabs: Tab[] = [
  { id: "home", label: "Главная" },
  { id: "status", label: "Статус сервера" },
  { id: "wiki", label: "База знаний" },
  { id: "commands", label: "Команды" },
  { id: "recipes", label: "Рецепты" },
  { id: "lore", label: "Лор" },
  { id: "map", label: "Карта" },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>("home");

  return (
    <div className="flex min-h-screen flex-col selection:bg-orange-500/30 selection:text-white relative bg-[#0a0a0a] text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navigation
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          tabs={tabs}
        />

        <main className="flex-1 w-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col w-full"
            >
              <div
                className={`flex-1 flex flex-col w-full ${currentTab !== "home" ? "max-w-7xl mx-auto px-4 pt-8 md:px-12" : ""}`}
              >
                {currentTab === "home" && <HomeView />}
                {currentTab === "status" && <StatusView />}
                {currentTab === "wiki" && <WikiView />}
                {currentTab === "commands" && <CommandsView />}
                {currentTab === "recipes" && <RecipesView />}
                {currentTab === "lore" && <LoreView />}
                {currentTab === "map" && <MapView />}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {currentTab !== "map" && (
          <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg py-8 text-center text-sm text-neutral-500">
            <p>
              © {new Date().getFullYear()} MineCore. Не связано с Mojang AB.
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
