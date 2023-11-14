from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os
import random

question_route = Blueprint('question', __name__)
#used to manage redundant question
previous_questions = []

# Route pour donner les questions(Read)
@question_route.route('/api/question_route/<int:niveauID>/<int:themeID>/list', methods=['GET'])
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
                'questionFeedback': question[2]
            }
            items_list.append(item_dict)
        
        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des questions", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  
        
# Route pour donner une question choisi au hasard avec gestion de rédondance (Read)
@question_route.route('/api/question_route/<int:niveauID>/<int:themeID>', methods=['GET'])
def get_question(niveauID, themeID):
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
        #Execute the loop until we have le perfect question
        while True:
            #suffle the list
            random.suffle(items_list)
            
            #reduice length of the list to 1 in order to have one question
            reduced_list = items_list[:1]
            
            #I want to manipulate an object
            generated_question = reduced_list[0]
            if generated_question not in previous_questions:
                if len(previous_questions) >= 10 :
                    #empty the list if list length is equal to 10
                    previous_questions = []
                previous_questions.append(generated_question)
                return jsonify(generated_question)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des questions", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  

        
# Route pour la création d'une question (Create)
@question_route.route('/api/question_route/<int:niveauID>/<int:themeID>', methods=['POST'])
def create_question(themeID, niveauID):
    
    try: 
        cursor = db.cursor()
        data = request.json 
        questionIntitule = data.get('questionIntitule')

        # Insert the new player in the DB
        cursor.execute(os.environ.get('create_question_query'), (questionIntitule, questionFeedback, themeID, niveauID))
        db.commit()
        
        # Get created question ID
        questionID = cursor.lastrowid

        return jsonify({"questionID": questionID})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création de la question", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
        
# Route pour la mise à jour de la question (Update)
@question_route.route('/api/question_route/<int:questionID>/', methods=['PUT'])
def update_question(questionID):
    try:
        
        cursor = db.cursor()
        data = request.json

        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400

        questionIntitule = data.get('questionIntitule')
        themeID = data.get('themeID')
        niveauID = data.get('niveauID')

        # Validation des données d'entrée (on peut ajouter des règles de validation ici)
        if questionIntitule is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400
        
        # Mettre à jour juste l'intitulé et le Feedback
        if themeID is None or niveauID is None:
            cursor.execute(os.environ.get('update_question_2_query'),(questionIntitule, questionID))
        else:
            # Mettre à jour les informations du joueur dans la base de données
            cursor.execute(os.environ.get('update_question_query'),(questionIntitule, themeID, niveauID, questionID))
        
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "La question avec l'ID spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "La question mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour de la question", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
        
# Route pour la suppression d'une question (Delete)
@question_route.route('/api/question_route/<int:questionID>/', methods=['DELETE'])
def delete_question(questionID):
    try:
        
        cursor = db.cursor()
        
        # Supprimer la question de la base de données
        cursor.execute(os.environ.get('delete_question_query'), (questionID,))
        db.commit()
        
        if cursor.rowcount == 0:
            return jsonify({"error": "La question avec l'ID spécifié n'a pas été trouvé"}), 404

        # Renvoyer un message de confirmation
        return jsonify({"message": "Question supprimé avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression de la question", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()