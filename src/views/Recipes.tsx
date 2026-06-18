import { motion } from "motion/react";
import { PackageOpen } from "lucide-react";

export function RecipesView() {
  const recipes = [
    {
      name: "Сундук Хранилища",
      desc: "Позволяет получить доступ к общему раздельному инвентарю /storage в любой точке мира.",
      image: "/craft1.png",
      ingredients: ["Сундук x9"],
      result: "Сундук Хранилища x1",
    },
    {
      name: "Личное хранилище",
      desc: "Сундук для открытия личного хранилища.",
      image: "/craft2.png",
      ingredients: ["Сундук x8", "Звезда Незера x1"],
      result: "Личное хранилище x1",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-5xl pb-16"
    >
      <header className="mb-16 mt-8 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 rotate-3 ring-1 ring-orange-500/30 shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]">
          <PackageOpen size={32} className="-rotate-3" />
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Кастомные рецепты
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          Специальные крафты, добавленные на наш сервер для расширения геймплея.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {recipes.map((recipe, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1 + idx * 0.1,
            }}
            key={idx}
            className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#160a04] p-6 sm:p-8 shadow-xl relative overflow-hidden"
          >
            <div className="w-full">
              <h3 className="mb-2 font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-white">
                {recipe.name}
              </h3>
              <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                {recipe.desc}
              </p>

              {recipe.ingredients && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-black/40 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider border border-white/5">
                    Ингредиенты:
                  </span>
                  {recipe.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-white/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              )}

              <div className="inline-flex items-center gap-3 rounded-xl bg-black/40 px-4 py-3 border border-white/5 w-fit">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Результат:
                </span>
                <span className="text-sm font-bold text-brand-400">
                  {recipe.result}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mt-2 overflow-hidden rounded-2xl w-full">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="max-w-full h-auto object-contain rounded-2xl drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-transform hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
