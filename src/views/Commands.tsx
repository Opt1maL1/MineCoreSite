import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function CommandsView() {
  const commands = [
    { cmd: "/menu", desc: "открывает меню сервера" },
    { cmd: "/tpa", desc: "телепортирует к игроку" },
    { cmd: "/hat", desc: "позволяет надевать предмет на голову" },
    { cmd: "/storage", desc: "открывает общее хранилище сервера" },
    { cmd: "/sit", desc: "позволяет садиться на любой блок" },
    {
      cmd: "/blockstats my, top, server",
      desc: "показывает статистику блоков",
    },
    { cmd: "/skin", desc: "настройки скинов" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-5xl pb-16 pt-8"
    >
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)]">
          <Terminal size={32} />
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Команды сервера
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          Список полезных команд для комфортной игры на сервере MineCore.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {commands.map((c, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1 + idx * 0.05,
            }}
            key={idx}
            className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors hover:border-orange-500/20"
          >
            <div>
              <code className="inline-block px-3 py-1.5 rounded-lg bg-black/60 font-mono text-orange-400 border border-orange-500/20 text-sm font-medium shadow-inner tracking-wide">
                {c.cmd}
              </code>
            </div>
            <div className="text-sm text-neutral-300 leading-relaxed mt-1">
              {c.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
