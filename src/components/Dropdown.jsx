import { useEffect, useMemo, useRef, useState } from "react";

const flags = import.meta.glob("../assets/images/flags/*.webp", {
  eager: true,
  import: "default",
});

const flagMap = {
  AED: "ae",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",
  CNY: "cn",
  DKK: "dk",
  EUR: "eu",
  GBP: "gb",
  INR: "in",
  JPY: "jp",
  NOK: "no",
  NZD: "nz",
  PKR: "pk",
  SAR: "sa",
  SEK: "se",
  USD: "us",
};

function getFlag(currency) {
  const country = flagMap[currency];

  if (!country) return "";

  return flags[`../assets/flags/${country}.webp`];
}

function Dropdown({ currencies, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = useMemo(() => {
    return Object.entries(currencies).filter(([code, name]) => {
      const query = search.toLowerCase();

      return (
        code.toLowerCase().includes(query) || name.toLowerCase().includes(query)
      );
    });
  }, [currencies, search]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-lg border border-neutral-500 bg-neutral-700 px-3 py-2"
      >
        <div className="flex items-center gap-2">
          {getFlag(value) && (
            <img
              src={getFlag(value)}
              alt={value}
              className="h-6 w-6 rounded-full"
            />
          )}

          <span>{value}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-800 shadow-xl">
          <div className="border-b border-neutral-700 p-3">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3">
              <input
                type="text"
                placeholder="Search currency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-2 outline-none"
              />
            </div>
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {filteredCurrencies.map(([code, name]) => (
              <li
                key={code}
                onClick={() => {
                  onChange(code);
                  setSearch("");
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-neutral-700"
              >
                {getFlag(code) && (
                  <img
                    src={getFlag(code)}
                    alt={code}
                    className="h-6 w-6 rounded-full"
                  />
                )}

                <div className="flex flex-col">
                  <span className="font-medium">{code}</span>

                  <span className="text-xs text-neutral-400">{name}</span>
                </div>
              </li>
            ))}

            {!filteredCurrencies.length && (
              <li className="px-4 py-6 text-center text-sm text-neutral-400">
                No currencies found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
