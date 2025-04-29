import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from './Spinner';

const stocksToFetch = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const Dashboard = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStocks() {
            try {
                const allResults = await Promise.all(
                    stocksToFetch.map(async (symbol) => {
                        const response = await axios.get('https://finnhub.io/api/v1/quote', {
                            params: {
                                symbol: symbol,
                                token: API_KEY
                            }
                        });
                        return { symbol, ...response.data }
                    })
                )
                setStocks(allResults);
            } catch (err) {
                console.error(err);
                setError('Failed to load stock data')
            } finally {
                setLoading(false);
            }
        }

        fetchStocks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600">Loading stocks...</p>

                <Spinner />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>
    }

    return (
        <div className="overflow-x-auto">
            {/* table headers */}
            <table className="table-auto w-full bg-white rounded shadow border">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Change %</th>
                    </tr>
                </thead>
                {/* table rows */}
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.symbol} className="text-center border-b hover:bg-gray-200">
                            <td className="px-4 py-2 font-semibold">{stock.symbol}</td>
                            <td className="px-4 py-2">{stock.c.toFixed(2)}</td>
                            <td className="px-4 py-2">
                                <span className={stock.dp >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {stock.dp.toFixed(2)}
                                </span>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;