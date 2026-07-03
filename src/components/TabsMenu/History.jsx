import { useEffect, useState, useRef } from "react";
import { getHistory } from "../../api/frankfurter";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function History() {
  const [historyData, setHistoryData] = useState([]);

  const chartData = historyData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    rate: item.rate,
  }));
  const rates = chartData.map((d) => d.rate);

  const min = Math.min(...rates);
  const max = Math.max(...rates);

  const rangeSize = max - min;
  const padding = Math.max(rangeSize * 0.1, 0.001);

  const open = chartData[0]?.rate ?? 0;
  const last = chartData.at(-1)?.rate ?? 0;

  const change = last - open;
  const percentChange = open ? (change / open) * 100 : 0;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("1M");
  const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      const y =
        chartRef.current.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky header

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [range]);
  function getDateRange(range) {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case "1D":
        start.setDate(end.getDate() - 1);
        break;
      case "1W":
        start.setDate(end.getDate() - 7);
        break;
      case "1M":
        start.setMonth(end.getMonth() - 1);
        break;
      case "3M":
        start.setMonth(end.getMonth() - 3);
        break;
      case "1Y":
        start.setFullYear(end.getFullYear() - 1);
        break;
      case "5Y":
        start.setFullYear(end.getFullYear() - 5);
        break;
      default:
        start.setMonth(end.getMonth() - 1);
    }

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  }
  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError(null);

        const { startDate, endDate } = getDateRange(range);

        const data = await getHistory({
          from: startDate,
          to: endDate,
          base: "USD",
          quotes: "EUR",
        });

        setHistoryData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [range]);

  return (
    <section className="flex flex-col gap-2 justify-center items-center mx-auto">
      {loading && <p>Loading history...</p>}
      {!loading && error && (
        <div>
          <h2 className="text-base">No chart data available</h2>
          <p className="text-neutral-200 text-center">
            We couldn't load rate history for 'pair' right now. This usually
            clears up in a minute.
          </p>
        </div>
      )}
      {!loading && !error && (
        <div className=" w-full ">
          <div className=" lg:flex lg:items-center lg:justify-between lg:h-26">
            <div className="mb-3 grid grid-cols-2 gap-4 lg:flex lg:justify-between lg:flex-nowrap">
              <div className="rounded-xl w-full bg-neutral-700 border border-neutral-500 p-3 lg:w-32 lg:h-18">
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-200">
                  Open
                </p>
                <p className="text-lg font-medium">{open.toFixed(4)}</p>
              </div>

              <div className="rounded-xl w-full bg-neutral-700 border border-neutral-500 p-3 lg:w-32 lg:h-18">
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-200">
                  Last
                </p>
                <p className="text-lg font-medium">{last.toFixed(4)}</p>
              </div>

              <div className="rounded-xl w-full bg-neutral-700 border border-neutral-500 p-3 lg:w-32 lg:h-18">
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-200">
                  Change
                </p>
                <p
                  className={`text-lg font-medium ${
                    change >= 0 ? "text-lime-400" : "text-red-400"
                  }`}
                >
                  {change >= 0 ? "+" : ""}
                  {change.toFixed(4)}
                </p>
              </div>

              <div className="rounded-xl w-full bg-neutral-700 border border-neutral-500 p-3 lg:w-32 lg:h-18">
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-200">
                  % Change
                </p>
                <p
                  className={`text-lg font-medium ${
                    percentChange >= 0 ? "text-lime-400" : "text-red-400"
                  }`}
                >
                  {percentChange >= 0 ? "▲ +" : "▼ "}
                  {percentChange.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="flex items-center mb-3 rounded-lg w-57 bg-neutral-700 lg:h-11">
              {ranges.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setRange(item);
                  }}
                  className={`rounded-md px-3 py-3 text-xs transition ${
                    range === item
                      ? "bg-neutral-600 text-white"
                      : "text-neutral-100 "
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={chartRef}
            className="bg-neutral-700 h-96 px-2 py-4 rounded-xl"
          >
            <span className="text-base">USD/EUR</span>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="rate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(71, 92%, 60%)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(71, 92%, 60%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  stroke="#262626"
                  strokeDasharray="3 3"
                  tickCount={3}
                />
                <XAxis
                  dataKey="date"
                  height={40}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#737373",
                    fontSize: 11,
                    fontFamily: "Inter",
                    fontWeight: 500,
                  }}
                />
                <YAxis
                  domain={[min - padding, max + padding]}
                  tickFormatter={(value) => value.toFixed(4)}
                  width={60}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#737373",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  labelStyle={{
                    color: "#d4d4d4",
                  }}
                  itemStyle={{
                    color: "hsl(71, 92%, 60%)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(71, 92%, 60%)"
                  strokeWidth={2}
                  dot={false}
                  fill="url(#rate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}

export default History;
