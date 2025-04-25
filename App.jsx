import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./App.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, } from 'recharts';
import { createChart, LineStyle, CrosshairMode } from 'lightweight-charts';

// Chart components for candlestick and volumetrend charts
function CandlestickChart({ data }) {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                crosshair: {
                    mode: CrosshairMode.Normal,
                },
                rightPriceScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
                timeScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                    timeVisible: true,
                    secondsVisible: false,
                },
                layout: {
                    backgroundColor: '#232a38',
                    textColor: 'rgba(255, 255, 255, 0.9)',
                }
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: 'rgba(0, 200, 0, 0.8)',
                downColor: 'rgba(220, 50, 50, 0.8)',
                borderVisible: false,
                wickUpColor: 'rgba(0, 200, 0, 0.8)',
                wickDownColor: 'rgba(220, 50, 50, 0.8)',
            });

            candlestickSeries.setData(data.map(item => ({
                time: item.date,
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close
            })));

            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        }
    }, [data]);

    return <div className="candlestick-chart-container" ref={chartContainerRef} />;
}

function VolumeTrendChart({ data }) {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                crosshair: {
                    mode: CrosshairMode.Normal,
                },
                rightPriceScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                },
                timeScale: {
                    borderColor: 'rgba(197, 203, 206, 0.8)',
                    timeVisible: true,
                    secondsVisible: false,
                },
                layout: {
                    backgroundColor: '#232a38',
                    textColor: 'rgba(255, 255, 255, 0.9)',
                }
            });

            const volumeSeries = chart.addLineSeries({
                color: 'rgba(22, 119, 255, 0.8)',
                lineWidth: 1,
                lineStyle: LineStyle.Solid,
            });

            volumeSeries.setData(data.map(item => ({
                time: item.date,
                value: item.volume,
            })));

            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        }
    }, [data]);

    return <div className="volume-chart-container" ref={chartContainerRef} />;
}

