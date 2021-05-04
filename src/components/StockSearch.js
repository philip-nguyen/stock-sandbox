import React from 'react';
import { Form } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useState } from "react";

function StockSearch(props) {
    // const state = {
    //     symbol: '',
    //     investment: 0
    // };
    const [symbol, setSymbol] = useState("");
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

    const { t } = useTranslation();

    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Label>{t('sym_str')}</Form.Label>
            <Form.Control type="text" onChange={onInputChange} required />
            <Form.Label>{t('inv_str')}</Form.Label>
            <Form.Control type="number" onChange={onNumChange} placeholder='5' pattern="^\d+(\.|\,)\d{2}$" required />
            <Form.Control type="submit" value={t('submit_str')} />
        </Form>
    );
}
export default withTranslation()(StockSearch)
