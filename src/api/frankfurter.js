const API_URL = "https://api.frankfurter.dev/v2";

export async function getCurrencies() {
  const response = await fetch(`${API_URL}/currencies`);

  if (!response.ok) {
    throw new Error("Failed to load currencies");
  }

  return response.json();
}

export async function convertCurrency(from, to, amount) {
  const response = await fetch(`${API_URL}/rate/${from}/${to}`);

  if (!response.ok) {
    throw new Error("Failed to convert currency");
  }

  return response.json();
}
