# Stock Dashboard

A simple stock price dashboard built with React, Tailwind CSS, and Finnhub API.

### [Live Demo](https://stock-dashboard-virid-nine.vercel.app/)
---

## Features
- Fetches live stock data (symbol, price, change %)
- Live search filter for stocks
- Loading spinner while fetching data
- Basic error handling if API fails

## Tech Stack
- React
- Tailwind CSS
- Axios
- [Finnhub API](https://finnhub.io/)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/jensuki/Stock-Dashboard.git
   cd Stock-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file at the root and add your Finnhub API key:
    ```bash
    VITE_FINNHUB_API_KEY=your_api_key_here
    ```

4. Run the app locally:
    ```bash
    npm run dev
    ```