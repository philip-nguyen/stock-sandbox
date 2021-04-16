import React from 'react';
import { Form, Button } from 'react-bootstrap';

class StockSearch extends React.Component {
    state = { symbol: '' };

    onInputChange = (event) => {
        this.setState({ symbol: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.term);
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Label>Stock Symbol</Form.Label>
                <Form.Control type="text" required />
                <Form.Label>Investment ($)</Form.Label>
                <Form.Control type="number" placeholder='5' pattern="^\d+(\.|\,)\d{2}$" required /> 
            </Form>
        );
    }
}
export default StockSearch;