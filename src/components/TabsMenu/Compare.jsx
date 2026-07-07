import { useEffect, useState } from "react";
import { convertCurrency } from "../../api/frankfurter";
import getFlag from "../../utils/getFlag";
import FavoriteFilled from "../../assets/images/icon-star-filled.svg";
import FavoriteOutline from "../../assets/images/icon-star.svg";

function Compare({
  presetCurrencies,
  from,
  to,
  favorites,
  setFrom,
  setTo,
  converted,
  amount,
}) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRates() {
      setLoading(true);

      try {
        const results = await Promise.all(
          presetCurrencies
            .filter((currency) => currency.code !== from)
            .map(async (currency) => {
              const data = await convertCurrency(from, currency.code, amount);

              return {
                ...currency,
                rate: data.rate,
                converted: data.converted,
              };
            }),
        );

        setRates(results);
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, [from, amount, presetCurrencies]);

  function isFavorite(currencyCode) {
    return favorites.some(
      (item) => item.from === from && item.to === currencyCode,
    );
  }

  if (loading) {
    return (
      <section className="rounded-xl bg-neutral-900 p-6 text-center">
        <h3 className=" font-medium">Loading comparisons...</h3>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-700">
        <p className="text-base uppercase text-white my-2">
          <span className="text-neutral-200">Multi Currency: </span>
          {amount.toLocaleString()} from {from}
        </p>
        {rates.map((item) => (
          <div
            key={item.code}
            className="flex  items-center justify-between rounded-xl border border-neutral-400 bg-neutral-600 p-3"
          >
            <div className="flex items-center gap-5">
              <img
                src={getFlag(item.code)}
                alt={item.name}
                className="h-6 w-6 rounded-full border border-neutral-700 object-cover"
              />

              <div>
                <h3 className="font-medium ">{item.code}</h3>

                <p className="text-xs text-neutral-100">{item.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {item.converted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {item.code}
                </p>

                <p className="text-xs text-neutral-200">
                  @ {item.rate.toFixed(4)}
                </p>
              </div>
              <span
                className={`rounded-lg px-2 py-2 text-xs ${
                  isFavorite(item.code)
                    ? "bg-neutral-700 text-neutral-900 border-2 border-lime-500"
                    : "bg-neutral-700 text-neutral-300 border-2 border-neutral-700"
                }`}
              >
                <img
                  src={isFavorite(item.code) ? FavoriteFilled : FavoriteOutline}
                  alt={isFavorite(item.code) ? "Favorited" : "Not favorited"}
                  className="h-5 w-5"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Compare;
