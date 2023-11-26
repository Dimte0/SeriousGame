import os
from flask import Blueprint, jsonify, request
from database import db
import mysql.connector


game_route = Blueprint('game', __name__)

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
                'partieID': game[0], 
                'partieNom': game[1]
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
        data = request.json 
        partieNom = data.get('partieNom')
        
        # Insert the new game into the database 
        cursor.execute(os.environ.get('create_game_query'), (partieNom,))
        db.commit()

        # Get the created game ID
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
    print(PartieID)
    try:
        cursor = db.cursor()
        # Execute the SQL query to get the data from the game 
        cursor.execute(os.environ.get('get_game_query'), (PartieID,))
        game = cursor.fetchone()
        print(game)
        if game:
            item_dict = {
                'partieID': game[0],
                'partieNom': game[1]
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
        
# Route pour la mise à jour d'une partie (Update)
@game_route.route('/api/game_route/<int:PartieID>/', methods=['PUT'])
def update_game(PartieID):
    try:
        cursor = db.cursor()
        data = request.json 
        partieNom = data.get('partieNom')
        
        # Update game information in the database
        cursor.execute(os.environ.get('update_game_query'), (partieNom ,PartieID))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "La partie avec l'ID spécifié n'a pas été trouvée"}), 404

        return jsonify({"message": "Partie mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression de la partie", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
    
# Route pour la suppression d'une partie (Delete)
@game_route.route('/api/game_route/<int:PartieID>/', methods=['DELETE'])
def delete_game(PartieID):
    try:
        cursor = db.cursor()
        # Delete game from the database
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