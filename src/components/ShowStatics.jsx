import { useState, useEffect } from "react";
import closeIcon from "E:/frontend/CryptoApp/public/close-icon.png";

import Chart from "./Chart";


export default function ShowStatics({ idStatics, setShow, show }) {
    const getCurrentTotalVolume = () => {
    return chartData.market_cap && chartData.market_cap.length > 0
      ? chartData.market_cap[0][1]  
      : 0;
  };
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
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics.id}`);
        const json = await response.json();
        setEachCoin(json);  
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics.id}/market_chart?vs_currency=usd&days=7`);
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
  }, [idStatics.id]);

  return (
  eachcoin?.id ? (
    <div>
      <h1>{eachcoin.name} ({eachcoin.symbol && eachcoin.symbol.toUpperCase() })</h1>
      <img src={eachcoin.image?.small} alt={eachcoin.id} />

      <div>
        <Chart  formattedChartData={formattedChartData} statisticTyp={statisticTyp}/>
        <button className="!bg-black " onClick={() => setStatisticType("prices")}>prices</button>
        <button className="!bg-black " onClick={() => setStatisticType("market_cap")}>market cap</button>
        <button className="!bg-black " onClick={() => setStatisticType("total_volumes")}>total volumes</button>
      </div>
      <div>
        
        <p className="text-blue-700">Price:<span className="text-white">{idStatics.price}</span></p>
        <p className="text-blue-700">ATH:<span className="text-white">{idStatics.twenyfourh}</span></p>
        <p className="text-blue-700">market cap:<span className="text-white">{getCurrentTotalVolume()}</span></p>
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
