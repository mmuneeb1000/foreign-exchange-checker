import { useEffect, useState } from "react";
import { convertCurrency } from "../../api/frankfurter";

function Compare({ presetCurrencies, from, to, favorites, setFrom, setTo }) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRates() {
      setLoading(true);

      try {
        const results = await Promise.all(
          presetCurrencies
            .filter((currency) => currency !== from)
            .map(async (currency) => {
              const data = await convertCurrency(from, currency, 1);

              return {
                currency,
                rate: data.rate,
              };
            }),
        );

        setRates(results);
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, [from, presetCurrencies]);

  function isFavorite(currency) {
    return favorites.some((item) => item.from === from && item.to === currency);
  }

  if (loading) {
    return (
      <section
        className="flex flex-col gap-2 justify-center items-center 
    h-40 lg:w-100 mx-auto"
      >
        <h2 className="text-base">No comparison available</h2>
        <p className="text-neutral-200 text-center">
          Enter an amount in Send above to see what your money is worth in other
          currencies.
        </p>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col gap-2 justify-center items-center 
    h-40 lg:w-100 mx-auto"
    >
      <div className="space-y-3">
        {rates.map((item) => (
          <div
            key={item.currency}
            className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800 p-4"
          >
            <div>
              <h3 className="font-medium">
                {from} → {item.currency}
              </h3>

              <p className="mt-1 text-lime-400">
                1 {from} = {item.rate.toFixed(4)} {item.currency}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isFavorite(item.currency) && (
                <span className="rounded-full bg-lime-500 px-2 py-1 text-xs text-neutral-900">
                  ★
                </span>
              )}

              {to === item.currency && (
                <span className="rounded-full bg-blue-600 px-2 py-1 text-xs">
                  Active
                </span>
              )}

              <button
                onClick={() => {
                  setFrom(from);
                  setTo(item.currency);
                }}
                className="rounded-lg border border-lime-500 px-3 py-2 text-sm"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Compare;
