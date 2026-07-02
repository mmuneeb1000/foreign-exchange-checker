import ConversionIcon from "../assets/images/icon-exchange.svg";
import Dropdown from "./Dropdown";

function Converter({
  currencies,
  from,
  to,
  setFrom,
  setTo,
  amount,
  setAmount,
  converted,
  loading,
  favorite,
  setFavorite,
  error,
}) {
  function swapCurrencies() {
    setFrom(to);
    setTo(from);
  }
  function logConversion() {
    console.log({
      from,
      to,
      amount,
      converted,
      date: new Date().toISOString(),
    });
  }
  return (
    <section className="bg-neutral-900 flex flex-col">
      <h2 className="text-base uppercase">Check The Rate</h2>
      <div className="flex p-3 my-3 bg-neutral-700 rounded-xl justify-around flex-col gap-4 ">
        <div className="p-4 rounded-xl bg-neutral-600">
          <h3>Send</h3>
          <input
            type="number"
            value={amount}
            min="0"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-transparent text-2xl w-full outline-none"
          />
          <Dropdown currencies={currencies} value={from} onChange={setFrom} />
        </div>

        <button
          onClick={swapCurrencies}
          className="mx-auto p-2 w-10 rounded-xl bg-neutral-600"
        >
          <img src={ConversionIcon} alt="Swap currencies" />
        </button>

        <div className="p-4 rounded-xl bg-neutral-600">
          <h3>Recieve</h3>
          <input
            readOnly
            value={loading ? "..." : converted}
            className="bg-transparent text-2xl w-full outline-none"
          />

          <Dropdown currencies={currencies} value={to} onChange={setTo} />
        </div>
        <div
          className="flex flex-col py-4 gap-2 align-center
        border-t-2 border-neutral-600 border-dashed"
        >
          <p className="text-xs">
            {loading
              ? "Loading..."
              : `1 ${from} = ${(converted / amount).toFixed(4)} ${to}`}
          </p>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFavorite(!favorite)}
              className={`text-xs px-2 py-1 rounded-xl ${
                favorite
                  ? "bg-lime-500 text-neutral-900"
                  : "border border-lime-500 text-lime-500"
              }`}
            >
              {favorite ? "Favorited" : "Favorite"}
            </button>

            <button
              onClick={logConversion}
              className="text-xs px-2 py-1 border border-lime-500 rounded-xl"
            >
              Log Conversion
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Converter;
