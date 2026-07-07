import { useEffect, useState } from "react";
import menuDown from "../assets/images/icon-menu-down.svg";
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-2">
      <div className="relative lg:hidden">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={mobileOpen}
          aria-controls="mobile-tabs"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-neutral-300 bg-neutral-700 px-4 py-3 uppercase tracking-[1px] outline-none transition focus-visible:ring-2 focus-visible:ring-lime-500"
        >
          <div className="flex items-center gap-2">
            <span>{activeTabData.label}</span>

            {activeTabData.count !== undefined && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-lime-800 px-2 py-0.5 text-xs font-semibold text-lime-300">
                {activeTabData.count}
              </span>
            )}
          </div>

          <img
            src={menuDown}
            alt="Menu Open"
            aria-hidden="true"
            className={`h-5 w-5 transition-transform ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileOpen && (
          <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-neutral-300 bg-neutral-700 shadow-xl">
            <ul role="listbox" aria-label="Navigation tabs">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeTab === tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 uppercase tracking-[1px] transition-colors
                ${
                  activeTab === tab.id
                    ? "bg-neutral-600 text-white"
                    : "text-white hover:bg-neutral-600"
                }`}
                  >
                    <span>{tab.label}</span>

                    {tab.count !== undefined && (
                      <span
                        className={`inline-flex min-w-5 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold
                    ${
                      activeTab === tab.id
                        ? "bg-neutral-900 text-lime-300"
                        : "bg-lime-800 text-lime-300"
                    }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
