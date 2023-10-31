from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.player_route import player_route
from routes.game_route import game_route
from routes.theme_route import theme_route
from routes.level_route import level_route
from routes.question_route import question_route

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.register_blueprint(player_route)
app.register_blueprint(game_route)
app.register_blueprint(theme_route)
app.register_blueprint(level_route)

if __name__ == '__main__':
    app.run()