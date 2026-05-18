from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.stocks import stocks_bp
from routes.watchlist import watchlist_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(stocks_bp)
app.register_blueprint(watchlist_bp)

@app.route("/")
def home():
    return {"message": "Live Stock Market Dashboard Backend Running"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
