import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface Addon {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  details: {
    info: string;
    images: string[];
  };
}

const ADDONS_LIST: Addon[] = [
  {
    id: "villager-in-a-bucket",
    title: "Villager In A Bucket",
    description:
      "Поднимите жителя деревни с пустым ведром - позволяет переносить жителей в ведре",
    thumbnail: "/Villager.png",
    details: {
      info: "Удобный плагин (дополнение), который позволяет очень легко переносить жителей деревни (даже тех, у которых есть профессия и торги). Просто кликните правой кнопкой мыши пустым ведром по жителю. Чтобы выпустить жителя, кликните ведром с жителем по блоку.",
      images: ["/Q5UH3SS.gif", "/DXQ9WvW.gif", "/Ke12GSZ.gif"],
    },
  },
  {
    id: "hat-command",
    title: "Hat Command",
    description: "Позволяет игрокам носить блоки на голове",
    thumbnail: "/HatCommand.png",
    details: {
      info: "Как использовать?\n1) Возьмите в руку блок, который хотите надеть.\n2) Введите команду /hat.",
      images: ["/photo_2026-06-17_20-37-45.jpg"],
    },
  },
];

export function WikiView() {
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-4xl pb-24 pt-8 text-neutral-300"
    >
      <header className="mb-10 flex flex-col pt-4">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          База знаний
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          Всё самое важное о работе сервера MineCore, его настройках и
          дополнениях.
        </p>
      </header>

      <div className="w-full">
        <AnimatePresence mode="wait">
          {!selectedAddon && (
            <motion.div
              key="tab-addons-list"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 grid-cols-1 md:grid-cols-2"
            >
              {ADDONS_LIST.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => setSelectedAddon(addon)}
                  className="flex flex-col text-left rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-colors hover:border-orange-500/20 group"
                >
                  <div className="w-full h-48 bg-black/40 overflow-hidden">
                    <img
                      src={addon.thumbnail}
                      alt={addon.title}
                      className="w-full h-full object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ imageRendering: "pixelated" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/600x400/1a1a1a/ff6600?text=" +
                          encodeURIComponent(addon.title);
                      }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {addon.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                      {addon.description}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {selectedAddon && (
            <motion.div
              key={`tab-addons-detail-${selectedAddon.id}`}
              initial={{ opacity: 0, y: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
            >
              {/* Back Button & Header */}
              <div className="p-6 border-b border-white/5">
                <button
                  onClick={() => setSelectedAddon(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Назад к списку
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={selectedAddon.thumbnail}
                      alt={selectedAddon.title}
                      className="w-full h-full object-contain p-2"
                      style={{ imageRendering: "pixelated" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/200x200/1a1a1a/ff6600?text=Icon";
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">
                      {selectedAddon.title}
                    </h2>
                    <p className="text-neutral-400 leading-relaxed max-w-2xl">
                      {selectedAddon.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 md:p-8 flex flex-col gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Основная информация
                  </h3>
                  <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {selectedAddon.details.info}
                  </p>
                </div>

                {selectedAddon.details.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Демонстрация
                    </h3>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                      {selectedAddon.details.images.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl overflow-hidden border border-white/10 bg-black/40 skeleton-bg"
                        >
                          <img
                            src={imgSrc}
                            alt={`Demonstration ${idx + 1}`}
                            className="w-full object-cover h-auto"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
