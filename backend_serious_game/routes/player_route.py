from flask import Blueprint, jsonify, request
from database import db

player_route = Blueprint('player', __name__)

connection = db.cursor()
# connection.close() # utilisé pour déconnecté


# Route pour la liste de tous les joueurs (Read)
@player_route.route('/api/player_route/', methods=['GET'])
def list_players():
    connection.execute("SELECT * FROM joueur")
    players = connection.fetchall()
    print(players)
    items_list = []
    for player in players:
        item_dict = {
            'joueurID': player[0],
            'joueurPseudo': player[1],
            'joueurPoint': int(player[2]),
            'PartieID': player[3]
        }
        items_list.append(item_dict)

    return jsonify(items_list)

# Route pour la création d'un joueur (Create)
@player_route.route('/api/player_route/', methods=['POST'])
def create_player():
    data = request.json  # Supposons que vous recevez des données au format JSON
    joueurPseudo = data.get('joueurPseudo')
    joueurPoint = data.get('joueurPoint')
    PartieID = data.get('PartieID')

    # Insérer le nouveau joueur dans la base de données
    connection.execute("INSERT INTO joueur (joueurPseudo, joueurPoint, PartieID) VALUES (%s, %s, %s)", (joueurPseudo, joueurPoint, PartieID))
    db.commit()

    return jsonify({"message": "Joueur créé avec succès"})

# Route pour la lecture d'un joueur (Read)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['GET'])
def get_player(joueurID):
    connection.execute("SELECT * FROM joueur WHERE joueurID = %s", (joueurID,))
    player = connection.fetchone()

    if player:
        item_dict = {
            'joueurID': player[0],
            'joueurPseudo': player[1],
            'joueurPoint': int(player[2]),
            'PartieID': player[3]
        }
        return jsonify(item_dict)
    else:
        return jsonify({"message": "Joueur non trouvé"}), 404

# Route pour la mise à jour d'un joueur (Update)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['PUT'])
def update_player(joueurID):
    data = request.json  # Supposons que vous recevez des données au format JSON
    joueurPseudo = data.get('joueurPseudo')
    joueurPoint = data.get('joueurPoint')
    PartieID = data.get('PartieID')

    # Mettre à jour les informations du joueur dans la base de données
    connection.execute("UPDATE joueur SET joueurPseudo = %s, joueurPoint = %s, PartieID = %s WHERE joueurID = %s",(joueurPseudo, joueurPoint, PartieID, joueurID))
    db.commit()

    return jsonify({"message": "Joueur mis à jour avec succès"})

# Route pour la suppression d'un joueur (Delete)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['DELETE'])
def delete_player(joueurID):
    # Supprimer le joueur de la base de données
    connection.execute("DELETE FROM joueur WHERE joueurID = %s", (joueurID,))
    db.commit()

    return jsonify({"message": "Joueur supprimé avec succès"})



# @player_route.route('/api/player_route/registration', methods=['GET', 'POST'])
# def registration():
#     registration_form = RegistrationForm()
#     # login_form = LoginForm()

#     if registration_form.validate_on_submit():
#         registration_form.save_user()
#         flash('Account created successfully!', 'success')
#         return redirect(url_for('home'))
   
#     # ...

# @player_route.route('/api/user_route/login', methods=['POST'])
# def login():
#     # Récupérer les données d'identification de l'utilisateur depuis la requête POST
#     username = request.json['username']
#     password = request.json['password']

#     # Vérifier les informations d'identification dans la base de données
#     cur = connection.cursor()
#     cur.execute("SELECT id,username,password FROM users WHERE username = %s", (username,))
#     user = cur.fetchone()
#     print(f'valeur dans le select : {user}')
#     cur.close()
    
#     user_tuple= (("id",user[0]),("username",user[1]),("password",user[2]))
#     dict_user= dict(user_tuple)
    

#     if user:
#         # Vérifier le mot de passe
#         if password == dict_user['password']:
#             # Authentification réussie
            
#             payload = {'username':dict_user['username']}
#             secret_key = config('SECRET_KEY')
            
#             response = {
#                 'idUser': dict_user['id'],
#                 'success': True,
#                 'message': 'Authentification réussie',
#                 'token': jwt.encode(payload, secret_key, algorithm='HS256')  # jeton d'accès généré
#             }
            
#         else:
#             # Mot de passe incorrect
#             response = {
#                 'success': False,
#                 'message': 'Votre mot de passe est incorrect',    
#             }
#         return jsonify(response)
#     else:
#         # Utilisateur non trouvé
#         response = {
#                 'success': False,
#                 'message': 'Utilisateur non trouvé',    
#             }
#         return jsonify(response)

# #Pour déchiffrer et vérifier un token dans un route protégée, on utilise le décorateur 'jwt_required()' de la bibliothèque Flask-JWT-Extended
# #ou implémenter un vérification de token en utilisant la méthode 'jwt.decode'

# @player_route.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     #obtenir l'identiter de l'utilisateur à partir du token
#     current_user = get_jwt_identity() 
#     #print(current_user)  #pour vérifier ce qu'il y a dedans
    
#     #effectuez des opérations protégées avec l'identité de l'utilisateur
#     return f"Utilisateur authentifié : {current_user}"