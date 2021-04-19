import React, { useState } from "react"
import { Card, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import StockSearch from './StockSearch';
import StockList from './StockList';
import InvestmentSankey from './InvestmentSankey';


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [stocks, setStocks] = useState([]);
  // the user's total investment
  const [totalInvestment, setTotalInvestment] = useState(0);


  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function onSymbolSubmit( input ) {
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    // add to total investment
    setTotalInvestment(totalInvestment + parseInt(input.investment));
    console.log(totalInvestment);
    // get time series daily 
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${input.symbol}&outputsize=full&apikey=${API_KEY}`;
          console.log(API_Call);
    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          var d = new Date();
          // month is 0-indexed
          let m = d.getMonth() + 1;
          let month = (m < 10) ? "0"+m.toString() : m.toString();

          // get the latest WEEKDAY
          // could be a little buggy on weekends bc stocks do not have a weekend value
          let date = d.getDate();
          if (d.getDay() === 6) date = date - 1;
          if(d.getDay() === 0) date = date - 2;
          date = (date < 10) ? "0"+date.toString() : date.toString();
          
          let currentDate = d.getFullYear().toString() + "-" + month + "-" + date; 
          console.log(currentDate);
          
          // Verify that the stock symbol is the same
          // console.log(data["Meta Data"]["2. Symbol"]);
          // get the current date's stock open price
          // console.log(currentDate, data["Time Series (Daily)"][currentDate]["1. open"]);
          let newStock = {
            symbol: data["Meta Data"]["2. Symbol"],
            price: data["Time Series (Daily)"][currentDate]["1. open"],
            investment: input.investment
          }
          // TODO: use stock symbol here to use for tableau interface?
          
          // append new Stock to array => this will then UPDATE the props in Stock List
          setStocks(stocks => [...stocks, newStock]);
          
        }
      )
      
  }

  // Callback function to pass to each individual stock in the list.
  // this is sent as a prop to StockList -> StockItem(s)
  function onStockRemove(stock) {
    //updatedStocks = stocks;
    console.log(stock);
    var updatedStocks = stocks.filter(function(s, index, arr) {
      return s.symbol !== stock.symbol;
    });

    console.log(updatedStocks);
    setStocks(updatedStocks);
  }

  function handleSaveStocks(stocks) {
    // TODO: save to firebase
  }

  return (
    <Container>
      <Row>
        <Col>  
            { stocks.length > 0 ? (
              <div id="stock-investor">
                <StockSearch onFormSubmit={onSymbolSubmit} />
                <Button>Save</Button>
                <StockList stocks={stocks} onStockRemove={onStockRemove} />
                <InvestmentSankey stocks={stocks} investment={totalInvestment} />
              </div> ) : (
              <div>
                <StockSearch onFormSubmit={onSymbolSubmit} />
              </div>
              ) }
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Col>
      </Row>
      
      
    </Container>
  )
}
