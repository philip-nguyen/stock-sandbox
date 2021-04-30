import React from 'react';
import StockItem from './StockItem';
import { Table } from 'react-bootstrap'

// stocks and onStockRemove are props passed down from Dashboard
const StockList = ({ stocks, onStockRemove, netGains }) => {
  
  // rendered an array of StockItems (which are table rows)
  // the key could be anything, but setting a key is recommended
  const renderedStocks = stocks.map((stock) => {
    let netGain = 0;
    let dailyOpen = 0;
    netGains.forEach(function (currNet) {
      if(currNet.symbol === stock.symbol) {
        netGain = currNet.netGain;
        dailyOpen = currNet.dailyOpenPrice;
      }
    });
    return (
      <StockItem
        key={stock.symbol}
        stock={stock}
        onStockRemove={onStockRemove}
        dailyOpen={dailyOpen}
        netGain={netGain}
      />
    )
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Stock Symbol</th>
          <th>Price Bought</th>
          <th>Investment</th>
          <th>Date Invested</th>
          <th>Open Price</th>
          <th>Net</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {renderedStocks}
      </tbody>
    </Table>
  )
};

export default StockList;