from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os

question_route = Blueprint('player', __name__)

# Route pour la liste de tous les niveaux (Read)
@question_route.route('/api/question_route/<int:niveauID>/<int:themeID>', methods=['GET'])
def list_questions(niveauID, themeID):
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('list_questions_query'),(niveauID,themeID))
        questions = cursor.fetchall()
        print(questions)
        items_list = []
        for question in questions:
            item_dict = {
                'questionID': question[0],
                'questionIntitule': question[1],
            }
            items_list.append(item_dict)

        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des questions", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  