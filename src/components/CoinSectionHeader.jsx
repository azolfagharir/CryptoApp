   
   
   export default function CoinSectionHeader({children}) {
     return (
   <div className='top-50 absolute w-240 h-25 w-[80%] left-[10%] rounded-3xl'>
          <div className='flex justify-between w-full'>
            <h2 className=''>coin</h2>
            <h2 className=''>name</h2>
            <h2 className=''>price</h2>
            <h2 className=''>24h</h2>
            <h2 className=''>total volume</h2>
            <h2 className=''>n/p</h2>
          </div>
          <hr />
          {children}
       </div>     
       )
   }
   
