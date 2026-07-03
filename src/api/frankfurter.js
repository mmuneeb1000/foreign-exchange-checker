const API_URL = "https://api.frankfurter.dev";

export async function getCurrencies() {
  const response = await fetch(`${API_URL}/v2/currencies`);

  if (!response.ok) {
    throw new Error("Failed to load currencies");
  }

  return await response.json();
}

export async function convertCurrency(from, to, amount) {
  const response = await fetch(`${API_URL}/v2/rate/${from}/${to}`);

  if (!response.ok) {
    throw new Error("Failed to convert currency");
  }

  const data = await response.json();

  return {
    rate: data.rate,
    converted: Number((amount * data.rate).toFixed(2)),
  };
}

export async function getHistory({ from, to, base, quotes }) {
  const response = await fetch(
    `${API_URL}/v2/rates?from=${from}&to=${to}&base=${base}&quotes=${quotes}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch history.");
  }

  return response.json();
}
