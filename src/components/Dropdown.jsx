import { useEffect, useMemo, useRef, useState } from "react";

import getFlag from "../utils/getFlag";

const FEATURED = ["USD", "EUR", "GBP", "JPY", "PKR"];

function Dropdown({ currencies = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const availableCurrencies = useMemo(() => {
    return currencies.filter((currency) => getFlag(currency.iso_code));
  }, [currencies]);

  const featuredCurrencies = useMemo(() => {
    return FEATURED.map((code) =>
      availableCurrencies.find((currency) => currency.iso_code === code),
    ).filter(Boolean);
  }, [availableCurrencies]);

  const otherCurrencies = useMemo(() => {
    return availableCurrencies.filter(
      (currency) => !FEATURED.includes(currency.iso_code),
    );
  }, [availableCurrencies]);

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return availableCurrencies.filter(
      (currency) =>
        currency.iso_code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query),
    );
  }, [availableCurrencies, search]);

  const selectedCurrency =
    availableCurrencies.find((currency) => currency.iso_code === value) ??
    featuredCurrencies[0] ??
    null;

  const handleSelect = (currency) => {
    onChange(currency.iso_code);
    setIsOpen(false);
    setSearch("");
  };

  const renderCurrency = (currency) => (
    <li
      key={currency.iso_code}
      onClick={() => handleSelect(currency)}
      className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-700 ${
        currency.iso_code === value ? "bg-neutral-700" : ""
      }`}
    >
      <img
        src={getFlag(currency.iso_code)}
        alt={currency.iso_code}
        className="h-6 w-6 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <span className="font-medium">{currency.iso_code}</span>
        <span className="text-xs text-neutral-300">{currency.name}</span>
      </div>
    </li>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-28 items-center justify-between rounded-lg border border-neutral-500 bg-neutral-700 px-3 py-2"
      >
        <div className="flex items-center gap-2">
          {selectedCurrency && (
            <img
              src={getFlag(selectedCurrency.iso_code)}
              alt={selectedCurrency.iso_code}
              className="h-6 w-6 rounded-full object-cover"
            />
          )}

          <span>{selectedCurrency?.iso_code ?? value}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 shadow-xl">
          <div className="border-b border-neutral-700 p-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-neutral-700 px-3 py-2 outline-none placeholder:text-neutral-400"
            />
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {search ? (
              filteredCurrencies.length ? (
                filteredCurrencies.map(renderCurrency)
              ) : (
                <li className="px-4 py-6 text-center text-sm text-neutral-400">
                  No currencies found.
                </li>
              )
            ) : (
              <>
                <li className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Popular
                </li>

                {featuredCurrencies.map(renderCurrency)}

                <li className="border-t border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Others
                </li>

                {otherCurrencies.map(renderCurrency)}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
