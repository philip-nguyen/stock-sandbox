import React, { useState } from "react"
import { Card, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import StockSearch from './StockSearch';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [stocks, setStocks] = useState([]);

  

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function onSymbolSubmit( symbol ) {
    const API_KEY = 'OUBE6S10827F8AOA';
    // get time series daily 
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;
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
          let date = (d.getDate() < 10) ? "0"+d.getDate().toString() : d.getDate().toString();
          let currentDate = d.getFullYear().toString() + "-" + month + "-" + date;
          
          // Verify that the stock symbol is the same
          console.log(data["Meta Data"]["2. Symbol"]);
          // get the current date's stock open price
          console.log(currentDate, data["Time Series (Daily)"][currentDate]["1. open"]);
          let newStock = {
            symbol: data["Meta Data"]["2. Symbol"],
            price: data["Time Series (Daily)"][currentDate]["1. open"]
          }
          setStocks(stocks => [...stocks, newStock]);
          //onsole.log(stocks);
          // add to stock investment table
        }
      )
      console.log(stocks);
    // fetch api to python
  }

  return (
    <Container>
      <Row>
        <Col>
          <div id="stock-investor">
            <StockSearch onFormSubmit={onSymbolSubmit} />
          </div>
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
