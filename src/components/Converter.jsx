import ConversionIcon from "../assets/images/icon-exchange.svg";
import Dropdown from "./Dropdown";
import FavoriteFilled from "../assets/images/icon-star-black.svg";
import FavoriteOutline from "../assets/images/icon-star.svg";
function Converter({
  currencies,
  from,
  to,
  rate,
  setFrom,
  setTo,
  amount,
  setAmount,
  converted,
  loading,
  favorite,
  error,
  toggleFavorite,
  logConversion,
}) {
  function swapCurrencies() {
    setFrom(to);
    setTo(from);
  }

  return (
    <section className="bg-neutral-900 flex flex-col ">
      <h1 className="text-base uppercase">Check The Rate</h1>
      <div
        className="flex flex-col px-3 py-4 my-3 bg-neutral-700 
      rounded-xl gap-4"
      >
        <div
          className="flex flex-col justify-center items-center 
        lg:flex-row"
        >
          <div className="flex flex-col p-4 rounded-xl bg-neutral-600 lg:w-100 gap-5">
            <h4 className="text-neutral-200 uppercase">Send</h4>
            <div className="flex space-around ">
              <input
                type="number"
                value={amount}
                min="1"
                onChange={(e) => setAmount(e.target.value)}
                className="no-spinner bg-transparent text-2xl w-full mr-4 focus-lime"
              />
              <Dropdown
                currencies={currencies}
                value={from}
                onChange={setFrom}
              />
            </div>
          </div>
          <div className="mx-auto my-2 lg:mx-4 lg:my-auto">
            <button
              onClick={swapCurrencies}
              className="flex cursor-pointer p-2 w-10 h-10 rounded-xl hover:bg-neutral-500 bg-neutral-600 focus-lime"
            >
              <img src={ConversionIcon} alt="Swap currencies" />
            </button>
          </div>
          <div className="flex flex-col p-4 rounded-xl bg-neutral-600 lg:w-100 gap-5">
            <h4 className="text-neutral-200 uppercase">Recieve</h4>
            <div className="flex space-around">
              <input
                readOnly
                value={loading ? "..." : converted}
                className="bg-transparent text-lime-500 text-2xl mr-4 
                w-full focus-lime"
              />

              <Dropdown currencies={currencies} value={to} onChange={setTo} />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col pt-2 px-2 gap-2 
        border-t border-neutral-500 border-dashed lg:flex-row"
        >
          <p className="flex items-center text-xs lg:w-full">
            {loading ? "Loading..." : `1 ${from} = ${rate.toFixed(4)} ${to}`}
          </p>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex justify-center gap-2 my-2">
            <button
              onClick={toggleFavorite}
              className={`flex w-27 border border-neutral-300 cursor-pointer
                 items-center gap-2 rounded-lg px-2 py-1 text-xs uppercase focus-lime
                 active:scale-95
  active:brightness-90 ${
    favorite ? "bg-lime-500 text-neutral-900" : " text-neutral-200"
  }`}
            >
              <img
                src={favorite ? FavoriteFilled : FavoriteOutline}
                alt={favorite ? "Favorited" : "Favorite"}
                className="h-4 w-4"
              />

              {favorite ? "Favorited" : "Favorite"}
            </button>

            <button
              onClick={() => logConversion(converted)}
              className="text-xs px-2 py-1 bg:neutral-800 border cursor-pointer uppercase 
               rounded-lg whitespace-nowrap border-neutral-400 outline-none
              focus-lime hover:border-lime-500 hover:bg-lime-800 active:scale-95
  active:brightness-90"
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
