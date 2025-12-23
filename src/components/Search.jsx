import { useEffect, useState } from "react";

export default function Search() {
  const [CoinsName, setCoinsName] = useState([]);  
  const [searched, setSearched] = useState("");  
  const [showSearched, setShowSearched] = useState(false); 
  const onchangeHandler = (event) => {
    const value = event.target.value;
    setSearched(value);

    if (value === "") {
      setShowSearched(false);
    } else {
      setShowSearched(true);
    }
  };
  useEffect(() => {
    const fetchCoinNames = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`
        );
        const json = await response.json();
        setCoinsName(json); // ذخیره داده‌ها در state
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCoinNames();
  }, []); 
  const filteredCoins = CoinsName.filter((coin) =>
    coin.name.toLowerCase().startsWith(searched.toLowerCase())
  );
  return (
    <>
      <input
        className="border-2 rounded-2xl w-60"
        placeholder="search"
        onChange={onchangeHandler}
        type="text"
        value={searched}
      />
      {showSearched && (
        <div className="bg-gray-800 absolute rounded left-12 rounded-4xl">
          {filteredCoins.map((item, index) => (
            <div className="flex item-center mb-4">
                <img className="w-4 mr-4" key={index} src={item.image} alt={item.name} />
                <p key={index+400}>{item.name}</p> 
            </div>
          ))}
        </div>
      )}
    </>
  );
}
