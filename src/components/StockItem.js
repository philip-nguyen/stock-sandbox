import React from 'react';
import {Button } from 'react-bootstrap';

const StockTable = ({ stock, onStockRemove }) => {
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>{stock.price}</td>
      <td>{stock.investment}</td>
      <td><Button onClick={() => onStockRemove(stock)}>Remove</Button></td>
    </tr>
  )
};

export default StockTable;