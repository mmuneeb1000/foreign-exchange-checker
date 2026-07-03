import { useEffect, useMemo, useRef, useState } from "react";

const flags = import.meta.glob("../assets/images/flags/*.webp", {
  eager: true,
  import: "default",
});

const flagMap = {
  AED: "ae",
  ARS: "ar",
  AUD: "au",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BRL: "br",
  CAD: "ca",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CYP: "cy",
  CZK: "cz",
  DKK: "dk",
  EGP: "eg",
  EUR: "eu",
  GBP: "gb",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  INR: "in",
  ISK: "is",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KRW: "kr",
  KWD: "kw",
  LBP: "lb",
  XCD: "lc",
  LKR: "lk",
  MAD: "ma",
  MXN: "mx",
  MYR: "my",
  NGN: "ng",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PEN: "pe",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  QAR: "qa",
  RON: "ro",
  RUB: "ru",
  SAR: "sa",
  SEK: "se",
  SGD: "sg",
  THB: "th",
  TRY: "tr",
  TWD: "tw",
  UAH: "ua",
  USD: "us",
  VND: "vn",
  ZAR: "za",
};

function getFlag(currency) {
  const country = flagMap[currency];

  if (!country) return null;

  return flags[`../assets/images/flags/${country}.webp`] ?? null;
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
    const query = search.toLowerCase();

    return Object.entries(currencies).filter(([code, currency]) => {
      return (
        code.toLowerCase().includes(query) ||
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
          {selectedFlag && (
            <img
              src={selectedFlag}
              alt={value}
              className="h-5 w-5 rounded-full object-cover"
            />
          )}

          <span>{value}</span>
        </div>
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
            {filteredCurrencies.map(([code, currency]) => {
              const flag = getFlag(code);

              return (
                <li
                  key={code}
                  onClick={() => {
                    onChange(code);
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-neutral-700"
                >
                  {flag ? (
                    <img
                      src={flag}
                      alt={code}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-neutral-600" />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium">{code}</span>
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
