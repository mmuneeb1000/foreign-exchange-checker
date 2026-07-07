import { useEffect, useMemo, useRef, useState } from "react";
import ChevronDown from "../assets/images/icon-chevron-down.svg";
import SearchIcon from "../assets/images/icon-search.svg";
import TickIcon from "../assets/images/icon-check.svg";
import getFlag from "../utils/getFlag";

const FEATURED = ["USD", "EUR", "GBP"];

function Dropdown({ currencies = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search, isOpen]);
  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) =>
          Math.min(i + 1, visibleCurrencies.length - 1),
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;

      case "Enter":
        e.preventDefault();
        if (visibleCurrencies[highlightedIndex]) {
          handleSelect(visibleCurrencies[highlightedIndex]);
        }

        break;

      case "Escape":
        setIsOpen(false);
        break;
    }
  }
  const handleButtonKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        break;
    }
  };

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
  const availableCurrencies = useMemo(() => {
    return currencies.filter((currency) => getFlag(currency.iso_code));
  }, [currencies]);
  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return availableCurrencies.filter(
      (currency) =>
        currency.iso_code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query),
    );
  }, [availableCurrencies, search]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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

  const selectedCurrency =
    availableCurrencies.find((currency) => currency.iso_code === value) ??
    featuredCurrencies[0] ??
    null;

  const handleSelect = (currency) => {
    onChange(currency.iso_code);
    setIsOpen(false);
    setSearch("");
  };
  const visibleCurrencies = search
    ? filteredCurrencies
    : [...featuredCurrencies, ...otherCurrencies];
  useEffect(() => {
    const el = document.getElementById(
      `currency-${visibleCurrencies[highlightedIndex]?.iso_code}`,
    );

    el?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex, visibleCurrencies]);

  const renderCurrency = (currency, index) => (
    <li
      key={currency.iso_code}
      onClick={() => handleSelect(currency)}
      id={`currency-${currency.iso_code}`}
      role="option"
      onMouseEnter={() => setHighlightedIndex(index)}
      aria-selected={currency.iso_code === value}
      className={`flex cursor-pointer rounded-lg mt-2 items-center gap-3 px-4 py-2 transition-colors
      ${
        highlightedIndex === index ? "bg-neutral-500" : "hover:bg-neutral-500"
      }`}
    >
      <img
        src={getFlag(currency.iso_code)}
        alt={currency.iso_code}
        className="h-6 w-6 rounded-full object-cover"
      />

      <div className="flex gap-2 items-center">
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
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="currency-listbox"
        aria-activedescendant={
          visibleCurrencies[highlightedIndex]
            ? `currency-${visibleCurrencies[highlightedIndex].iso_code}`
            : undefined
        }
        aria-label={`Selected currency ${selectedCurrency?.name}`}
        onKeyDown={handleButtonKeyDown}
        className="flex w-28 items-center justify-between rounded-lg 
        cursor-pointer border border-neutral-300 
        bg-neutral-500 px-3 py-2 hover:bg-neutral-400
        outline-none
          focus:outline-none
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-lime-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-neutral-900"
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
          className="absolute right-[-0.75rem] top-14 z-50 mt-2 p-2 w-72 
        overflow-hidden rounded-xl border border-neutral-300 
        bg-neutral-600 shadow-xl"
        >
          <div className="p-1 relative">
            <img
              className="absolute left-4 top-3.5"
              src={SearchIcon}
              alt="Search Icon"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-neutral-400 
              bg-neutral-600 pl-10 pr-2 py-2 outline-none placeholder:text-neutral-100 placeholder:text-xs"
            />
          </div>

          <ul
            id="currency-listbox"
            role="listbox"
            aria-label="Currencies"
            className="max-h-80 overflow-y-auto"
          >
            {search ? (
              filteredCurrencies.length ? (
                filteredCurrencies.map((currency, index) =>
                  renderCurrency(currency, index),
                )
              ) : (
                <li className="px-4 py-6 text-center text-sm text-neutral-200">
                  No currencies found.
                </li>
              )
            ) : (
              <>
                <li
                  role="presentation"
                  className="border-b border-neutral-300 px-4 py-2 text-xs 
                  font-semibold uppercase tracking-wider text-neutral-200"
                >
                  Popular
                </li>

                {featuredCurrencies.map((currency, index) =>
                  renderCurrency(currency, index),
                )}

                <li
                  role="presentation"
                  className="border-y border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200"
                >
                  Others
                </li>

                {otherCurrencies.map((currency, index) =>
                  renderCurrency(currency, featuredCurrencies.length + index),
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
