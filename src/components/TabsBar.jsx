import { useEffect, useState } from "react";
import History from "./TabsMenu/History";
import Compare from "./TabsMenu/Compare";
import Favorites from "./TabsMenu/Favorites";
import Log from "./TabsMenu/Log";

function TabsBar({
  from,
  to,
  setFrom,
  setTo,
  favorites,
  setFavorites,
  conversionLog,
  setConversionLog,
  presetCurrencies,
}) {
  const [activeTab, setActiveTab] = useState("History");

  const tabs = [
    {
      id: "History",
      label: "History",
      component: <History from={from} to={to} />,
    },
    {
      id: "Compare",
      label: "Compare",
      component: (
        <Compare
          favorites={favorites}
          setFrom={setFrom}
          setTo={setTo}
          to={to}
          from={from}
          presetCurrencies={presetCurrencies}
        />
      ),
    },
    {
      id: "Favorites",
      label: "Favorites",
      component: (
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          setFrom={setFrom}
          setTo={setTo}
        />
      ),
      count: favorites.length,
    },
    {
      id: "Log",
      label: "Log",
      component: (
        <Log
          conversionLog={conversionLog}
          setConversionLog={setConversionLog}
        />
      ),
      count: conversionLog.length,
    },
  ];

  const activeComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <section className="py-2">
      <div className="lg:hidden">
        <select
          name="toggle"
          id="toggle"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 bg-neutral-700 px-2 py-2"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex ">
        <ul className="flex gap-4">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2 ${
                activeTab === tab.id
                  ? "border-b-3 border-lime-500 text-white"
                  : "border-b-3 border-neutral-900 text-neutral-100"
              }`}
            >
              {tab.label}

              {tab.count !== undefined && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-800 px-1 text-xs">
                  {tab.count}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">{activeComponent}</div>
    </section>
  );
}

export default TabsBar;
