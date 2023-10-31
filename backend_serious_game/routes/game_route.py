import os
from flask import Blueprint, jsonify, request
from database import db
import mysql.connector


game_route = Blueprint('game', __name__)

cursor = db.cursor()

# Route pour la liste de tous les parties (Read)
@game_route.route('/api/game_route/', methods=['GET'])
def list_games():
    try:
        cursor = db.cursor()
        cursor.execute(os.environ.get('list_games_query'))
        games = cursor.fetchall()

        items_list = []
        for game in games:
            item_dict = {
                'partieID': game[0]
            }
            items_list.append(item_dict)

        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des parties", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la création d'une partie (Create)
@game_route.route('/api/game_route/', methods=['POST'])
def create_game():

    try:
        cursor = db.cursor()
        # Insérer la nouvelle partie dans la base de données
        cursor.execute(os.environ.get('create_game_query'), ())
        db.commit()

        # Récupérer l'ID de la nouvelle partie
        partieID = cursor.lastrowid

        if partieID:
            return jsonify({"PartieID": partieID})
        else:
            return jsonify({"error": "La création de la partie a échoué"}), 500
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création de la partie", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la lecture d'une partie (Read)
@game_route.route('/api/game_route/<int:PartieID>/', methods=['GET'])
def get_game(PartieID):
    try:
        cursor = db.cursor()
        # Exécuter la requête SQL pour obtenir les données de la partie
        cursor.execute(os.environ.get('get_game_query'), (PartieID,))
        game = cursor.fetchone()

        if game:
            item_dict = {
                'PartieID': game[0],
            }
            return jsonify(item_dict)
        else:
            return jsonify({"message": "Partie non trouvée"}), 404
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération des données de la partie", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
    
# Route pour la suppression d'une partie (Delete)
@game_route.route('/api/game_route/<int:PartieID>/', methods=['DELETE'])
def delete_game(PartieID):
    try:
        cursor = db.cursor()
        # Supprimer la partie de la base de données
        cursor.execute(os.environ.get('delete_game_query'), (PartieID,))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "La partie avec l'ID spécifié n'a pas été trouvée"}), 404

        return jsonify({"message": "Partie supprimée avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression de la partie", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()