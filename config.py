import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-prod')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret-change-in-prod')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///stockvision.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY', '')
    FINNHUB_BASE_URL = 'https://finnhub.io/api/v1'
    COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
