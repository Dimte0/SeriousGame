from flask import Flask, render_template
from flask_cors import CORS
import mysql.connector
from flask_wtf import FlaskForm
from flask_bcrypt import Bcrypt
from routes.user_route import user_route
from decouple import Config,Csv

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.register_blueprint(user_route)

if __name__ == '__main__':
    app.run()
