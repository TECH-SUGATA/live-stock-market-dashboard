<div align="center">

<br />

```
 ____  _             _    __     ___     _             
/ ___|| |_ ___   ___| | __\ \   / (_)___(_) ___  _ __  
\___ \| __/ _ \ / __| |/ / \ \ / /| / __| |/ _ \| '_ \ 
 ___) | || (_) | (__|   <   \ V / | \__ \ | (_) | | | |
|____/ \__\___/ \___|_|\_\   \_/  |_|___/_|\___/|_| |_|
```

# StockVision — AI-Powered Financial Intelligence Platform

**Enterprise-grade financial analytics. Real-time market intelligence. AI-driven investment insights.**

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-00C896?style=for-the-badge&logo=vercel&logoColor=white)](https://live-stock-market-dashboard-app.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TECH-SUGATA/live-stock-market-dashboard)

<br />

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-REST%20API-000000?style=flat-square&logo=flask&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-CC2927?style=flat-square&logo=databricks&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/API-Render-46E3B7?style=flat-square&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<br />

</div>

---

## Overview

StockVision is a full-stack financial intelligence platform that unifies real-time stock market data, AI-powered investment analysis, cryptocurrency tracking, and personalized portfolio management into a single, cohesive dashboard experience.

Built with a production-grade React + Flask architecture and integrated with live financial data APIs, StockVision demonstrates deep end-to-end engineering — from secure JWT authentication and RESTful backend design to predictive recommendation algorithms and responsive, glassmorphism-styled UI.

> **Target Users:** Individual investors, active traders, finance students, and analytics-focused professionals seeking a unified view of market data and portfolio performance.

---

## The Problem

Modern investors navigate a fragmented ecosystem: separate tools for stock screening, portfolio tracking, crypto markets, and financial news. Most retail-facing platforms offer surface-level dashboards without actionable intelligence — requiring users to cross-reference multiple services, parse raw data manually, and make investment decisions without contextual support.

**Key pain points addressed:**

- Fragmented market data across multiple platforms with no unified view
- Lack of explainable, AI-backed buy/hold/sell signals for individual investors
- No seamless correlation between news events and portfolio holdings
- Complex portfolio tracking tools inaccessible to non-professional users

---

## Solution Architecture

StockVision consolidates the entire investment research workflow into one authenticated, data-rich application:

| Layer | Capability |
|---|---|
| **Data Ingestion** | Live market feeds via Finnhub and CoinGecko APIs |
| **Backend Engine** | Python/Flask REST API with SQLAlchemy ORM and JWT-secured endpoints |
| **AI Layer** | Custom recommendation engine with confidence scoring and trend analysis |
| **Frontend** | React + Vite SPA with Recharts visualizations and Framer Motion transitions |
| **Persistence** | User portfolios, watchlists, and session data stored in SQLite |

---

## Core Features

### Authentication & Security
- JWT-based login and registration with secure token lifecycle management
- Password hashing with bcrypt and protected route middleware
- Session persistence with automatic token refresh

### Real-Time Stock Analytics
- Live equity prices, bid/ask spreads, and percentage change indicators
- Detailed company profiles with sector, market cap, and exchange metadata
- Interactive candlestick charts with OHLCV data rendering
- Top Gainers & Losers leaderboard refreshed on live market cycles
- Smart stock search with autocomplete powered by symbol and name matching

### Portfolio & Watchlist Management
- Personalized watchlists with add/remove and drag-to-prioritize support
- Portfolio holding tracker with cost-basis and unrealized P&L views
- User-scoped data isolated per authenticated session

### AI Recommendation Engine
- Algorithmic **Buy / Hold / Sell** signal generation per ticker
- Confidence scoring (0–100%) derived from multi-factor momentum analysis
- Trend classification with directional indicators (bullish, bearish, neutral)
- Human-readable insight summaries explaining each recommendation

### Cryptocurrency Tracking
- Live data for top cryptocurrencies sourced from CoinGecko
- Market capitalization rankings with 24-hour price deltas
- Sparkline-style price movement charts per asset

### Market Intelligence Feed
- Real-time financial news aggregated from Finnhub's global news API
- Company-specific news surfaced contextually on stock detail pages
- Sentiment-aware article categorization for rapid market scanning

### UI / UX System
- Fully responsive layout — optimized for desktop, tablet, and mobile
- Dark and Light theme toggle with system preference detection
- Glassmorphism card design with depth-layered visual hierarchy
- Page transitions and micro-interactions powered by Framer Motion

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│                                                                     │
│   React 18 + Vite SPA                                               │
│   ┌────────────┐  ┌──────────────┐  ┌──────────────┐               │
│   │  Dashboard │  │  Auth Pages  │  │  Portfolio   │               │
│   └────────────┘  └──────────────┘  └──────────────┘               │
│   ┌────────────┐  ┌──────────────┐  ┌──────────────┐               │
│   │  AI Engine │  │  Crypto View │  │  News Feed   │               │
│   └────────────┘  └──────────────┘  └──────────────┘               │
│              │                │                                     │
│          Axios HTTP       Framer Motion / Recharts                  │
└──────────────┼──────────────────────────────────────────────────────┘
               │
               │  REST API  (JWT Protected)
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND (Python / Flask)                        │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  API Routes                                                  │  │
│   │  /auth  /stocks  /portfolio  /watchlist  /crypto  /news      │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌────────────────────┐  ┌───────────────────────────────────────┐ │
│   │  JWT Middleware     │  │  AI Recommendation Engine            │ │
│   │  bcrypt Hashing    │  │  Multi-Factor Signal Processor        │ │
│   └────────────────────┘  └───────────────────────────────────────┘ │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  SQLAlchemy ORM → SQLite                                     │  │
│   │  Models: User · Portfolio · Watchlist · StockCache           │  │
│   └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
 ┌─────────────────┐           ┌─────────────────────┐
 │   Finnhub API   │           │   CoinGecko API      │
 │  Stock Quotes   │           │  Crypto Markets      │
 │  Company Data   │           │  Market Caps         │
 │  Financial News │           │  Price History       │
 └─────────────────┘           └─────────────────────┘
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React.js | 18 | Component-based UI framework |
| Vite | 5 | High-performance build tooling |
| Tailwind CSS | 3 | Utility-first styling system |
| Framer Motion | 11 | Animation and transition engine |
| Recharts | 2 | Financial chart library |
| Axios | 1 | HTTP client for REST API communication |

### Backend

| Technology | Purpose |
|---|---|
| Python 3.11 | Core runtime |
| Flask | Lightweight REST API framework |
| SQLAlchemy | ORM for database abstraction |
| PyJWT | Token generation and validation |
| bcrypt | Password hashing |

### Infrastructure & APIs

| Service | Role |
|---|---|
| Vercel | Frontend deployment and CDN |
| Render | Backend API hosting |
| SQLite | Relational data persistence |
| Finnhub API | Real-time equity data and financial news |
| CoinGecko API | Cryptocurrency market data |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.x
- Python ≥ 3.11
- pip
- A Finnhub API key (free tier available at [finnhub.io](https://finnhub.io))

### Clone the Repository

```bash
git clone https://github.com/TECH-SUGATA/live-stock-market-dashboard.git
cd live-stock-market-dashboard
```

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate       # macOS/Linux
venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Initialize the database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Start the development server
flask run --port 5000
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend — `.env`

```env
# Flask
FLASK_ENV=development
SECRET_KEY=your_secret_key_here

# JWT
JWT_SECRET_KEY=your_jwt_secret_here
JWT_ACCESS_TOKEN_EXPIRES=3600

# External APIs
FINNHUB_API_KEY=your_finnhub_api_key_here

# Database
DATABASE_URL=sqlite:///stockvision.db
```

### Frontend — `.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
```

> **Note:** Never commit `.env` files. Add them to `.gitignore` before initializing version control.

---

## API Reference

All backend routes are prefixed with `/api`. Protected routes require a valid `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate and receive JWT |
| `GET` | `/api/auth/me` | Protected | Retrieve authenticated user profile |
| `POST` | `/api/auth/logout` | Protected | Invalidate active session |

### Stock Data

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/stocks/quote/:symbol` | Protected | Fetch live quote for a symbol |
| `GET` | `/api/stocks/profile/:symbol` | Protected | Company profile and metadata |
| `GET` | `/api/stocks/candles/:symbol` | Protected | OHLCV candlestick history |
| `GET` | `/api/stocks/search` | Protected | Symbol and name autocomplete |
| `GET` | `/api/stocks/movers` | Protected | Top gainers and losers |

### Portfolio & Watchlist

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/portfolio` | Protected | Retrieve user portfolio holdings |
| `POST` | `/api/portfolio/add` | Protected | Add a new holding |
| `DELETE` | `/api/portfolio/:id` | Protected | Remove a holding |
| `GET` | `/api/watchlist` | Protected | Fetch user watchlist |
| `POST` | `/api/watchlist/add` | Protected | Add symbol to watchlist |
| `DELETE` | `/api/watchlist/:symbol` | Protected | Remove symbol from watchlist |

### AI Recommendations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/ai/recommend/:symbol` | Protected | Buy/Hold/Sell signal with confidence |
| `GET` | `/api/ai/insights` | Protected | Portfolio-level AI insights |

### Market Data

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/crypto/markets` | Protected | Top cryptocurrency rankings |
| `GET` | `/api/news/market` | Protected | Global financial news feed |
| `GET` | `/api/news/company/:symbol` | Protected | Company-specific news |

---

## Security

StockVision implements security controls aligned with standard industry practices for web applications handling financial data:

- **Authentication:** Stateless JWT tokens signed with HS256, with configurable expiry windows
- **Password Security:** bcrypt hashing with adaptive cost factors; plaintext passwords are never stored or logged
- **Protected Routes:** Server-side JWT validation middleware applied across all non-public endpoints
- **CORS Policy:** Strict origin allowlist configured on the Flask server to prevent unauthorized cross-origin requests
- **Input Validation:** All API inputs are validated and sanitized before database interaction
- **Environment Isolation:** API keys and secrets managed exclusively via environment variables; no credentials hardcoded in source
- **Rate Limiting:** External API usage scoped to authenticated sessions to prevent abuse

---

## Deployment

### Frontend — Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from the frontend directory
cd frontend
vercel --prod
```

Set environment variables in the Vercel project dashboard under **Settings → Environment Variables**.

### Backend — Render

1. Push your backend code to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set the **Build Command** to `pip install -r requirements.txt`.
4. Set the **Start Command** to `gunicorn app:app`.
5. Add all environment variables from your `.env` file under the **Environment** tab.

---

## Engineering Highlights

- **Decoupled Architecture:** Frontend and backend are independently deployable services communicating over a versioned REST contract, enabling separate CI/CD pipelines and scaling strategies.
- **Custom AI Engine:** The recommendation system aggregates price momentum, volume trend, and historical volatility into a weighted scoring model — producing confidence-graded signals without reliance on third-party ML APIs.
- **Token-Secured Data Access:** Every user data operation is scoped to the authenticated identity via JWT claims, ensuring strict data isolation between accounts.
- **Real-Time Data Pipeline:** Finnhub API responses are proxied through the Flask backend, enabling server-side caching, rate-limit management, and response normalization before delivery to the client.
- **Responsive Chart System:** Recharts components are configured with dynamic dimensions and responsive containers, maintaining data fidelity across screen sizes without layout breakage.
- **Glassmorphism Design System:** A consistent visual language built with Tailwind utility classes and custom CSS variables — translating across both dark and light themes without duplication.

---

## Scalability Roadmap Considerations

The current SQLite + single-server deployment is architected to evolve along the following axis:

| Current | Production Scale Path |
|---|---|
| SQLite | PostgreSQL or PlanetScale (MySQL-compatible) |
| Single Flask server | Flask behind Gunicorn + Nginx, or migration to FastAPI |
| Synchronous API calls | Async task queue via Celery + Redis for background data refresh |
| Static recommendation engine | Integration with ML model serving (e.g., scikit-learn, ONNX runtime) |
| Client-side state management | Redux Toolkit or Zustand for complex cross-component state |
| Manual deployments | GitHub Actions CI/CD with automated test coverage gates |

---

## Future Roadmap

- **Options Flow Tracker** — Unusual options activity scanner with real-time alerts
- **Earnings Calendar** — Company earnings date tracking with consensus estimate display
- **Paper Trading Simulator** — Risk-free trade execution sandbox with P&L tracking
- **Social Sentiment Analysis** — Reddit/Twitter/X signal aggregation per ticker
- **Mobile Applications** — React Native iOS and Android clients with biometric authentication
- **Webhooks & Alerts** — Price threshold and signal-change notifications via email and push
- **Multi-Currency Support** — Localized display for international market data
- **Advanced Charting** — Technical indicator overlays (RSI, MACD, Bollinger Bands)

---

## Contributing

Contributions are welcome and encouraged. To maintain code quality and consistency:

1. **Fork** the repository and create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow existing conventions** — component naming, API route structure, and Tailwind class ordering patterns.

3. **Write meaningful commits** using [Conventional Commits](https://www.conventionalcommits.org/) syntax:
   ```
   feat: add price alert notification system
   fix: resolve candlestick chart timezone offset
   refactor: extract recommendation engine to standalone module
   ```

4. **Test your changes** locally across both frontend and backend before opening a pull request.

5. **Submit a pull request** with a clear description of the change, its motivation, and any relevant screenshots for UI changes.

For significant feature proposals, please open an issue first to discuss approach and scope before investing implementation time.

---

## License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software. Attribution to the original author is appreciated but not required.

---

## About the Developer

<div align="center">

### Sugata Nayak

**Full-Stack Software Engineer | FinTech & AI Systems**

</div>

Sugata is a full-stack engineer with a focus on building data-intensive, user-centric applications at the intersection of finance and modern web technology. StockVision represents a production-grade demonstration of end-to-end engineering capability — from system architecture and backend API design to AI-driven feature development and polished frontend delivery.

**Technical Focus Areas:**
- Full-Stack Web Development (React, Python, REST APIs)
- FinTech Platform Engineering
- AI/ML Integration in Production Applications
- System Design and Scalable Architecture

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-TECH--SUGATA-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TECH-SUGATA)
[![Live Demo](https://img.shields.io/badge/Live%20App-StockVision-00C896?style=for-the-badge&logo=vercel&logoColor=white)](https://live-stock-market-dashboard-app.vercel.app/)

</div>

---

<div align="center">

**StockVision** · Built by [Sugata Nayak](https://github.com/TECH-SUGATA) · MIT License

*Real-time market intelligence. AI-powered decisions. Enterprise-grade engineering.*

</div>