// Component for ownership
function OwnershipChart({ data }) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];  // Blue, Green, Orange

    if (!data) {
        return <div className="text-center">Loading Ownership Data...</div>;
    }

    const chartData = [
        { name: 'Institutions', value: data.institutions },
        { name: 'Retail', value: data.retail },
        { name: 'Insiders', value: data.insiders },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {
                        chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

// Component to show recommendation data in piechart
function RecommendationsChart({ recommendations }) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];  // Example colors

    const data = [
        { name: 'Strong Buy', value: recommendations.strongBuy },
        { name: 'Buy', value: recommendations.buy },
        { name: 'Hold', value: recommendations.hold },
        { name: 'Sell', value: recommendations.sell },
        { name: 'Strong Sell', value: recommendations.strongSell },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

const newsItems = [
    "Apple launches new product lineup, shares surge.",
    "Q2 earnings beat analyst expectations.",
    "Apple announces dividend increase.",
    "Supply chain concerns ease for Apple.",
    "New iOS update receives positive reviews.",
];

const peers = [
    { name: "MSFT", price: 320, change: "+1.2%" },
    { name: "GOOGL", price: 2800, change: "-0.5%" },
    { name: "AMZN", price: 3400, change: "+0.8%" },
    { name: "TSLA", price: 900, change: "+2.0%" },
    { name: "META", price: 350, change: "-1.1%" },
];

// Sample chart data
const lineChartData = [
    { name: 'Day 1', value: 150 },
    { name: 'Day 2', value: 152 },
    { name: 'Day 3', value: 155 },
    { name: 'Day 4', value: 153 },
    { name: 'Day 5', value: 156 },
];

const barChartData = [
    { name: 'Q1', value: 4000 },
    { name: 'Q2', value: 3000 },
    { name: 'Q3', value: 2000 },
    { name: 'Q4', value: 2780 },
];

const pieChartData = [
    { name: 'Strong Buy', value: 40 },
    { name: 'Buy', value: 30 },
    { name: 'Hold', value: 20 },
    { name: 'Sell', value: 10 },
];

const pieChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
    const [stockPrice, setStockPrice] = useState(null);  // Change to null
    const [priceChange, setPriceChange] = useState(null); // Change to null
    const [priceChangePercent, setPriceChangePercent] = useState(null); // Change to null
    const [candlestickData, setCandlestickData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);
    const [ownershipData, setOwnershipData] = useState(null);
    const [recommendations, setRecommendations] = useState({
        strongBuy: 0,
        buy: 0,
        hold: 0,
        sell: 0,
        strongSell: 0,
    });
    const [loading, setLoading] = useState(true);  // add a loading state


    // PASTE YOUR API KEY HERE:
    const apiKey = 'CTTFEXTRZPDN5PFW';
    const symbol = 'AAPL';

    useEffect(() => {
        const fetchStockPrice = async () => {
            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
                const data = response.data['Global Quote'];

                if (data && Object.keys(data).length > 0) {
                    const currentPrice = parseFloat(data['05. price']);
                    const change = parseFloat(data['09. change']);
                    const changePercent = parseFloat(data['10. change percent'].slice(0, -1));

                    setStockPrice(currentPrice);
                    setPriceChange(change);
                    setPriceChangePercent(changePercent);
                } else {
                    console.warn("No stock data received from Alpha Vantage");
                    setStockPrice(0);
                    setPriceChange(0);
                    setPriceChangePercent(0);
                }
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        const fetchCandlestickData = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
                );

                const timeSeriesDaily = response.data['Time Series (Daily)'];
                if (timeSeriesDaily) {
                    const data = Object.entries(timeSeriesDaily).map(([date, values]) => ({
                        date,
                        open: parseFloat(values['1. open']),
                        high: parseFloat(values['2. high']),
                        low: parseFloat(values['3. low']),
                        close: parseFloat(values['4. close']),
                        volume: parseFloat(values['5. volume']),
                    })).reverse();  // Reversing to get chronological order

                    setCandlestickData(data);
                }
            } catch (error) {
                console.error("Error fetching candlestick data:", error);
            }
        };
        const fetchVolumeData = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
                );

                const timeSeriesDaily = response.data['Time Series (Daily)'];
                if (timeSeriesDaily) {
                    const data = Object.entries(timeSeriesDaily).map(([date, values]) => ({
                        date,
                        volume: parseFloat(values['5. volume']),
                    })).reverse();  // Reversing to get chronological order
                    setVolumeData(data);
                }
            } catch (error) {
                console.error("Error fetching volume data:", error);
            }
        };
        const fetchOwnershipData = async () => {
            try {
                // This is just a placeholder since Alpha Vantage does not provide direct ownership data.
                // To get real ownership data, you would need to use a different API or data source.
                // Here, I'm simulating the ownership data for demonstration purposes.
                const simulatedOwnershipData = {
                    institutions: 60,
                    retail: 30,
                    insiders: 10,
                };
                setOwnershipData(simulatedOwnershipData);
            } catch (error) {
                console.error("Error fetching ownership data:", error);
            }
        };
        const fetchRecommendations = async () => {
            try {
                // Again, this is a simulated data retrieval. Replace with a real data source if you have one.
                const simulatedRecommendations = {
                    strongBuy: 15,
                    buy: 10,
                    hold: 5,
                    sell: 2,
                    strongSell: 1,
                };
                setRecommendations(simulatedRecommendations);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoading(false);  // set loading to false once all data are fetched
            }
        };

        fetchStockPrice();
        fetchCandlestickData();
        fetchVolumeData();
        fetchOwnershipData();
        fetchRecommendations();

        const intervalId = setInterval(fetchStockPrice, 15000);
        return () => clearInterval(intervalId);
    }, [apiKey, symbol]);

    return (
        <div className="dashboard-container">
            {loading ? (
                <div className="loading-message">Loading data...</div>
            ) : (
                <>
                    {/* Header */}
                    <div className="header">
                        <div className="header-logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="AAPL" />
                        </div>
                        <div>
                            <div className="header-title">AAPL <span className="header-exchange">NASDAQ</span></div>
                            <div className="desc">Apple Inc.</div>
                        </div>
                        <div className="header-price">
                            {stockPrice !== null ? (
                                <>
                                    <div className="header-price-main">${stockPrice.toFixed(2)}</div>
                                    <div className={`header-price-change ${priceChange >= 0 ? 'green' : 'red'}`}>
                                        {priceChange >= 0 ? '+' : '-'}
                                        {Math.abs(priceChange).toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                                    </div>
                                </>
                            ) : (
                                <div>Loading Price...</div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="desc">
                        Apple Inc. is a global technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. Operates through iPhone, Mac, iPad, Wearables, Home and Accessories, and Services segments.
                    </div>

                    {/* Price Chart and Stats */}
                    <div className="grid-2">
                        <div className="card">
                            <div className="section-title">Price Chart</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="vertical-stats">
                            <div className="card">
                                <table className="stats-table">
                                    <tbody>
                                        <tr>
                                            <td className="label">Open</td>
                                            <td>$169.00</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Prev Close</td>
                                            <td>$168.50</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Day High</td>
                                            <td>$171.00</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Day Low</td>
                                            <td>$167.80</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Volume</td>
                                            <td>75M</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Market Cap</td>
                                            <td>$2.7T</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card">
                                <table className="stats-table">
                                    <tbody>
                                        <tr>
                                            <td className="label">PE Ratio</td>
                                            <td>28.5</td>
                                        </tr>
                                        <tr>
                                            <td className="label">EPS</td>
                                            <td>6.15</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Div Yield</td>
                                            <td>0.55%</td>
                                        </tr>
                                        <tr>
                                            <td className="label">52W High</td>
                                            <td>$182.94</td>
                                        </tr>
                                        <tr>
                                            <td className="label">52W Low</td>
                                            <td>$124.17</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* News */}
                    <div className="news-section">
                        <div className="section-title">News</div>
                        <div className="news-list">
                            {newsItems.map((item, idx) => (
                                <div key={idx} className="news-card">
                                    <div className="news-icon">📰</div>
                                    <div>{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financials and Ratios */}
                    <div className="financials">
                        <div className="financial-metrics">
                            <div className="value">$365B</div>
                            <div className="label">Revenue</div>
                        </div>
                        <div className="financial-metrics">
                            <div className="value">$95B</div>
                            <div className="label">Net Income</div>
                        </div>
                        <div className="financial-metrics">
                            <div className="value">$62B</div>
                            <div className="label">Free Cash Flow</div>
                        </div>
                        <div className="ratios-list">
                            <ul>
                                <li>Liquidity ratio: 1.2</li>
                                <li>Debt to equity: 1.5</li>
                            </ul>
                        </div>
                    </div>

                    {/* Pie and Bar Charts */}
                    <div className="pie-bar-section">
                        <div className="pie-bar-card">
                            <div className="section-title">Recommendations Breakdown</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {
                                            pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="pie-bar-card">
                            <div className="section-title">Quarterly Revenue</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line and Candlestick Charts */}
                    <div className="chart-section">
                        <div className="chart-card">
                            <div className="section-title">Performance</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-card">
                            <div className="section-title">Candlestick</div>
                            {candlestickData.length > 0 ? (
                                <CandlestickChart data={candlestickData} />
                            ) : (
                                <div className="text-center">Loading Candlestick Data...</div>
                            )}
                        </div>
                    </div>

                    {/* Volume Trends */}
                    <div className="chart-card">
                        <div className="section-title">Volume Trends</div>
                        {volumeData.length > 0 ? (
                            <VolumeTrendChart data={volumeData} />
                        ) : (
                            <div className="text-center">Loading Volume Data...</div>
                        )}
                    </div>

                    {/* Ownership and Recommendations */}
                    <div className="ownership-section">
                        <div className="ownership-card">
                            <div className="section-title">Ownership</div>
                            {ownershipData ? (
                                <OwnershipChart data={ownershipData} />
                            ) : (
                                <div className="text-center">Loading Ownership Data...</div>
                            )}
                        </div>
                        <div className="ownership-card">
                            <div className="section-title">Recommendations</div>
                            <RecommendationsChart recommendations={recommendations} />
                        </div>
                    </div>

                    {/* Corporate Actions and About */}
                    <div className="corp-about-section">
                        <div className="corp-card">
                            <div className="section-title">Corporate Actions</div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2024-01-15</td>
                                        <td>Dividend</td>
                                        <td>$0.22/share</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="about-card">
                            <div className="section-title">About</div>
                            Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five American information technology companies.
                        </div>
                    </div>

                    {/* Peers Comparison */}
                    <div className="peers-section">
                        <div className="section-title">Peers Comparison</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peers.map((peer, idx) => (
                                    <tr key={idx}>
                                        <td>{peer.name}</td>
                                        <td>${peer.price}</td>
                                        <td className={peer.change.startsWith("+") ? "green" : "red"}>{peer.change}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Other Info */}
                    <div className="chart-card">
                        <div className="section-title">Other Data</div>
                        Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five American information technology companies.
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
