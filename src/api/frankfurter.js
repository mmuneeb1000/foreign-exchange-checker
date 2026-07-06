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

export async function getMarketTicker(pairs) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const previousDate = yesterday.toISOString().split("T")[0];

  const results = await Promise.all(
    pairs.map(async ([base, quote]) => {
      try {
        const latestRes = await fetch(
          `${API_URL}/v1/latest?base=${base}&symbols=${quote}`,
        );

        const latestJson = await latestRes.json();

        if (!latestJson.rates?.[quote]) {
          return {
            base,
            quote,
            supported: false,
            message: "Unsupported",
          };
        }

        const latestRate = latestJson.rates[quote];

        const previousRes = await fetch(
          `${API_URL}/v1/${previousDate}?base=${base}&symbols=${quote}`,
        );

        const previousJson = await previousRes.json();

        if (!previousJson.rates?.[quote]) {
          return {
            base,
            quote,
            supported: false,
            message: "No history",
          };
        }

        const previousRate = previousJson.rates[quote];
        const change = latestRate - previousRate;

        return {
          base,
          quote,
          rate: latestRate,
          previousRate,
          change,
          percent: (change / previousRate) * 100,
          supported: true,
        };
      } catch {
        return {
          base,
          quote,
          supported: false,
          message: "Error",
        };
      }
    }),
  );

  return results;
}
