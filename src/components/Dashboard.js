import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { saveStocksToDB, readStocksFromDB } from '../firebase';
import StockSearch from './StockSearch';
import StockList from './StockList';
import InvestmentSankey from './InvestmentSankey';
import InvestmentPie from './InvestmentPie';
import Tableau from './TableauEmbed.js';
import './Dashboard.css';
import Tabs from './Tabs';
import './Tab.css';
import Recommend from './Recommend';
import Prediction from './Prediction';
import { useTranslation } from 'react-i18next';
import Chart from './StockHistory/Chart.js';

import styled from 'styled-components';
import { Modal } from './Modal';

export default function Dashboard() {
  const { t } = useTranslation();

  //for modal
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  //end for modal

  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [stocks, setStocks] = useState([]);

  // the user's total investment
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [netGains, setNetGains] = useState([]);

  // for checking a certain stock's history
  const [stockSymbolForHistory, setStockSymbolForHistory] = useState('');

  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  //setStocks(readStocksFromDB(currentUser));

  useEffect(() => {
    readStocksFromDB(currentUser, onDataRead);
  }, []); // empty array runs useEffect only once

  // callback function for when the data loads on backend
  const onDataRead = (items) => {
    let stocks = [];
    let s = items.stocks;

    s.forEach((item) => {
      setTotalInvestment(totalInvestment + parseInt(item.investment));
      console.log(totalInvestment);
      stocks.push({
        symbol: item.symbol,
        price: item.price,
        investment: item.investment,
        date: item.date,
      });
      console.log(item.symbol);
      getStockOpen(item.symbol);
    });
    setStocks(stocks);
  };

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  async function onSymbolSubmit(input) {
    // normalize all symbols to upper case
    var symbol = input.symbol.toUpperCase();
    // add to total investment
    setTotalInvestment(totalInvestment + parseInt(input.investment));

    // get time series daily
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;
    console.log(API_Call);
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let currentDate = getCurrentWeekday();
        let timeSeries = data['Time Series (Daily)'];
        let openPrice = Object.keys(timeSeries).reduce(function (a, b) {
          return timeSeries[a] > timeSeries[b] ? b : a;
        });
        console.log(openPrice);

        // Verify that the stock symbol is the same
        // get the current date's stock open price
        console.log(currentDate, data['Time Series (Daily)'][openPrice]);
        let newStock = {
          symbol: data['Meta Data']['2. Symbol'],
          price: data['Time Series (Daily)'][openPrice]['1. open'],
          investment: input.investment,
          date: currentDate,
        };
        // TODO: use stock symbol here to use for tableau interface?

        // append new Stock to array => this will then UPDATE the props in Stock List
        setStocks((stocks) => [...stocks, newStock]);
      });
  }

  function getStockOpen(stock) {
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${API_KEY}`;
    //console.log(API_Call);

    // check for session storage currentWeekday
    // if present, get the current open price
    if (isInSessionStorage()) {
      let newOpenPrice = {
        symbol: stock,
        dailyOpenPrice: sessionStorage.getItem(stock),
      };

      setNetGains((netGains) => [...netGains, newOpenPrice]);
    }
    // if not the same, then fetch results
    else {
      fetch(API_Call)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //console.log("getStockOpen():",data)
          let timeSeries = data['Time Series (Daily)'];
          //console.log(timeSeries);
          let latestDate = Object.keys(timeSeries).reduce(function (a, b) {
            return timeSeries[a] > timeSeries[b] ? b : a;
          });

          let openPrice = timeSeries[latestDate];
          console.log(openPrice);
          // session store today's date
          sessionStorage.setItem('currentDate', latestDate);

          // store using session storage for each stock open price
          sessionStorage.setItem(stock, openPrice['1. open']);

          let newOpenPrice = {
            symbol: stock,
            dailyOpenPrice: openPrice['1. open'],
          };

          // console.log(newOpenPrice);
          setNetGains((netGains) => [...netGains, newOpenPrice]);
        });
    }
  }

  // check session storage if the daily stock opens are present
  function isInSessionStorage() {
    let stocksPresent = true;
    if (getCurrentWeekday() === sessionStorage.getItem('currentDate')) {
      stocks.forEach(function (currStock) {
        if (sessionStorage.getItem(currStock.symbol) === null)
          stocksPresent = false;
      });
    } else stocksPresent = false;
    return stocksPresent;
  }

  // Callback function to pass to each individual stock in the list.
  // this is sent as a prop to StockList -> StockItem(s)
  function onStockRemove(stock) {
    //updatedStocks = stocks;
    console.log(stock);
    var updatedStocks = stocks.filter(function (s, index, arr) {
      return s.symbol !== stock.symbol;
    });

    console.log(updatedStocks);
    setStocks(updatedStocks);
  }

  function getCurrentWeekday() {
    var d = new Date();
    // month is 0-indexed
    let m = d.getMonth() + 1;
    let month = m < 10 ? '0' + m.toString() : m.toString();

    // get the latest WEEKDAY
    // could be a little buggy on weekends bc stocks do not have a weekend value
    let date = d.getDate();
    if (d.getDay() === 6) date = date - 1;
    if (d.getDay() === 0) date = date - 2;
    date = date < 10 ? '0' + date.toString() : date.toString();

    return d.getFullYear().toString() + '-' + month + '-' + date;
  }

  // callback function for stock history
  function checkStockHistory(stockSymbol) {
    setStockSymbolForHistory(stockSymbol);
  }

  return (
    <Container fluid>
      {/* <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        stockSymbolForHistory={stockSymbolForHistory}
      /> */}
      {!showModal && (
        <Row>
          <Tabs>
            <div label={t('stock_str')}>
              <Row>
                <Col mdPush={4} md={8}>
                  {/* Chart needs a prop to pass from StockSearch -> Dashboard -> Chart 
                    Also if the stockSymbol is still not set, then show nothing */}
                  {stockSymbolForHistory === '' ? null : (
                    <Chart stockSymbol={stockSymbolForHistory} />
                  )}
                  {stocks.length > 0 ? (
                    <div id="stock-investor">
                      <StockSearch
                        onFormSubmit={onSymbolSubmit}
                        checkStock={checkStockHistory}
                      />
                      <Button
                        className="button-save"
                        onClick={() => saveStocksToDB(currentUser, stocks)}
                      >
                        {t('save_str')}
                      </Button>
                      <Button className="button-save" onClick={openModal}>
                        modal
                      </Button>
                      <StockList
                        stocks={stocks}
                        onStockRemove={onStockRemove}
                        netGains={netGains}
                      />
                      <InvestmentSankey
                        stocks={stocks}
                        investment={totalInvestment}
                      />
                    </div>
                  ) : (
                    <div>
                      <StockSearch onFormSubmit={onSymbolSubmit} />
                    </div>
                  )}
                </Col>
                <Col md={4}>
                  <Recommend
                    text={stocks.length > 0 ? t('base_str') : ''}
                    stocks={stocks}
                  />
                  <Card>
                    <Card.Body>
                      <h2 className="text-center mb-4">{t('profile_str')}</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <strong>{t('email_str')}: </strong> {currentUser.email}
                      <Link
                        to="/update-profile"
                        className="btn btn-primary w-100 mt-3"
                      >
                        {t('update_profile_str')}
                      </Link>
                    </Card.Body>
                  </Card>
                  <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>
                      {t('logout_str')}
                    </Button>
                  </div>
                  <div>
                    <InvestmentPie stocks={stocks} />
                  </div>
                </Col>
              </Row>
            </div>

            <div label={t('news_str')}>
              <Row>
                <Tableau
                  style="width: 500px; height: 500px;"
                  id="dow"
                ></Tableau>
              </Row>
            </div>

            <div label={t('predict_str')}>
              <Row>
                <Col>
                  <Prediction />
                </Col>
                <Col md={4}>
                  <Recommend
                    stocks={stocks}
                    text={stocks.length > 0 ? t('base_str') : ''}
                  />
                  <Card>
                    <Card.Body>
                      <h2 className="text-center mb-4">{t('profile_str')}</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <strong>{t('email_str')}:</strong> {currentUser.email}
                      <Link
                        to="/update-profile"
                        className="btn btn-primary w-100 mt-3"
                      >
                        {t('update_profile_str')}
                      </Link>
                    </Card.Body>
                  </Card>
                  <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>
                      {t('logout_str')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Tabs>
        </Row>
      )}
    </Container>
  );
}
