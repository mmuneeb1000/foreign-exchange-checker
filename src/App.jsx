import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Live from "./components/Live";
import TabsBar from "./components/TabsBar";
import Converter from "./components/Converter";

function App() {
  const [currencies, setCurrencies] = useState({});

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const [amount, setAmount] = useState(1000);
  const [converted, setConverted] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCurrencies();
  }, []);

  useEffect(() => {
    convert();
  }, [amount, from, to]);

  async function loadCurrencies() {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json();

    setCurrencies(data);
  }

  async function convert() {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
      );

      const data = await res.json();

      setConverted(data.rates[to]);
      setError("");
    } catch {
      setError("Unable to fetch rates.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Live />
      <main className="px-4 py-8">
        <Converter
          currencies={currencies}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          amount={amount}
          setAmount={setAmount}
          converted={converted}
          loading={loading}
          favorite={favorite}
          setFavorite={setFavorite}
          error={error}
        />
        <TabsBar />
      </main>
      <Footer />
    </>
  );
}

export default App;
