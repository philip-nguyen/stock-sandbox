import React from 'react';
import { Form } from 'react-bootstrap';

class Prediction extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            symbol: ''
        }
    }


    onInputChange = (event) => {
        this.setState({
            symbol: event.target.value
        });
        // console.log(event.target.value);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        var result = document.getElementById("mySelect").value;
        var image = document.getElementById("imageid");
        var source = "";

        var symbol = result.toUpperCase();
        var filePath = window.location.origin + "/image/" + symbol + ".png";

        image.src = filePath;
        var text = "The prediction of ";
        text += result + ": "
        var textBox = document.getElementById("resultText");
        textBox.innerHTML = text;
        textBox.style.visibility = "visible";
    }

    render() {

        return (
            <form onSubmit={this.onFormSubmit}>
                <p>Please Select the Stock that you would like to predict</p>
                <div>
                    <select
                        style={{ margin: "10px" }} id="mySelect" >
                        <option value="AAPL"> AAPL </option>
                        <option value="AMG"> AMG </option>
                        <option value="AMZN"> AMZN </option>
                        <option value="AXP"> AXP </option>
                        <option value="BA"> BA </option>
                        <option value="CAT"> CAT </option>
                        <option value="CRM"> CRM </option>
                        <option value="CSCO"> CSCO </option>
                        <option value="CVX"> CVX </option>
                        <option value="DIS"> DIS </option>
                        <option value="DOW"> DOW </option>
                        <option value="GS"> GS </option>
                        <option value="GME"> GME </option>
                        <option value="GOOGL"> GOOGL </option>
                        <option value="HON"> HON </option>
                        <option value="IBM"> IBM </option>
                        <option value="INTC"> INTC </option>
                        <option value="JNJ"> JNJ </option>
                        <option value="KO"> KO </option>
                        <option value="JPM"> JPM </option>
                        <option value="MCD"> MCD </option>
                        <option value="MMM"> MMM </option>
                        <option value="MSFT"> MSFT </option>
                        <option value="NKE"> NKE </option>
                        <option value="PG"> PG </option>
                        <option value="SPOT"> SPOT </option>
                        <option value="TRV"> TRV </option>
                        <option value="TSLA"> TSLA </option>
                        <option value="UNH"> UNH </option>
                        <option value="CRM"> CRM </option>
                        <option value="VZ"> VZ </option>
                        <option value="V"> V </option>
                        <option value="WBA"> WBA </option>
                        <option value="WMT"> WMT </option>
                    </select>
                </div>
                <input type="submit" value="Submit" style={{ margin: "10px" }} onClick={this.clickSubmit}></input>
                <div>
                    <label type="text" value="text" id="resultText" style={{ margin: "10px" }}></label>
                </div>
                <div>
                    <img
                        src="https://miro.medium.com/max/6400/1*uxPIG28daFbS47aZ4YOV0A.jpeg"
                        alt="new" width="700px"
                        height="400px"
                        id="imageid"
                    />
                </div>

            </form>

        );
    }
}
export default Prediction;