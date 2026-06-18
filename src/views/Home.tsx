import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

function formatPlural(
  number: number,
  one: string,
  two: string,
  five: string,
): string {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function AnimatedNumber({ value }: { value: string | number }) {
  const chars = String(value).split("");
  return (
    <div className="flex justify-center">
      {chars.map((char, i) => (
        <div
          key={chars.length - i}
          className="relative overflow-hidden w-[0.62em] inline-flex justify-center text-center leading-[1.1] h-[1.1em]"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={char}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0, position: "absolute" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block absolute inset-0 text-center w-full"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function HomeView() {
  const [mounted, setMounted] = useState(false);
  const [tinyLights, setTinyLights] = useState<any[]>([]);
  const [blobLights, setBlobLights] = useState<any[]>([]);
  const [elapsed, setElapsed] = useState({
    totalDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
    months: 0,
    days: 0,
  });

  useEffect(() => {
    // Generate lights strictly on client to avoid hydration mismatch
    setTinyLights(
      Array.from({ length: 40 }).map((_, i) => ({
        id: `tiny-${i}`,
        size: Math.random() * 12 + 6,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * -30,
        xArray: [
          0,
          `${(Math.random() - 0.5) * 40}vw`,
          `${(Math.random() - 0.5) * 80}vw`,
          `${(Math.random() - 0.5) * 40}vw`,
          0,
        ],
        yArray: [
          0,
          `${(Math.random() - 0.5) * 40}vh`,
          `${(Math.random() - 0.5) * 80}vh`,
          `${(Math.random() - 0.5) * 40}vh`,
          0,
        ],
      })),
    );

    setBlobLights(
      Array.from({ length: 8 }).map((_, i) => ({
        id: `blob-${i}`,
        size: Math.random() * 600 + 400,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        duration: Math.random() * 40 + 40,
        delay: Math.random() * -80,
        color:
          i % 3 === 0
            ? "bg-orange-600/60"
            : i % 3 === 1
              ? "bg-red-700/60"
              : "bg-yellow-600/50",
        xArray: [
          0,
          `${(Math.random() - 0.5) * 120}vw`,
          `${(Math.random() - 0.5) * 120}vw`,
          `${(Math.random() - 0.5) * 120}vw`,
          0,
        ],
        yArray: [
          0,
          `${(Math.random() - 0.5) * 120}vh`,
          `${(Math.random() - 0.5) * 120}vh`,
          `${(Math.random() - 0.5) * 120}vh`,
          0,
        ],
      })),
    );

    setMounted(true);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2023-12-01T00:00:00+03:00");

    const updateTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - targetDate.getTime());

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      let years = now.getFullYear() - targetDate.getFullYear();
      let months = now.getMonth() - targetDate.getMonth();
      let days = now.getDate() - targetDate.getDate();

      if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setElapsed({ totalDays, hours, minutes, seconds, years, months, days });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Screen Covering Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#080302]">
        {/* CSS Animation for the text gradient */}
        <style>
          {`
            @keyframes gradient-wave {
              0% { background-position: 300% center; }
              100% { background-position: 0% center; }
            }
            .animate-text-wave {
              background-size: 300% auto;
              animation: gradient-wave 6s linear infinite;
            }
          `}
        </style>

        {/* Background Deep Blobs Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {mounted &&
            blobLights.map((light) => (
              <motion.div
                key={light.id}
                className={`absolute rounded-full w-full h-full ${light.color} blur-[120px] mix-blend-screen`}
                style={{
                  width: light.size,
                  height: light.size,
                  left: light.left,
                  top: light.top,
                }}
                animate={{
                  x: light.xArray,
                  y: light.yArray,
                }}
                transition={{
                  duration: light.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: light.delay,
                }}
              />
            ))}
        </div>

        {/* Tiny Running Lights (Fireflies) Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {mounted &&
            tinyLights.map((light) => (
              <motion.div
                key={light.id}
                className="absolute rounded-full bg-orange-100 blur-[4px] shadow-[0_0_40px_10px_rgba(253,164,41,0.8)]"
                style={{
                  width: light.size,
                  height: light.size,
                  left: light.left,
                  top: light.top,
                }}
                animate={{
                  x: light.xArray,
                  y: light.yArray,
                  opacity: [0, 0.6, 1, 0.4, 0],
                  scale: [0.5, 1.2, 0.8, 1, 0.5],
                }}
                transition={{
                  duration: light.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: light.delay,
                }}
              />
            ))}
        </div>

        {/* Frosted Glass Overlay (Blurs everything behind it) */}
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[12px]"></div>
      </div>

      {/* Main Centered Text */}
      <div className="flex flex-col flex-1 items-center justify-center p-4 w-full relative z-20 pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, filter: "blur(30px)", y: 60 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="animate-text-wave font-logo text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 drop-shadow-[0_0_40px_rgba(239,68,68,0.8)] tracking-tighter text-center leading-none"
        >
          MineCore
        </motion.h1>

        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-12 flex flex-col items-center justify-center pointer-events-auto"
          >
            <h2 className="text-sm sm:text-base font-medium text-white/50 mb-6 font-display uppercase tracking-[0.3em]">
              Прошло с момента создания
            </h2>

            <div className="flex items-center gap-4 sm:gap-8 px-8 py-6 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="flex flex-col items-center min-w-[5rem] sm:min-w-[6rem]">
                <div className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-widest tabular-nums leading-none">
                  <AnimatedNumber value={elapsed.totalDays} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-orange-400/80 uppercase tracking-[0.2em] mt-3">
                  Дней
                </span>
              </div>

              <span className="text-3xl sm:text-5xl font-light text-white/20 pb-8">
                :
              </span>

              <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
                <div className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-widest tabular-nums leading-none">
                  <AnimatedNumber
                    value={elapsed.hours.toString().padStart(2, "0")}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-orange-400/80 uppercase tracking-[0.2em] mt-3">
                  Часов
                </span>
              </div>

              <span className="text-3xl sm:text-5xl font-light text-white/20 pb-8">
                :
              </span>

              <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
                <div className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-widest tabular-nums leading-none">
                  <AnimatedNumber
                    value={elapsed.minutes.toString().padStart(2, "0")}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-orange-400/80 uppercase tracking-[0.2em] mt-3">
                  Минут
                </span>
              </div>

              <span className="text-3xl sm:text-5xl font-light text-white/20 pb-8">
                :
              </span>

              <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
                <div className="text-4xl sm:text-6xl font-mono font-bold text-orange-500 tracking-widest tabular-nums leading-none drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">
                  <AnimatedNumber
                    value={elapsed.seconds.toString().padStart(2, "0")}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-orange-400/80 uppercase tracking-[0.2em] mt-3">
                  Сек
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-10">
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-semibold">
                  Дата создания:
                </span>
                <span className="text-sm sm:text-base font-mono font-medium text-white">
                  01.12.2023
                </span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-4 sm:px-6 py-3 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-semibold">
                  Возраст:
                </span>
                <span className="text-sm sm:text-base text-neutral-300 font-medium">
                  <span className="font-mono text-orange-400">
                    {elapsed.years}
                  </span>{" "}
                  {formatPlural(elapsed.years, "год", "года", "лет")}{" "}
                  <span className="font-mono text-orange-400 ml-1">
                    {elapsed.months}
                  </span>{" "}
                  {formatPlural(elapsed.months, "месяц", "месяца", "месяцев")}{" "}
                  <span className="font-mono text-orange-400 ml-1">
                    {elapsed.days}
                  </span>{" "}
                  {formatPlural(elapsed.days, "день", "дня", "дней")}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
