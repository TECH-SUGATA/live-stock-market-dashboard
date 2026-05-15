from flask import Flask, render_template
from flask_socketio import SocketIO
import requests
import threading
import time
import random
from config import FINNHUB_API_KEY, STOCKS, FETCH_INTERVAL, HOST, PORT

app    = Flask(__name__)
app.config['SECRET_KEY'] = 'stockdash_secret'
socketio = SocketIO(app, cors_allowed_origins="*")

# ── Finnhub API endpoints ─────────────────────────────────────────────────
BASE_URL   = "https://finnhub.io/api/v1"
QUOTE_URL  = f"{BASE_URL}/quote?symbol={{symbol}}&token={FINNHUB_API_KEY}"
CANDLE_URL = f"{BASE_URL}/stock/candle?symbol={{symbol}}&resolution=60&from={{frm}}&to={{to}}&token={FINNHUB_API_KEY}"

# ── In-memory cache ───────────────────────────────────────────────────────
cached_data    = []
last_fetch_time = 0


def fetch_quote(symbol):
    """Fetch current quote for one symbol from Finnhub."""
    try:
        url  = QUOTE_URL.format(symbol=symbol)
        resp = requests.get(url, timeout=8)
        resp.raise_for_status()
        d = resp.json()
        # Finnhub returns 0s when market is closed / key is invalid
        if d.get('c', 0) == 0:
            return None
        return d   # keys: c, d, dp, h, l, o, pc, t
    except Exception as e:
        print(f"  [{symbol}] quote error: {e}")
        return None


def fetch_candles(symbol):
    """Fetch last 24 hours of hourly candle data."""
    try:
        now = int(time.time())
        frm = now - 60 * 60 * 26   # 26 hours back (buffer)
        url = CANDLE_URL.format(symbol=symbol, frm=frm, to=now)
        resp = requests.get(url, timeout=8)
        resp.raise_for_status()
        d = resp.json()
        if d.get('s') != 'ok' or not d.get('c'):
            return [], []
        closes = [round(p, 2) for p in d['c'][-24:]]
        times  = [
            time.strftime('%H:%M', time.localtime(ts))
            for ts in d['t'][-24:]
        ]
        return closes, times
    except Exception as e:
        print(f"  [{symbol}] candle error: {e}")
        return [], []


def fetch_all_stocks():
    """Fetch quotes + candles for all configured stocks."""
    global cached_data, last_fetch_time
    new_data = []

    for symbol in STOCKS:
        q = fetch_quote(symbol)
        if not q:
            # keep old data if fetch fails
            prev = next((s for s in cached_data if s['symbol'] == symbol), None)
            if prev:
                new_data.append(prev)
            continue

        closes, times = fetch_candles(symbol)

        # If candles unavailable, build mini history from current price
        if not closes:
            base = q['pc']
            closes = [round(base * (1 + random.uniform(-0.005, 0.005)), 2)
                      for _ in range(23)] + [q['c']]
            now   = int(time.time())
            times = [time.strftime('%H:%M', time.localtime(now - (23 - i) * 3600))
                     for i in range(24)]

        entry = {
            'symbol':     symbol,
            'price':      round(q['c'],  2),
            'prev_close': round(q['pc'], 2),
            'change':     round(q['d'],  2),
            'change_pct': round(q['dp'], 2),
            'high':       round(q['h'],  2),
            'low':        round(q['l'],  2),
            'open':       round(q['o'],  2),
            'history':    closes,
            'times':      times,
        }
        new_data.append(entry)
        print(f"  [{symbol}]  ${entry['price']}  "
              f"{'+' if entry['change'] >= 0 else ''}{entry['change']} "
              f"({entry['change_pct']}%)")

    if new_data:
        cached_data     = new_data
        last_fetch_time = time.time()
        print(f"  Refreshed at {time.strftime('%H:%M:%S')}\n")


def micro_tick():
    """Tiny random price nudge between real fetches (live feel)."""
    for s in cached_data:
        noise     = s['price'] * random.uniform(-0.0003, 0.0003)
        s['price'] = round(s['price'] + noise, 2)


# ── Background loop ───────────────────────────────────────────────────────
def background_loop():
    print("Fetching initial stock data from Finnhub...\n")
    fetch_all_stocks()

    while True:
        time.sleep(3)

        if time.time() - last_fetch_time >= FETCH_INTERVAL:
            print("Refreshing from Finnhub API...")
            fetch_all_stocks()
        else:
            micro_tick()

        if cached_data:
            socketio.emit('stock_update', {
                'stocks':      cached_data,
                'next_refresh': max(0, int(FETCH_INTERVAL - (time.time() - last_fetch_time)))
            })


# ── Routes ────────────────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def on_connect():
    print("Client connected")
    if cached_data:
        socketio.emit('stock_update', {
            'stocks':      cached_data,
            'next_refresh': 0
        })


# ── Entry ─────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    # Validate API key
    if FINNHUB_API_KEY == "YOUR_API_KEY_HERE":
        print("\n" + "!"*52)
        print("  ⚠️  Please set your Finnhub API key in config.py")
        print("  Get free key at: https://finnhub.io")
        print("!"*52 + "\n")
    else:
        t = threading.Thread(target=background_loop, daemon=True)
        t.start()

    print("\n" + "="*52)
    print("  📈 Stock Market Dashboard running!")
    print(f"  Open: http://localhost:{PORT}")
    print("="*52 + "\n")

    socketio.run(app, debug=False, host=HOST, port=PORT)
