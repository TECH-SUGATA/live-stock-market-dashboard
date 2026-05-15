# ══════════════════════════════════════════════════
#   STOCK DASHBOARD — CONFIGURATION
# ══════════════════════════════════════════════════

# 🔑 PASTE YOUR FINNHUB API KEY HERE
# Get free key at: https://finnhub.io  (No credit card needed)
FINNHUB_API_KEY = "d83j4u9r01qkm5c8bc3gd83j4u9r01qkm5c8bc40"

# 📈 Stocks to track (add/remove any US stock symbols)
STOCKS = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"]

# ⏱️ How often to fetch fresh data (seconds)
# Free plan = 60 calls/min → safe at 15s for 5 stocks
FETCH_INTERVAL = 15

# 🌐 Server settings
HOST = "0.0.0.0"
PORT = 5000
