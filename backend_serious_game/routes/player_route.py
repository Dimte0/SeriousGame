from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os

player_route = Blueprint('player', __name__)

# Route pour la liste de tous les joueurs (Read)
@player_route.route('/api/player_route/', methods=['GET'])
def list_players():
    try:
        cursor = db.cursor()
        cursor.execute(os.environ.get('list_players_query'))
        players = cursor.fetchall()
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
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des joueurs", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()    

# Route pour la création d'un joueur (Create)
@player_route.route('/api/player_route/<int:PartieID>', methods=['POST'])
def create_player(PartieID):
    
    try: 
        cursor = db.cursor()
        data = request.json  # Supposons que vous recevez des données au format JSON
        joueurPseudo = data.get('joueurPseudo')
        joueurPoint = data.get('joueurPoint')

        # Insérer le nouveau joueur dans la base de données
        cursor.execute(os.environ.get('create_game_query'), (joueurPseudo, joueurPoint, PartieID))
        db.commit()
        
        # Récupérer l'ID du joueur créé
        joueurID = cursor.lastrowid

        return jsonify({"joueurID": joueurID})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création d'un joueur", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la lecture d'un joueur (Read)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['GET'])
def get_player(joueurID):
    
    try:
        cursor = db.cursor()
        # Exécuter la requête SQL pour obtenir les données de la partie
        cursor.execute(os.environ.get('get_player_query'), (joueurID,))
        player = cursor.fetchone()

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
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération des données du joueur", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la mise à jour d'un joueur (Update)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['PUT'])
def update_player(joueurID):
    try:
        
        cursor = db.cursor()
        data = request.json

        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400

        joueurPseudo = data.get('joueurPseudo')
        joueurPoint = data.get('joueurPoint')
        PartieID = data.get('PartieID')

        # Validation des données d'entrée (on peut ajouter des règles de validation ici)
        if joueurPseudo is None or joueurPoint is None or PartieID is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400

        # Mettre à jour les informations du joueur dans la base de données
        cursor.execute(os.environ.get('update_player'),(joueurPseudo, joueurPoint, PartieID, joueurID))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Le joueur avec l'ID spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "Joueur mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour du joueur", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la suppression d'un joueur (Delete)
@player_route.route('/api/player_route/<int:joueurID>/', methods=['DELETE'])
def delete_player(joueurID):
    try:
        
        cursor = db.cursor()
        
        # Supprimer le joueur de la base de données
        cursor.execute(os.environ.get('delete_palyer_query'), (joueurID,))
        db.commit()
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Le joueur avec l'ID spécifié n'a pas été trouvé"}), 404

        # Renvoyer un message de confirmation
        return jsonify({"message": "Joueur supprimé avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression du thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
