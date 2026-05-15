# 📈 Live Stock Market Dashboard — Finnhub Free API

Real-time stock dashboard using Python Flask + Finnhub Free API.
No paid plan needed. No credit card required.

## Project Structure
```
stock_api_project/
├── app.py                ← Flask backend + Finnhub API calls
├── config.py             ← YOUR API KEY GOES HERE
├── requirements.txt      ← Python packages (only 3!)
├── templates/
│   └── index.html        ← Dashboard frontend
└── static/
    ├── style.css         ← Dark terminal theme
    └── script.js         ← Chart.js + Socket.IO
```

---

## 🔑 Step 1 — Get Free Finnhub API Key

1. Go to: https://finnhub.io
2. Click "Get free API key"
3. Sign up with email (no credit card)
4. Copy your API key (looks like: d1abc23def456ghi789)

**Free plan includes:**
- 60 API calls per minute
- Real-time US stock quotes
- Hourly candle data
- Completely free forever

---

## ⚙️ Step 2 — Add Your API Key

Open `config.py` and replace:
```python
FINNHUB_API_KEY = "YOUR_API_KEY_HERE"
```
with your actual key:
```python
FINNHUB_API_KEY = "d1abc23def456ghi789"
```

---

## 📦 Step 3 — Install Dependencies

```bash
pip install -r requirements.txt
```

Only 3 packages needed:
- flask
- flask-socketio
- requests

---

## ▶️ Step 4 — Run the Dashboard

```bash
python app.py
```

Open your browser at:
```
http://localhost:5000
```

---

## ✅ Features

| Feature              | Detail                                  |
|----------------------|-----------------------------------------|
| Live stock prices    | AAPL, TSLA, GOOGL, MSFT, AMZN          |
| Real data source     | Finnhub API (free tier)                 |
| Price history chart  | Hourly candles (line chart)             |
| Change bar chart     | All 5 stocks daily % change             |
| Market table         | Open, High, Low, Change, Status         |
| Live ticker strip    | Scrolling prices at bottom              |
| Auto refresh         | Every 15 seconds (real API call)        |
| Micro ticks          | Smooth price movement every 3s          |
| Market hours status  | Open / After Hours indicator            |
| API warning          | Shows message if API key is wrong       |

---

## 🔧 Customise Stocks

Edit `config.py` to track different stocks:

```python
STOCKS = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"]

# Change to any US stock symbols, e.g.:
STOCKS = ["NVDA", "META", "NFLX", "AMD", "INTC"]
```

---

## 📊 API Used

| API          | Finnhub.io                        |
|--------------|-----------------------------------|
| Type         | REST API                          |
| Cost         | FREE (60 calls/min)               |
| Data         | Real-time US stock quotes         |
| Key needed   | Yes (free signup, no credit card) |
| Website      | https://finnhub.io                |

---

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Backend    | Python + Flask       |
| Real-time  | Flask-SocketIO       |
| Stock Data | Finnhub REST API     |
| Charts     | Chart.js             |
| Frontend   | HTML + CSS + JS      |
