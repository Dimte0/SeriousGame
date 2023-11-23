import mysql.connector
from decouple import config

#les informations concernat la base de donnée sont dans .env
host = config('host', default='localhost')
user = config('user', default='root')
password = config('password', default='')
database = config('database', default='')

# Établir la connexion
try:
    db = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        charset='utf8'
    )
    print("Connexion réussie !")
except mysql.connector.Error as error:
    print("Erreur de connexion : {}".format(error))
