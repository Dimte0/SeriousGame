from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os

level_route = Blueprint('level', __name__)

# Route pour la liste de tous les niveaux (Read)
@level_route.route('/api/level_route/', methods=['GET'])
def list_levels():
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('list_levels_query'))
        levels = cursor.fetchall()
        print(levels)
        items_list = []
        for level in levels:
            item_dict = {
                'niveauID': level[0],
                'niveauIntitule': level[1],
                'niveauPoint': level[2]
            }
            items_list.append(item_dict)

        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des niveaux", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  

# Route pour la création d'un thème (Create)
@level_route.route('/api/level_route/', methods=['POST'])
def create_level():
    
    try:
        cursor = db.cursor()
        
        data = request.json  # Supposons que vous recevez des données au format JSON
        niveauIntitule = data.get('niveauIntitule')
        niveauPoint = data.get('niveauPoint')

        # Insérer le nouveau thème dans la base de données
        cursor.execute(os.environ.get('create_level_query'), (niveauIntitule,niveauPoint,))
        db.commit()

        # Récupérer l'ID du thème créé
        niveauID = cursor.lastrowid
        
        return jsonify({"niveauID": niveauID})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création d'un niveau", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la lecture d'un niveau (Read)
@level_route.route('/api/level_route/<int:niveauID>/', methods=['GET'])
def get_level(niveauID):
    
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('get_level_query'), (niveauID,))
        level = cursor.fetchone()

        if level:
            item_dict = {
                'niveauID': level[0],
                'niveauIntitule': level[1],
                'niveauPoint': level[2]
            }
            return jsonify(item_dict)
        else:
            return jsonify({"message": "Niveau non trouvé"}), 404
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération des données du theme", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
        
# Route pour la mise à jour d'un niveau (Update)
@level_route.route('/api/level_route/<int:niveauID>/', methods=['PUT'])
def update_level(niveauID):
    
    try:
        cursor = db.cursor()
        
        data = request.json  # Supposons que vous recevez des données au format JSON
        
        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400    

        niveauIntitule = data.get('niveauIntitule')
        niveauPoint = data.get('niveauPoint')

        # Validation des données d'entrée (on peut ajouter des règles de validation ici)
        if niveauIntitule is None or niveauPoint is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400
       
        # Mettre à jour les informations du joueur dans la base de données
        cursor.execute(os.environ.get('update_level_query'),(niveauIntitule,niveauPoint,niveauID))
        db.commit()
        
        if cursor._rowcount == 0:
            return jsonify({"error": "Le niveau avec l'ID spécifié n'a pas été trouvé"}), 404
        
        return jsonify({"message": "Niveau mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour du niveau", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
        
# Route pour la suppression d'un niveau (Delete)
@level_route.route('/api/level_route/<int:niveauID>/', methods=['DELETE'])
def delete_level(niveauID):
    try:
        
        cursor = db.cursor()
        # Supprimer le niveau de la base de données
        cursor.execute(os.environ.get('delele_level_query'), (niveauID,))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Le niveau avec l'ID spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "Niveau supprimé avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression du niveau", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
