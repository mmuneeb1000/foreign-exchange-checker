import { useEffect, useMemo, useRef, useState } from "react";
import getFlag from "../utils/getFlag";

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
    const query = search.toLowerCase();

    return currencies.filter((currency) => {
      return (
        currency.iso_code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
      );
    });
  }, [currencies, search]);

  const selectedFlag = getFlag(value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-24 items-center justify-between rounded-lg border border-neutral-500 bg-neutral-700 px-3 py-2"
      >
        <div className="flex items-center gap-2">
          {selectedFlag ? (
            <img
              src={selectedFlag}
              alt={value}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-neutral-600" />
          )}

          <span>{value}</span>
        </div>

        <span>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-neutral-700 bg-neutral-800 shadow-xl">
          <div className="border-b border-neutral-700 p-3">
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-neutral-700 px-3 py-2 outline-none"
            />
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {filteredCurrencies.map((currency) => {
              const flag = getFlag(currency.iso_code);

              return (
                <li
                  key={currency.iso_code}
                  onClick={() => {
                    onChange(currency.iso_code);
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-neutral-700"
                >
                  {flag ? (
                    <img
                      src={flag}
                      alt={currency.iso_code}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-neutral-600" />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium">{currency.iso_code}</span>

                    <span className="text-xs text-neutral-300">
                      {currency.name}
                    </span>
                  </div>
                </li>
              );
            })}

            {filteredCurrencies.length === 0 && (
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
