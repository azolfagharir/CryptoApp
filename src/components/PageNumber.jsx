export default function PageNumber({ setPage, Page }) {
  return (
    <>
      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        className={`rounded-6xl !border-4 text-xl shadow-lg inline mr-4 ${Page == 1 ? "!bg-gray-300" :" !bg-blue-500"}`}
      >Previous</button>
      <button
        onClick={() => setPage(1)} className={`rounded-6xl !border-4 text-xl shadow-lg inline mr-4 ${Page == 1 ? "!bg-blue-700":"!bg-gray-300"}`}
      >1</button>
       <button
        onClick={() => setPage(2)} className={`rounded-6xl !border-4 text-xl shadow-lg inline mr-4 ${Page == 2 ? "!bg-blue-700":"!bg-gray-300"}`}
      >2</button>
         <button
        className={`rounded-6xl !border-4 !bg-blue-700 text-xl shadow-lg inline mr-4 ${Page == 1 || Page == 2 || Page == 9 || Page == 10 ? "invisible" : "visible"  }`}
      >
       {Page}</button>
       <p className={`inline ${Page == 1 || Page == 2 || Page == 9 || Page == 10 ? "visible" : "invisible"} mr-4`}>............</p>
       <button
        onClick={() => setPage(9)} className={`rounded-6xl !border-4 text-xl shadow-lg inline mr-4 ${Page==9 ? "!bg-blue-700" : "!bg-gray-300"}`}
      >9</button>
         <button
        onClick={() => setPage(10)} className={`rounded-6xl !border-4 text-xl shadow-lg inline mr-4  ${Page==10 ? "!bg-blue-700" : "!bg-gray-300"}`}
      >10</button>
      <button
        onClick={() => setPage((prevPage) =>  Math.min(prevPage + 1 , 10))}
        className={`rounded-6xl !border-4 !bg-blue-500 text-xl shadow-lg inline mr-4 ${Page == 10 ? "!bg-gray-300" :" !bg-blue-500"}`}
      >Next</button>
    </>
  );
}
