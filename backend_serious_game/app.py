from flask import Flask, render_template
from flask_cors import CORS
import mysql.connector
from flask_wtf import FlaskForm
from flask_bcrypt import Bcrypt
from routes.player_route import player_route
from decouple import Config,Csv

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.register_blueprint(player_route)

if __name__ == '__main__':
    app.run()
