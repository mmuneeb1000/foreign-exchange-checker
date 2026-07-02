import ConversionIcon from "../assets/images/icon-exchange.svg";
function Converter() {
  return (
    <section className="bg-neutral-900 flex flex-col">
      <h2 className="text-base uppercase">Check The Rate</h2>
      <div className="flex p-3 my-3 bg-neutral-700 rounded-xl justify-around flex-col gap-4 ">
        <div className="p-4 rounded-xl bg-neutral-600">
          <h3>Send</h3>
          <p className="text-2xl">1000</p>
        </div>
        <div className="mx-auto p-2 w-10 rounded-xl bg-neutral-600">
          <img src={ConversionIcon} />
        </div>
        <div className="p-4 rounded-xl bg-neutral-600">
          <h3>Recieve</h3>
          <p className="text-2xl">850</p>
        </div>
        <div
          className="flex flex-col py-4 gap-2 align-center
        border-t-2 border-neutral-600 border-dashed"
        >
          <p className="text-xs"> 1 USD = 0.85EU </p>
          <div className="flex justify-center gap-2">
            <button
              className="text-xs text-neutral-900 
            px-2 py-1 bg-lime-500 rounded-xl "
            >
              Favourited
            </button>
            <button
              className="text-xs text-white 
            px-2 py-1 border border-lime-500 rounded-xl"
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
