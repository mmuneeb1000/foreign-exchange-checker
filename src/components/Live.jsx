import { useEffect, useState } from "react";
import { getMarketTicker } from "../api/frankfurter";

const marketPairs = [
  ["EUR", "USD"],
  ["GBP", "USD"],
  ["USD", "JPY"],
  ["USD", "CHF"],
  ["USD", "CAD"],
  ["AUD", "USD"],
  ["NZD", "USD"],
  ["EUR", "GBP"],
  ["EUR", "JPY"],
  ["GBP", "JPY"],
  ["EUR", "CHF"],
  ["AUD", "JPY"],
];

function Live() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    async function loadMarkets() {
      try {
        const data = await getMarketTicker(marketPairs);
        setMarkets(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadMarkets();

    const interval = setInterval(loadMarkets, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderItems = () =>
    markets.map((item) => (
      <div
        key={`${item.base}-${item.quote}`}
        className="mx-5 flex shrink-0 items-center gap-3"
      >
        <span className="font-semibold text-neutral-100">
          {item.base}/{item.quote}
        </span>

        <span className="text-white">{item.rate.toFixed(4)}</span>

        <span className={item.change >= 0 ? "text-lime-400" : "text-red-400"}>
          {item.change >= 0 ? "▲" : "▼"} {Math.abs(item.percent).toFixed(2)}%
        </span>
      </div>
    ));

  return (
    <section className="mt-2 flex overflow-hidden border-y border-neutral-700 bg-neutral-800">
      <div className="shrink-0 bg-lime-500 px-3 py-2 text-xs font-semibold uppercase text-neutral-900">
        Live Markets
      </div>

      <div className="ticker-wrapper">
        <div className="ticker-track">{renderItems()}</div>

        <div className="ticker-track">{renderItems()}</div>
      </div>
    </section>
  );
}

export default Live;
