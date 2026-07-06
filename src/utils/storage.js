export function logConversion(entry) {
  const log = JSON.parse(localStorage.getItem("conversionLog")) || [];

  const latest = log[0];

  if (
    latest &&
    latest.amount === entry.amount &&
    latest.from === entry.from &&
    latest.to === entry.to &&
    latest.result === entry.result
  ) {
    return;
  }

  log.unshift({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    ...entry,
  });

  localStorage.setItem("conversionLog", JSON.stringify(log.slice(0, 100)));
}
