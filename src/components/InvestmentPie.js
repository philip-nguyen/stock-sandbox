import React from 'react';
import Chart from 'react-google-charts';
// need to install google charts

const InvestmentPie = ({ stocks }) => {

  const data = [['Symbol', '$']];
  stocks.map((stock) => {
    return data.push([stock.symbol, parseInt(stock.investment)]);
  });

  return (
    <div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Pie Chart</div>}
        data={data}
        options={{
            title: 'Investments'
        }}
        rootProp={{ 'data-testid': '1' }}
      />
    </div>

  )
}

export default InvestmentPie;