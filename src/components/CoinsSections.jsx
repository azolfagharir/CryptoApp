import React, { useState } from 'react'
import chartdown from "/chart-down.svg"
import chartUpp from "/chart-up.svg"
import ShowStatics from './ShowStatics';



export default function CoinsSections({id,symbol, image, price, 
  twenyfourh, totalvolume, show, setShow, setidStatics, idStatics}) {
      const imageHandler = ()=>{
        setShow(!show);
        setidStatics(id)
      }  
      return (
        <>
          <div className='flex justify-between w-full  items-start'>
            <div className='flex items-center'>
              <img onClick={imageHandler} className='w-8 mr-4' src={image} /> 
              <h2>{symbol}</h2>
            </div>
            <h2>{id}</h2>
            <h2>${price.toLocaleString()}</h2>
            <h2 className={`${twenyfourh > 0 ? "text-green-700":"text-red-700"}`}>{twenyfourh.toFixed(2)}%</h2>
            <h2>{totalvolume}</h2>
            {twenyfourh > 0 ? <img src={chartUpp} alt={chartUpp}/> :  <img src={chartdown} alt={chartdown} />}
          </div>
        </>
       )
}
