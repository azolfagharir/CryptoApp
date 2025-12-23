import { use, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import CoinSectionHeader from './components/CoinSectionHeader';
import CoinsSections from './components/CoinsSections';
import PageNumber from './components/PageNumber';
import MoneyChanger from './components/MoneyChanger';
import ShowStatics from './components/ShowStatics';
import Search from './components/Search';




function App() {
const apiKey = import.meta.env.VITE_API_KEY;

  const [show, setShow]= useState(true);
  const [coinsdata, setCoinsData] = useState([]);
  const [Page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const[idStatics, setidStatics] = useState("");
  useEffect(()=>{
    const FetchingData = async ()=>{
    try{
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${Page}&sparkline=false&x_cg_demo_api_key=${apiKey}`);
    const json = await response.json();
    setCoinsData(json);
    }
    catch(error){
      console.log(error.message);
    }
  }
    FetchingData();
  }, [Page, currency])
  return (
    <>
      <Header />
      <CoinSectionHeader />
      {show &&
      <>
      <div className='top-70 absolute w-240 h-25 w-[80%] left-[10%] rounded-3xl'>
  {coinsdata.length === 0 ? (
  <p>Loading...</p>
) : (
  coinsdata.map((item) => (
    <CoinsSections
      key={item.id}
      id={item.id}
      symbol={item.symbol}
      image={item.image}
      price={item.current_price}
      twenyfourh={item.price_change_percentage_24h}
      totalvolume={item.total_volume}
      setShow={setShow}
      show={show}
      setidStatics={setidStatics}
      idStatics={idStatics}
    />
  ))
)}

      </div>     
      <div className='top-180 absolute w-240 h-25 w-[80%] left-[10%] rounded-3xl'>
      <PageNumber  Page={Page} setPage={setPage}/>
      </div>
      <div className='top-40 absolute w-240 h-25 w-[65%] left-0 rounded-3xl'>
      <MoneyChanger  currency={currency} setCurrency={setCurrency}/>
      </div>
      </>
      }
       {!show && <ShowStatics idStatics={idStatics} setShow={setShow} show={show}/>}
      <div className='top-40 absolute w-140 h-25 w-[22%] left-25 rounded-3xl '>
      <Search />
      </div>
    </>
  )
}

export default App
