import { useEffect, useMemo, useRef, useState } from "react";
import ChevronDown from "../assets/images/icon-chevron-down.svg";
import SearchIcon from "../assets/images/icon-search.svg";
import TickIcon from "../assets/images/icon-check.svg";
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
      className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-500 ${
        currency.iso_code === value ? "bg-neutral-500" : ""
      }`}
    >
      <img
        src={getFlag(currency.iso_code)}
        alt={currency.iso_code}
        className="h-6 w-6 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <span className="font-medium">{currency.iso_code}</span>
        <span className="text-xs text-neutral-100">{currency.name}</span>
      </div>
      {currency.iso_code === value && <img src={TickIcon} />}
    </li>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-28 items-center justify-between rounded-lg 
        cursor-pointer border border-neutral-300 bg-neutral-500 px-3 py-2"
      >
        <div className="flex items-center gap-3">
          {selectedCurrency && (
            <img
              src={getFlag(selectedCurrency.iso_code)}
              alt={selectedCurrency.iso_code}
              className="h-6 w-6 rounded-full object-cover"
            />
          )}

          <span>{selectedCurrency?.iso_code ?? value}</span>
          <img src={ChevronDown} alt="Menu Dropdown" />
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute right-[-0.75rem] top-14 z-50 mt-2 w-72 
        overflow-hidden rounded-xl border border-neutral-300 
        bg-neutral-600 shadow-xl"
        >
          <div className="p-3 relative">
            <img
              className="absolute left-6 top-5.5"
              src={SearchIcon}
              alt="Search Icon"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-400 
              bg-neutral-600 pl-10 pr-3 py-2 outline-none placeholder:text-neutral-100 placeholder:text-xs"
            />
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {search ? (
              filteredCurrencies.length ? (
                filteredCurrencies.map(renderCurrency)
              ) : (
                <li className="px-4 py-6 text-center text-sm text-neutral-200">
                  No currencies found.
                </li>
              )
            ) : (
              <>
                <li
                  className="px-4 py-2 text-xs font-semibold uppercase 
                tracking-wider border-b border-neutral-300 text-neutral-200"
                >
                  Popular
                </li>

                {featuredCurrencies.map(renderCurrency)}

                <li
                  className="border-b border-neutral-300 px-4 py-2 text-xs 
                font-semibold uppercase tracking-wider text-neutral-200"
                >
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
