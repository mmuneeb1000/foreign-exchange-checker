import { useState } from "react";
import History from "./TabsMenu/History";
import Compare from "./TabsMenu/Compare";
import Favorites from "./TabsMenu/Favorites";
import Log from "./TabsMenu/Log";

function TabsBar() {
  const tabs = {
    History: <History />,
    Compare: <Compare />,
    Favorites: <Favorites />,
    Log: <Log />,
  };
  const [activeTab, setActiveTab] = useState("History");
  return (
    <section className="py-2">
      <div className="lg:hidden">
        <select
          name="toggle"
          id="toggle"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className=" w-full bg-neutral-700 border 
          border-neutral-300 rounded-xl px-2 py-2"
        >
          {Object.keys(tabs).map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex gap-4">
          {Object.keys(tabs).map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-lg px-3 py-2 ${
                activeTab === tab
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">{tabs[activeTab]}</div>
    </section>
  );
}

export default TabsBar;
