import { useEffect, useState } from "react";
import { getHistory } from "../../api/frankfurter";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function History() {
  const [historyData, setHistoryData] = useState([]);

  const chartData = historyData.map((item) => ({
    date: item.date,
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
    <section className="flex flex-col gap-2 justify-center items-center lg:w-200 mx-auto">
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
        <div className="h-96 w-full">
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-neutral-900 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                Open
              </p>
              <p className="text-3xl font-medium">{open.toFixed(4)}</p>
            </div>

            <div className="rounded-xl bg-neutral-900 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                Last
              </p>
              <p className="text-3xl font-medium">{last.toFixed(4)}</p>
            </div>

            <div className="rounded-xl bg-neutral-900 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                Change
              </p>
              <p
                className={`text-3xl font-medium ${
                  change >= 0 ? "text-lime-400" : "text-red-400"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(4)}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-900 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
                % Change
              </p>
              <p
                className={`text-3xl font-medium ${
                  percentChange >= 0 ? "text-lime-400" : "text-red-400"
                }`}
              >
                {percentChange >= 0 ? "▲ +" : "▼ "}
                {percentChange.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="flex rounded-lg bg-neutral-900 p-1">
            {ranges.map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-md px-4 py-2 text-sm transition ${
                  range === item
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[min - padding, max + padding]}
                tickFormatter={(value) => value.toFixed(4)}
              />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(71, 92%, 60%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default History;
