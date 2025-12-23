import { useState, useEffect } from "react";
import closeIcon from "E:/frontend/CryptoApp/public/close-icon.png";


export default function ShowStatics({ idStatics, setShow, show}) {
  const [eachcoin, setEachCoin] = useState([]);  
  const [chartData, setChartData] = useState({ prices: [], market_cap: [], total_volumes: [] });

  useEffect(() => {
    const FetchingData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics}`);
        const json = await response.json();
        setEachCoin(json); // Set the fetched data
        {/*const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${idStatics}/market_chart?vs_currency=usd&days=7`);
        const chartData = await chartResponse.json();
 setChartData({
          prices: chartData.prices,
          market_cap: chartData.market_caps,
          total_volumes: chartData.total_volumes,
        });  */}    
      } catch (error) {
        console.log(error.message);
      }
    };
    FetchingData();
  }, [idStatics]);

  return (
  eachcoin ? (
    <div>
      <h1>{eachcoin.name} ({eachcoin.symbol && eachcoin.symbol.toUpperCase() })</h1>
      <img src={eachcoin.image?.small} alt={eachcoin.id} />

      <div>
        <p><strong>Price:</strong> ${eachcoin.market_data?.current_price?.usd}</p>
        <p><strong>Market Cap:</strong> ${eachcoin.market_data?.market_cap?.usd}</p>
        <p><strong>Total Volume:</strong> ${eachcoin.market_data?.total_volume?.usd}</p>
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
