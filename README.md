# 📈 StockVision — AI-Powered Stock Market Dashboard

<div align="center">

![StockVision Banner](https://img.shields.io/badge/StockVision-AI%20Powered-blue?style=for-the-badge&logo=chart-line)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat&logo=flask)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

**A production-ready, full-stack fintech dashboard with real-time stock data, AI predictions, crypto tracking, and a premium glassmorphism UI.**

[Live Demo](#) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## ✨ Features

### 🔐 Authentication
- JWT-based login / signup / logout
- Forgot password flow
- bcrypt password hashing
- Protected routes

### 📊 Stock Market
- Real-time prices via **Finnhub API** (free)
- Interactive candlestick & line charts (Recharts)
- Company info, financials & peer comparisons
- Top Gainers / Losers
- Live market search with autocomplete
- News feed per stock

### 💼 Portfolio & Watchlist
- Add/remove stocks to watchlist
- Portfolio value tracking
- Saved to SQLite database per user

### 🤖 AI Predictor
- Trend-based AI prediction engine
- Buy / Hold / Sell signal generator
- Powered by Claude API (optional)
- Confidence scores and reasoning

### 🪙 Crypto
- Top 20 cryptos via **CoinGecko API** (free, no key needed)
- Price, market cap, 24h change

### 📰 Market News
- Latest financial news via Finnhub
- Category filtering

### 🎨 UI/UX
- Dark / Light mode toggle
- Glassmorphism cards
- Framer Motion animations
- Fully responsive (mobile, tablet, desktop)
- Premium fintech aesthetic (navy + electric blue)

---

## 🗂 Project Structure

```
stock-dashboard/
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Layout/    # Sidebar, Navbar
│   │   │   ├── Charts/    # Stock charts
│   │   │   └── Common/    # Search, Loading
│   │   ├── pages/         # Route pages
│   │   ├── context/       # Auth + Theme context
│   │   ├── services/      # API service layer
│   │   └── hooks/         # Custom hooks
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/                # Python Flask REST API
    ├── app.py             # App entry point
    ├── config.py          # Configuration
    ├── models/            # SQLAlchemy models
    ├── routes/            # API route blueprints
    │   ├── auth.py        # Auth endpoints
    │   ├── stocks.py      # Stock endpoints
    │   └── watchlist.py   # Watchlist CRUD
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Free Finnhub API key → [finnhub.io](https://finnhub.io) (takes 30 sec)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stock-dashboard.git
cd stock-dashboard
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env — add your Finnhub API key and a JWT secret

# Run the server
flask run --port=5000
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:5000

# Run dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 4. Environment Variables

**backend/.env**
```env
FLASK_ENV=development
SECRET_KEY=your_super_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
FINNHUB_API_KEY=your_finnhub_api_key_here
DATABASE_URL=sqlite:///stockvision.db
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=StockVision
```

---

## 🔑 Free API Setup

### Finnhub (Stock Data + News)
1. Go to [finnhub.io](https://finnhub.io)
2. Click "Get free API key"
3. Sign up (no credit card)
4. Copy your API key to `backend/.env`

### CoinGecko (Crypto — no key needed!)
- CoinGecko's public API is used directly, no API key required.

---

## 📦 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build

# Install Vercel CLI
npm install -g vercel
vercel --prod
```

Set environment variable in Vercel dashboard:
- `VITE_API_URL` = your deployed backend URL

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, select the `backend/` folder
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn app:app`
6. Add all environment variables from `.env`

---

## 🧪 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login + get JWT |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/forgot-password` | Password reset |

### Stocks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stocks/quote/:symbol` | Get stock quote |
| GET | `/api/stocks/candles/:symbol` | Get OHLC candles |
| GET | `/api/stocks/search?q=:query` | Search stocks |
| GET | `/api/stocks/news/:symbol` | Stock news |
| GET | `/api/stocks/profile/:symbol` | Company profile |
| GET | `/api/stocks/market-status` | Market open/close |

### Watchlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/watchlist` | Get user watchlist |
| POST | `/api/watchlist` | Add stock |
| DELETE | `/api/watchlist/:symbol` | Remove stock |

---

## 🎯 Use Cases

- 🎓 **Portfolio project** — impressive full-stack showcase
- 💼 **Internship applications** — demonstrates real-world skills
- 🌟 **GSSoC / Open Source** — well-structured for contributions
- 🔗 **LinkedIn showcase** — production-ready quality

---

## 🤝 Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Made with ❤️ for developers, by developers.
<br/>
⭐ Star this repo if it helped you!
</div>
