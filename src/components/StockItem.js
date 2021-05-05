import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Dashboard.css';

const StockItem = ({ stock, onStockRemove, dailyOpen, netGain }) => {
  const { t } = useTranslation();
  const zero = 0;
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td className="price">${parseFloat(stock.price).toFixed(2)}</td>
      <td className="price">${parseFloat(stock.investment).toFixed(2)}</td>
      <td>{stock.date}</td>
      <td className="price">${dailyOpen ? parseFloat(dailyOpen).toFixed(2) : parseFloat(stock.price).toFixed(2)}</td>
      <td className={parseFloat(netGain) >= 0 ? "price text-success" : "price text-danger"} >${netGain ? netGain : zero.toFixed(2)}</td>
      <td><Button onClick={() => onStockRemove(stock)}>{t('remove_str')}</Button></td>
    </tr>
  )
};

export default StockItem;