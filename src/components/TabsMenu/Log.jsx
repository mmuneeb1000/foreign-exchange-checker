import { useEffect, useState } from "react";

function Log({ conversionLog, setConversionLog }) {
  function clearLog() {
    setConversionLog([]);
  }
  if (conversionLog.length === 0) {
    return (
      <section className="flex flex-col gap-2 justify-center items-center h-40 lg:w-100 mx-auto">
        <h2 className="text-base"> No conversions logged yet</h2>
        <p className="text-neutral-200 text-center">
          Every conversion is recorded here automatically when you tap Log
          conversion. Your log is private to this session and this browser
        </p>
      </section>
    );
  }
  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={clearLog}
          className="rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400"
        >
          Clear Log
        </button>
      </div>

      <div className="space-y-3">
        {conversionLog.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-neutral-700 bg-neutral-800 p-4"
          >
            <div className="flex justify-between">
              <span className="font-medium">
                {item.amount} {item.from}
              </span>

              <span className="text-neutral-400">
                {new Date(item.date).toLocaleString()}
              </span>
            </div>

            <div className="mt-2 text-lime-400">
              {item.converted} {item.to}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Log;
