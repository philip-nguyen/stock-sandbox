import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Recommend = ({ text, stocks }) => {

    var stockData = [];
    stocks.map((stock) => {
        return stockData.push(stock.symbol);
    });
    // console.log(stockData);

    let json1 = require('../data/secToSym.json');
    var secToSym = new Map(Object.entries(json1));
    let json2 = require('../data/symToSec.json');
    var symToSec = new Map(Object.entries(json2));

    function getSector(symbol, symToSec) {
        var tmp = "" + symbol;
        var stockName = tmp.toUpperCase();
        var section = symToSec.get(stockName);
        return section;
    }
    const stockSet = new Set()
    stockData.map((stock) => {
        return stockSet.add(stock);
    });

    function turnArray(obj) {
        const symbolList = []
        for (var i in obj) {
            symbolList.push(obj[i]);
        }
        return symbolList;
    }

    function getRandomIndex(symbol, symbolList) {
        return Math.floor(Math.random() * symbolList.length);
    }

    //this function take in symbol and return a recommendation
    function getRecommendation(symbol, symToSec, secToSym) {
        var section = getSector(symbol, symToSec);
        if (section == null) {
            section = "Consumer Discretionary";
        }

        const symbolListStr = secToSym.get(section);  //notice symbolListStr["0"]=AAPL the index need to be string
        const symbolList = turnArray(symbolListStr);

        var randomIndex = getRandomIndex(symbol, symbolList);

        return symbolList[randomIndex];
    }

    var displayText = "";

    for (var i = 0; i < Math.min(3, stockData.length); i++) {
        var stock = getRecommendation(stockData[i], symToSec, secToSym)
        displayText += " " + stock;
    }

    return (
        <div>
            <p>{text}</p>
            <p>{displayText}</p>

        </div>
    );
};

export default Recommend;