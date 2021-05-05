import React, { useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import './Dashboard.css';
import { getDailyChartForSymbol } from './StockHistory/ApiConnector';


export function StockSearch(props) {
   
    // const state = {
    //     symbol: '',
    //     investment: 0
    // };
    const [symbol, setSymbol] = useState("");
    //const onClick = useCallback(e => setSymbol(e.target.value), []);
    //this.symbol = this.symbol.bind(this);

    const [investment, setInvestment] = useState(0);


    const onInputChange = (event) => {
        // this.setState({ symbol: event.target.value });
        setSymbol(event.target.value);
        // console.log(event.target.value);
    }

    const onNumChange = (event) => {
        // this.setState({ investment: event.target.value });
        setInvestment(event.target.value)
    }

    const onFormSubmit = (event) => {
        const state = {
            symbol: symbol,
            investment: investment
        };
        event.preventDefault();
        props.onFormSubmit(state);
    }

    const onCheckClick = (event) => {
        console.log(event.target.value);
        // update stock symbol
        //setSymbol
        const newSymbol = document.getElementById("symbolInput").value;
        console.log(newSymbol);
        setSymbol(newSymbol);


        /*
        const fetchStockData = async () => {
            const result = await getDailyChartForSymbol(symbol);
            console.log(result.data);
            //console.log(API_KEY);
          }
          
          fetchStockData();
          */
    }

    const { t } = useTranslation();

    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Label>{t('sym_str')}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control id = "symbolInput" type="text" onChange={onInputChange} placeholder='GME' required />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={onCheckClick}>Check</Button>
                </InputGroup.Append>
            </InputGroup>
            <Form.Label>{t('inv_str')}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control type="number" onChange={onNumChange} placeholder='50' pattern="^\d+(\.|\,)\d{2}$" required />
                <InputGroup.Append>
                    <Form.Control className="btn btn-success" type="submit" value={t('submit_str')} />
                </InputGroup.Append>
            </InputGroup>
            
            
        </Form>
    );
}
export default withTranslation()(StockSearch)
