import { useState } from "react";
import History from "./TabsMenu/History";
import Compare from "./TabsMenu/Compare";
import Favorites from "./TabsMenu/Favorites";
import Log from "./TabsMenu/Log";

function TabsBar() {
  // const [favoriteCount] = useState(0);
  // const [logCount] = useState(0);
  const [activeTab, setActiveTab] = useState("History");

  const tabs = [
    {
      id: "History",
      label: "History",
      component: <History />,
    },
    {
      id: "Compare",
      label: "Compare",
      component: <Compare />,
    },
    {
      id: "Favorites",
      label: "Favorites",
      component: <Favorites />,
      count: 0,
    },
    {
      id: "Log",
      label: "Log",
      component: <Log />,
      count: 0,
    },
  ];

  const activeComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <section className="py-2">
      {/* Mobile */}
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

      {/* Desktop */}
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

      {/* Active tab content */}
      <div className="mt-6">{activeComponent}</div>
    </section>
  );
}

export default TabsBar;
