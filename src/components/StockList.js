import React from 'react';
import StockItem from './StockItem';
import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';


// stocks and onStockRemove are props passed down from Dashboard
const StockList = ({ stocks, onStockRemove, netGains }) => {
  const { t } = useTranslation();

  // rendered an array of StockItems (which are table rows)
  // the key could be anything, but setting a key is recommended
  const renderedStocks = stocks.map((stock) => {
    let netGain = 0;
    let dailyOpen = 0;
    netGains.forEach(function (currNet) {
      if (currNet.symbol === stock.symbol) {
        //netGain = currNet.netGain;
        dailyOpen = currNet.dailyOpenPrice;
        let net = (parseFloat(stock.investment) / parseFloat(stock.price)) * parseFloat(currNet.dailyOpenPrice);
        netGain = (net - parseFloat(stock.investment)).toFixed(2);
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
          <th>{t('sym_str')}</th>
          <th>{t('price_bought_str')}</th>
          <th>{t('investment_str')}</th>
          <th>{t('date_invested_str')}</th>
          <th>{t('open_price_str')}</th>
          <th>{t('net_str')}</th>
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