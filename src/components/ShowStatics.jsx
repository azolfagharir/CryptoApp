import { useState, useEffect } from "react";
import closeIcon from "E:/frontend/CryptoApp/public/close-icon.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";




export default function ShowStatics({ idStatics, setShow, show}) {
  const [eachcoin, setEachCoin] = useState([]);  
  const [chartData, setChartData] = useState({ prices: [], market_cap: [], total_volumes: [] });
  const [statisticTyp, setStatisticType] = useState("prices");
const formattedChartData = chartData.prices.map((item, index) => ({
  date: new Date(item[0]).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }),
  prices: item[1],
  market_cap: chartData.market_cap[index]?.[1],
  total_volumes: chartData.total_volumes[index]?.[1],
}));

  useEffect(() => {
    const FetchingData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics}`);
        const json = await response.json();
        setEachCoin(json);  
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics}/market_chart?vs_currency=usd&days=7`);
        const chartData = await chartResponse.json();
        setChartData({
          prices: chartData.prices,
          market_cap: chartData.market_caps,
          total_volumes: chartData.total_volumes,
        });  
      } catch (error) {
        console.log(error.message);
      }
    };
    FetchingData();
  }, [idStatics]);

  return (
  eachcoin?.id ? (
    <div>
      <h1>{eachcoin.name} ({eachcoin.symbol && eachcoin.symbol.toUpperCase() })</h1>
      <img src={eachcoin.image?.small} alt={eachcoin.id} />

      <div>
        <div style={{ width: "400px", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={formattedChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
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
        <button className="!bg-black " onClick={() => setStatisticType("prices")}>prices</button>
        <button className="!bg-black " onClick={() => setStatisticType("market_cap")}>market cap</button>
        <button className="!bg-black " onClick={() => setStatisticType("total_volumes")}>total volumes</button>
      </div>
      <button className="!bg-transparent" onClick={() => { setShow(!show); }}>
        <img src={closeIcon} alt="close" />
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  )
);

}
