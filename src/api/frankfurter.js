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
