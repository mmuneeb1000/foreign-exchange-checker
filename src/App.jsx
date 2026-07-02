import { getCurrencies, convertCurrency } from "./api/frankfurter";
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
    async function loadCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch {
        setError("Unable to load currencies.");
      }
    }

    loadCurrencies();
  }, []);

  useEffect(() => {
    async function convert() {
      try {
        setLoading(true);

        const data = await convertCurrency(from, to, amount);

        setConverted(data.rates[to]);
        setError("");
      } catch {
        setError("Unable to fetch rates.");
      } finally {
        setLoading(false);
      }
    }

    convert();
  }, [amount, from, to]);

  return (
    <>
      <Header />
      <Live />
      <main className="px-4 py-8 lg:w-230 lg:mx-auto">
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
