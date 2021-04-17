import React from 'react';
import { Form } from 'react-bootstrap';

class StockSearch extends React.Component {
    state = { symbol: '' };

    onInputChange = (event) => {
        this.setState({ symbol: event.target.value });
        // console.log(event.target.value);
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.symbol);
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Label>Stock Symbol</Form.Label>
                <Form.Control type="text" onChange={this.onInputChange} required />
                <Form.Label>Investment ($)</Form.Label>
                <Form.Control type="number" placeholder='5' pattern="^\d+(\.|\,)\d{2}$" required /> 
                <Form.Control type="submit" />
            </Form>
        );
    }
}
export default StockSearch;