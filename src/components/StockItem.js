import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const StockItem = ({ stock, onStockRemove, dailyOpen, netGain }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>${parseFloat(stock.price).toFixed(2)}</td>
      <td>${parseFloat(stock.investment).toFixed(2)}</td>
      <td>{stock.date}</td>
      <td>${parseFloat(dailyOpen).toFixed(2)}</td>
      <td className={parseFloat(netGain) >= 0 ? "text-success" : "text-danger"} >${netGain}</td>
      <td><Button onClick={() => onStockRemove(stock)}>{t('remove_str')}</Button></td>
    </tr>
  )
};

export default StockItem;