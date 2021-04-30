import React from 'react';
import {Button } from 'react-bootstrap';

const StockTable = ({ stock, onStockRemove, dailyOpen, netGain }) => {
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>${parseFloat(stock.price).toFixed(2)}</td>
      <td>${parseFloat(stock.investment).toFixed(2)}</td>
      <td>{stock.date}</td>
      <td>${parseFloat(dailyOpen).toFixed(2)}</td>
      <td class={ parseFloat(netGain) >= 0 ? "text-success" : "text-danger"} >${netGain}</td>
      <td><Button onClick={() => onStockRemove(stock)}>Remove</Button></td>
    </tr>
  )
};

export default StockTable;