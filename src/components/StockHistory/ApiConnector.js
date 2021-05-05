import axios from 'axios';
import localForage from 'localforage';
import { setupCache } from 'axios-cache-adapter';


const cache = setupCache({
    maxAge: 60 * 60 * 1000,
    store: localForage,
    exclude: {
        query: false
    }
});

const axiosInstance = axios.create({
    baseURL: 'https://www.alphavantage.co/query',
    adapter: cache.adapter
});

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


export const getDailyChartForSymbol = (symbol) => {
    return axiosInstance.get('', {
        params: {
            // Fetch daily chart
            function: 'TIME_SERIES_DAILY',
            symbol,
            apikey: 'OUBE6S10827F8AOA'
        }
    })
};