import React from 'react';
import Chart from 'react-google-charts';
// need to install google charts

const InvestmentSankey = ({ investment, stocks }) => {

  const data = [['Investment', 'To', '$']];
  stocks.map((stock) => {
    return data.push(['', stock.symbol, parseInt(stock.investment)]);
  });

  return (
    <div>
      <Chart 
        width={600}
        height={'400px'}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={data}
        rootProp={{ 'data-testid': '1' }}
      />
    </div>
    
  )
}

export default InvestmentSankey;