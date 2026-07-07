import { useEffect, useState } from "react";
import { convertCurrency, getMarketTicker } from "../../api/frankfurter";

import FavoriteFilled from "../../assets/images/icon-star-filled.svg";

function Favorites({ setFrom, setTo, favorites, setFavorites, amount }) {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    async function loadRates() {
      const results = await Promise.all(
        favorites.map(async (item) => {
          const data = await convertCurrency(item.from, item.to, amount);

          return {
            ...item,
            rate: data.rate,
            converted: data.converted,
          };
        }),
      );

      setRates(results);
    }

    if (favorites.length > 0) {
      loadRates();
    } else {
      setRates([]);
    }
  }, [favorites, amount]);
  const pairs = favorites.map((item) => [item.from, item.to]);
  useEffect(() => {
    async function loadFavoritesRates() {
      if (favorites.length === 0) {
        setRates([]);
        return;
      }

      try {
        const marketData = await getMarketTicker(pairs);

        const results = await Promise.all(
          favorites.map(async (item) => {
            const conversion = await convertCurrency(
              item.from,
              item.to,
              amount,
            );

            const market = marketData.find(
              (data) => data.base === item.from && data.quote === item.to,
            );

            return {
              ...item,
              converted: conversion.converted,
              rate: conversion.rate,
              change: market?.change ?? 0,
              percent: market?.percent ?? 0,
            };
          }),
        );

        setRates(results);
      } catch (err) {
        console.error(err);
      }
    }

    loadFavoritesRates();
  }, [favorites, amount]);
  function removeFavorite(from, to) {
    const updated = favorites.filter(
      (item) => !(item.from === from && item.to === to),
    );

    localStorage.setItem("favorites", JSON.stringify(updated));

    setFavorites(updated);
  }

  if (favorites.length === 0) {
    return (
      <section className="flex flex-col gap-2 justify-center items-center h-40 lg:w-100 mx-auto">
        <h2 className="font-medium text-base">No pinned pairs yet</h2>

        <p className="text-neutral-200 text-center">
          Pin a pair to track its rate here. Tap the star icon on any conversion
          or comparison row.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="space-y-3 rounded-xl p-4 bg-neutral-700">
        <h3 className="uppercase">Pinned Pairs</h3>
        {rates.map((item) => (
          <div
            key={`${item.from}-${item.to}`}
            role="button"
            onClick={() => {
              setFrom(item.from);
              setTo(item.to);
            }}
            className="flex w-full items-center justify-between rounded-xl border 
            border-neutral-400 bg-neutral-600 p-3 text-left transition 
            hover:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <div>
              <h3 className="font-medium">
                {item.from} → {item.to}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`text-right text-xs ${
                  item.change >= 0 ? "text-lime-400" : "text-red-400"
                }`}
              >
                <p className="text-base text-neutral-100">
                  {item.rate.toFixed(4)}
                </p>

                <p
                  aria-label={`${item.percent >= 0 ? "Up" : "Down"} ${Math.abs(item.percent).toFixed(2)} percent`}
                >
                  <span aria-hidden="true">{item.change >= 0 ? "▲" : "▼"}</span>{" "}
                  {Math.abs(item.percent).toFixed(2)}%
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(item.from, item.to);
                }}
                aria-label={`Remove ${item.from} to ${item.to} from favorites`}
                className="cursor-pointer rounded-lg border-2 border-lime-500 p-2 transition hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <img
                  src={FavoriteFilled}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;
