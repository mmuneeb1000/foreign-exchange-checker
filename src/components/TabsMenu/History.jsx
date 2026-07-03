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

  const range = max - min;
  const padding = Math.max(range * 0.1, 0.001);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError(null);
        const data = await getHistory({
          from: "2026-06-01",
          to: "2026-07-01",
          base: "USD",
          quotes: "EUR",
        });

        setHistoryData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <section className="flex flex-col gap-2 justify-center items-center lg:w-100 mx-auto">
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
