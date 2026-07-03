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
  const [rate, setRate] = useState(0);
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
    if (!from || !to || amount <= 0) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await convertCurrency(from, to, amount);

        setConverted(data.converted);
        setRate(data.rate);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to fetch rates.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
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
          rate={rate}
        />
        <TabsBar />
      </main>
      <Footer />
    </>
  );
}

export default App;
