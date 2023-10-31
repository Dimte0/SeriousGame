from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os

theme_route = Blueprint('theme', __name__)

# Route pour la liste de tous les thèmes (Read)
@theme_route.route('/api/theme_route/', methods=['GET'])
def list_themes():
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('list_themes_query'))
        themes = cursor.fetchall()
        print(themes)
        items_list = []
        for theme in themes:
            item_dict = {
                'themeID': theme[0],
                'themeIntitule': theme[1]
            }
            items_list.append(item_dict)

        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des thèmes", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  

# Route pour la création d'un thème (Create)
@theme_route.route('/api/theme_route/', methods=['POST'])
def create_theme():
    
    try:
        cursor = db.cursor()
        
        data = request.json  # Supposons que vous recevez des données au format JSON
        themeIntitule = data.get('themeIntitule')

        # Insérer le nouveau thème dans la base de données
        cursor.execute(os.environ.get('create_theme_query'), (themeIntitule,))
        db.commit()

        # Récupérer l'ID du thème créé
        themeID = cursor.lastrowid
        
        return jsonify({"themeID": themeID})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création d'un thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
    
# Route pour la lecture d'un thème (Read)
@theme_route.route('/api/theme_route/<int:themeID>/', methods=['GET'])
def get_theme(themeID):
    
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('get_theme_query'), (themeID,))
        theme = cursor.fetchone()

        if theme:
            item_dict = {
                'themeID': theme[0],
                'themeIntitule': theme[1]
            }
            return jsonify(item_dict)
        else:
            return jsonify({"message": "Thème non trouvé"}), 404
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération des données du thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
    
# Route pour la mise à jour d'un joueur (Update)
@theme_route.route('/api/theme_route/<int:themeID>/', methods=['PUT'])
def update_theme(themeID):
    
    try:
        cursor = db.cursor()
        
        data = request.json  # Supposons que vous recevez des données au format JSON
        
        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400    

        themeIntitule = data.get('themeIntitule')

        # Validation des données d'entrée (on peut ajouter des règles de validation ici)
        if themeIntitule is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400
       
        # Mettre à jour les informations du joueur dans la base de données
        cursor.execute(os.environ.get('update_theme_query'),(themeIntitule,themeID))
        db.commit()
        
        if cursor._rowcount == 0:
            return jsonify({"error": "Le thème avec l'ID spécifié n'a pas été trouvé"}), 404
        
        return jsonify({"message": "Thème mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour du thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la suppression d'un joueur (Delete)
@theme_route.route('/api/theme_route/<int:themeID>/', methods=['DELETE'])
def delete_player(themeID):
    try:
        
        cursor = db.cursor()
        # Supprimer le thème de la base de données
        cursor.execute(os.environ.get('delele_theme_query'), (themeID,))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Le thème avec l'ID spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "Thème supprimé avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression du thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()