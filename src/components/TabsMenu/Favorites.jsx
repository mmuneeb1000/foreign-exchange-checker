import { useEffect, useState } from "react";

function Favorites({ setFrom, setTo, favorites, setFavorites }) {
  function loadFavorites() {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(stored);
  }

  function removeFavorite(from, to) {
    const updated = favorites.filter(
      (item) => !(item.from === from && item.to === to),
    );

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  }
  useEffect(() => {
    loadFavorites();
  }, []);

  if (favorites.length === 0) {
    return (
      <section className="flex flex-col gap-2 justify-center items-center h-40 lg:w-100 mx-auto">
        <h2 className="text-base">No pinned pairs yet</h2>
        <p className="text-neutral-200 text-center">
          Pin a pair to track its rate here. Tap the star icon on any conversion
          or comparison row.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 justify-center items-center h-40 lg:w-100 mx-auto">
      <div className="space-y-3">
        {favorites.map((item) => (
          <div
            key={`${item.from}-${item.to}`}
            className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800 p-4"
          >
            <div>
              <p className="text-lg font-medium">
                {item.from} → {item.to}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFrom(item.from);
                  setTo(item.to);
                }}
                className="rounded-lg bg-lime-500 px-3 py-2 text-sm text-neutral-900"
              >
                Load
              </button>

              <button
                onClick={() => removeFavorite(item.from, item.to)}
                className="rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;
