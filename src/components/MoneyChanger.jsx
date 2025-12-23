

export default function MoneyChanger({setCurrency, currency}) {
  const onChangeHandler = (event) =>{
    setCurrency(event.target.value);
  }
  return (
    <select onChange={onChangeHandler} value={currency} className="bg-black">
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
    </select>
  )
}
