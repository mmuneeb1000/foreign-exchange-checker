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
  converted,
  amount,
}) {
  function handleTabKeyDown(e, index) {
    const last = tabs.length - 1;
    let nextIndex = index;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        nextIndex = index === last ? 0 : index + 1;
        break;

      case "ArrowLeft":
        e.preventDefault();
        nextIndex = index === 0 ? last : index - 1;
        break;

      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;

      case "End":
        e.preventDefault();
        nextIndex = last;
        break;

      default:
        return;
    }

    setActiveTab(tabs[nextIndex].id);

    requestAnimationFrame(() => {
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    });
  }
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
          converted={converted}
          amount={amount}
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
          amount={amount}
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
        <label htmlFor="toggle" className="sr-only">
          Select a tab
        </label>
        <select
          name="toggle"
          id="toggle"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="flex justify-between w-full rounded-xl border uppercase tracking-[1px] border-neutral-300 bg-neutral-700 px-4 py-2"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
              {tab.count !== undefined ? ` (${tab.count})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:flex ">
        <ul role="tablist" aria-label="Currency tools" className="flex gap-4">
          {tabs.map((tab, index) => (
            <li key={tab.id}>
              <button
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center tracking-[1px] gap-2 px-3 py-2 uppercase transition-colors
                ${
                  activeTab === tab.id
                    ? "border-b-3 border-lime-500 text-white"
                    : "border-b-3 border-neutral-900 text-white"
                }
                focus-visible:outline-none
                focus-visible:ring
                focus-visible:ring-lime-500
                focus-visible:ring-offset-2
                focus-visible:ring-offset-neutral-900`}
              >
                {tab.label}

                {tab.count !== undefined && (
                  <span
                    aria-label={`${tab.count} ${
                      tab.id === "Favorites"
                        ? "favorite pairs"
                        : "logged conversions"
                    }`}
                    className="flex h-5 min-w-5 items-center justify-center
                     rounded-full text-lime-500 bg-lime-800 p-1 text-xs"
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="mt-6"
      >
        {activeComponent}
      </div>
    </section>
  );
}

export default TabsBar;
