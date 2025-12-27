import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


export default function Chart({formattedChartData, statisticTyp}) {
  return (
    <div style={{ width: "400px", height:400 }}>
            <ResponsiveContainer>
              <LineChart data={formattedChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis className="w-140" domain={["auto", "auto"]} 
                  tickFormatter={(tick) => {
    if (tick >= 1000000000) {
      return `${(tick / 1000000000).toFixed(2)}B`;
    } else if (tick >= 1000000) {
      return `${(tick / 1000000).toFixed(2)}M`;
    } else if (tick >= 1000) {
      return `${(tick / 1000).toFixed(2)}K`;
    }
    return tick;
  }}
                />
                <Tooltip />
    
                <Line
                  type="monotone"
                  dataKey={statisticTyp}
                  stroke="#22c55e"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            </div>
  )
}
