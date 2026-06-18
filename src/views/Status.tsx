import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Users, Server, Clock, Wifi } from "lucide-react";

interface Player {
  name: string;
  uuid: string;
}

interface ServerData {
  online: boolean;
  ip: string;
  port: number;
  hostname?: string;
  version?: string;
  players?: {
    online: number;
    max: number;
    list?: Player[];
  };
  motd?: {
    clean: string[];
    html: string[];
  };
  icon?: string;
  software?: string;
  protocol?: {
    version: number;
    name: string;
  };
}

export function StatusView() {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the IP and port provided by the user for the most reliable connection
  const serverAddress = "minecore.vanilla.house";

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.mcsrvstat.us/3/${serverAddress}`,
        );

        if (!response.ok) {
          throw new Error("Не удалось получить данные от сервера");
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error("Error fetching server status:", err);
        setError("Не удалось загрузить статус сервера. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Refresh every 60 seconds
    const intervalId = setInterval(fetchStatus, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-4xl pb-24 pt-8 text-neutral-300"
    >
      <header className="mb-12 flex flex-col items-center justify-center text-center pt-8 max-w-[902px] mx-auto w-full">
        <h1
          className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-widest bg-black no-underline inline-block px-4 py-2 rounded-lg"
          style={{ fontFamily: "Verdana, sans-serif" }}
        >
          Статус
        </h1>
      </header>

      {loading && !data ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-neutral-400">Получение данных...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
          <p>{error}</p>
        </div>
      ) : data ? (
        <div className="flex flex-col gap-6">
          {/* Main Status Card */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-6">
                {/* Server Icon */}
                <div className="w-20 h-20 bg-black/40 rounded-xl flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                  {data.icon ? (
                    <img
                      src={data.icon}
                      alt="Server Icon"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: "pixelated" }}
                    />
                  ) : (
                    <Server size={32} className="text-neutral-500" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">MineCore</h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${data.online ? "bg-green-500/20 text-green-400 border border-green-500/20" : "bg-red-500/20 text-red-400 border border-red-500/20"}`}
                    >
                      {data.online ? "Онлайн" : "Оффлайн"}
                    </span>
                  </div>

                  {data.motd?.clean && (
                    <div className="text-neutral-400 font-mono text-sm leading-relaxed whitespace-pre-wrap max-w-xl">
                      {data.motd.clean.join("\n")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center gap-6">
                  <span className="text-neutral-500 text-sm">IP Адрес</span>
                  <span className="font-mono text-orange-400 font-medium select-all">
                    minecore.vanilla.house
                  </span>
                </div>
                <div className="flex justify-between items-center gap-6">
                  <span className="text-neutral-500 text-sm">Версия</span>
                  <span className="text-neutral-200">
                    {data.version || "Неизвестно"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Software Core */}
            {data.software && (
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {data.software.toLowerCase() === "purpur" ? (
                  <img
                    src="/purpur.png"
                    alt="Purpur"
                    className="w-32 h-32 mb-6 drop-shadow-2xl brightness-110 relative z-10 transition-transform duration-500 group-hover:scale-105"
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <div className="w-32 h-32 mb-6 flex items-center justify-center bg-black/40 rounded-full border border-white/10 relative z-10">
                    <Server size={48} className="text-neutral-500" />
                  </div>
                )}
                <div className="relative z-10">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-2">
                    Ядро сервера
                  </p>
                  <h3 className="text-4xl font-display font-bold text-white">
                    {data.software}
                  </h3>
                  {data.protocol?.name && (
                    <p className="text-neutral-400 mt-3 bg-black/40 px-3 py-1 rounded-full text-sm inline-flex items-center border border-white/5">
                      Протокол: {data.protocol.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div
              className={`flex flex-col gap-6 ${data.software ? "lg:col-span-2" : "lg:col-span-3"}`}
            >
              {/* Connection Info */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Wifi className="text-orange-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">
                    Как подключиться
                  </h3>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
                      Стандартный IP
                    </h4>
                    <div className="flex items-center gap-3 w-full">
                      <code className="flex-1 bg-black/40 px-4 py-3 rounded-xl border border-white/5 font-mono text-white select-all">
                        minecore.vanilla.house
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Players Widget */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Users className="text-orange-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Игроки</h3>
                  {data.online && data.players && (
                    <span className="ml-auto text-neutral-400 font-medium bg-white/5 px-3 py-1 rounded-full text-sm">
                      {data.players.online} / {data.players.max}
                    </span>
                  )}
                </div>

                {!data.online ? (
                  <p className="text-neutral-500 text-center py-4">
                    Сервер оффлайн
                  </p>
                ) : data.players?.list && data.players.list.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.players.list.map((player, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5"
                      >
                        <img
                          src={`https://mc-heads.net/avatar/${player.name}/32`}
                          alt={player.name}
                          className="w-8 h-8 rounded bg-black/40"
                          style={{ imageRendering: "pixelated" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://minotar.net/helm/${player.name}/32.png`;
                          }}
                        />
                        <span className="font-medium text-neutral-200 truncate">
                          {player.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center text-neutral-500">
                    <p>В данный момент на сервере нет игроков.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
