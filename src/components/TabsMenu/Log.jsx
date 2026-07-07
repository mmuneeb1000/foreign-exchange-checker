import { useEffect, useState } from "react";
import deleteIcon from "../../assets/images/icon-delete.svg";

function Log({ conversionLog, setConversionLog }) {
  function clearLog() {
    setConversionLog([]);
  }
  function removeLog(id) {
    setConversionLog((prev) => prev.filter((item) => item.id !== id));
  }
  function getRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);

    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) {
      return `${diff}S`;
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
      return `${minutes}M`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}H`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days}D`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months}MO`;
    }

    const years = Math.floor(months / 12);
    return `${years}Y`;
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
      <div className="space-y-3 rounded-xl bg-neutral-700 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="uppercase">Conversion Log</h3>
          <button
            onClick={clearLog}
            className="rounded-lg border uppercase cursor-pointer hover:border-red-500 
            border-neutral-200 px-2 py-1 text-sm text-neutral-200 focus-lime"
          >
            Clear All
          </button>
        </div>
        {conversionLog.map((item) => (
          <div
            key={item.id}
            className="flex rounded-xl justify-between items-center border border-neutral-400 bg-neutral-600 p-3"
          >
            <div className="flex gap-4 focus-lime items-center justify-between">
              <span className="text-base text-neutral-200">
                {getRelativeTime(item.date)}
              </span>
              <h3 className=" text-white">
                {item.from} → {item.to}
              </h3>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center lg:flex-row lg:gap-4 justify-between text-right">
                <span className="text-lg text-neutral-200 font-medium">
                  {item.amount}
                </span>
                <span className="text-lg text-lime-500">{item.converted}</span>
              </div>
              <button
                onClick={() => removeLog(item.id)}
                className="rounded-lg items-center border border-neutral-300 
                cursor-pointer hover:border-red-500 px-2 py-2 text-xs focus-lime"
              >
                <img src={deleteIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Log;
