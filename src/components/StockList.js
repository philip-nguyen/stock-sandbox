import React from 'react';
import StockItem from './StockItem';
import { Table } from 'react-bootstrap'

// stocks and onStockRemove are props passed down from Dashboard
const StockList = ({ stocks, onStockRemove }) => {
  
  // rendered an array of StockItems (which are table rows)
  const renderedStocks = stocks.map((stock) => {
    return (
      <StockItem
        key={stock.symbol}
        stock={stock}
        onStockRemove={onStockRemove}
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