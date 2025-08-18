import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [rows, setRows] = useState( Array.from({ length: 29 }, (_, i) => ({
    id: i + 1,
    item_name: '',
    amount: 1,
    cost: 1,
  })));

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length++, item_name: '', amount: 1, cost: 1 }
    ]);
  };

  const searchAPI = (e) => {
    //e.target.value
  }
  
  return (
    <>
      <div className='min-w-xs max-h-screen m-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-6xl'>Póke Profit Tracker</h1>
          <button className='border rounded-full p-2 h-1/2' type="button" onClick={() => addRow()}>Add a Row</button>
        </div>
        <table className="table-auto w-full text-sm border text-center">
          <thead className='border'>
            <tr>
              <th className='border'>Image</th>
              <th className='border'>Product Name</th>
              <th className='border'>Amount</th>
              <th className='border'>Cost Per Item</th>
              <th className='border'>Total Cost</th>
              <th className='border'>Market Price Per Item</th>
              <th className='border'>Total Market Price</th>
              <th className='border'>Max Possible Profit Per Item</th>
              <th className='border'>Total Max Possible Profit</th>
            </tr>
          </thead>
          <tbody>

          {rows.map((row, i) => {
            const costPerItem = row.cost / row.amount;
            const market = 20 * row.amount; 
            const profitPerItemMax = 20 - costPerItem;
            const profitMax = market - row.cost;
            
            return (
              <tr key={row.id}>
                <td className='border'>bleh</td>
                <td className='border'><input type="text" value={row.item_name} onChange={(e) => updateRow(i, 'item_name', e.target.value)}/></td>
                <td className='border'> <input type='number'min={1} value={row.amount}  onChange={(e) => updateRow(i, 'amount', e.target.value)}/></td>
                <td className='border'>${costPerItem.toFixed(2)}</td>
                <td className='border'>$<input type='number'min={1}  value={row.cost} onChange={(e) => updateRow(i, 'cost', Number(e.target.value))}/></td>
                <td className='border'>$20</td>
                <td className='border'>${market.toFixed(2)}</td>
                <td className='border'>${profitPerItemMax.toFixed(2)}</td>
                <td className='border'>${profitMax.toFixed(2)}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
