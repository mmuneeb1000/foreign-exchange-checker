import flagMap from "./flagMap";

const flags = import.meta.glob("../assets/images/flags/*.webp", {
  eager: true,
  import: "default",
});

export default function getFlag(currency) {
  const country = flagMap[currency];

  if (!country) return null;

  return flags[`../assets/images/flags/${country}.webp`] ?? null;
}
