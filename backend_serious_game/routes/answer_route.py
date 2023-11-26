from flask import Blueprint, jsonify, request
from database import db
import sys
sys.path.append('F:/ProjetSeriousGame/SeriousGame/backend_serious_game/upload')
from upload import upload_file
import mysql.connector
import os
import random

answer_route = Blueprint('answer', __name__)

# La fonction va être appeler si le joueur trouve la bonne reponse dans answer_route 
# Route pour incrementer le point du joueur après avoir deplacer le joueur
#@player_route.route('/api/player_route/add_score/<int:joueurID>/<int:niveauID>/', methods=['POST'])
def inc_score(joueurID, niveauID):
    try:
        cursor = db.cursor()
        cursor.execute(os.environ.get('get_level_query'),(niveauID,))
        level = cursor.fetchone()
        print(level)
        if level:
            #get niveauPoint
            level_point = level[2] #get level_point in the tuple
        # Update answer information in the database
        cursor.execute(os.environ.get('increment_player_point_query'),(level_point, joueurID))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Le niveau ou le joueur avec les IDs spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "Joueur mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour du joueur", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite lors de l'ajout de point", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour donner les reponses dans l'interface utilisateur(Read)
@answer_route.route('/api/answer_route/<int:questionID>/<int:reponseID>/<int:niveauID>/<int:joueurID>/', methods=['GET'])
def check_answer(questionID, reponseID, niveauID, joueurID):
    try:
        cursor = db.cursor()
        cursor.execute(os.environ.get('list_answers_query'),(questionID,))
        answers = cursor.fetchall()
        print(answers)
        answer_list = []
        for answer in answers:
            item_dict = {
                'reponseID': answer[0],
                'reponseIntitule': answer[1],
                'reponseImage':answer[2],
                'reponseIsCorrect':answer[3],
                'reponseFeedback':answer[4],
                'questionID':answer[5]
            }
            answer_list.append(item_dict)
            print("bool value:",item_dict["reponseIsCorrect"])
            if item_dict['reponseID'] == reponseID :
                # If user has the correct answer 
                if item_dict['reponseIsCorrect']:
                    message = inc_score(joueurID, niveauID)
                    return jsonify({"reponseIsCorrect": True})
                else:
                    feedback = item_dict['reponseFeedback']
            # Player did not find the correct answer , stock the answer and give it to the player
            if item_dict['reponseIsCorrect'] == True:        
                correctAnswer = item_dict['reponseIntitule']
        
        return jsonify({"reponseIsCorrect": False, "reponseFeedback": feedback, "reponseCorrect": correctAnswer})
    
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des reponses", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close() 
        

# Route pour donner les reponses dans l'interface utilisateur(Read)
@answer_route.route('/api/answer_route/<int:questionID>/', methods=['GET'])
def list_answers(questionID):
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('list_answers_query'),(questionID,))
        answers = cursor.fetchall()
        print(answers)
        items_list = []
        for answer in answers:
            item_dict = {
                'reponseID': answer[0],
                'reponseIntitule': answer[1],
                'reponseImage':answer[2]
            }
            items_list.append(item_dict)
        random.shuffle(items_list)
        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des reponses", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  

# def allowed_file(filename):
#     # Vérifier si l'extension du fichier est autorisée (ajustez selon vos besoins)
#     allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions   
  
# #Upload files or image (image = request.files['image'])
# def uploadImage(image):
        
#     try:
#         upload_folder = os.path.join("C:", "Projet_Serious_Game_Files")
        
#         if image and allowed_file(image.filename):
#             #Create folder if not exist
#             if not os.path.exists(upload_folder):
#                 os.makedirs(upload_folder)

#             image_path = os.path.join(upload_folder, image.filename)
#             image.save(image_path) #replace the image if it exists
#             #use the image_path when insert or update the image in the database
#             return image_path
#     except PermissionError as pe:
#         print(f"Erreur de permission lors de l'enregistrement de l'image : {pe}")
#     except Exception as e:
#         return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}) 

# Route pour la création d'une question (Create)
@answer_route.route('/api/answer_route/<int:QuestionID>/', methods=['POST'])
def create_answer(QuestionID):
    
    try: 
        cursor = db.cursor()
        data = request.form 
        reponseIntitule = data.get('reponseIntitule')
        reponseIsCorrect = data.get('reponseIsCorrect')
        reponseFeedback = data.get('reponseFeedback')

        image_path = None
        if 'reponseImage' in request.files:
            reponseImage = request.files['reponseImage']
            image_path = upload_file.uploadImage(reponseImage)
            
        # Insert the new answer into the database 
        cursor.execute(os.environ.get('create_answer_query'), (reponseIntitule, image_path, reponseIsCorrect, reponseFeedback, QuestionID))
        db.commit()
        
        # Get the created answer ID
        reponseID = cursor.lastrowid

        return jsonify({"reponseID": reponseID})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la création d'une reponse", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()
        
        
# Route pour la mise à jour d'une reponse (Update)
@answer_route.route('/api/answer_route/<int:reponseID>/', methods=['PUT'])
def update_answer(reponseID):
    try:
        cursor = db.cursor()
        data = request.form # Allow flask to support form-data 

        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400

        reponseIntitule = data.get('reponseIntitule')
        reponseIsCorrect = data.get('reponseIsCorrect')
        reponseFeedback = data.get('reponseFeedback')
        questionID = data.get('questionID')

        # Validate entry data 
        if reponseIsCorrect is None or questionID is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400
        
        if 'reponseImage' in request.files:
            reponseImage = request.files['reponseImage']
            
            #Run SQL query to get answer image_path 
            cursor.execute(os.environ.get('answer_image_query'),(reponseID,))
            answers = cursor.fetchone()
            # Path of the image to delete
            image_path = answers[0]
            # Delete file if exist
            if os.path.exists(image_path):
                image_path = upload_file.uploadImage(reponseImage)
                # Update the answer information in the database
                cursor.execute(os.environ.get('update_answer_with_image_query'),(reponseIntitule, image_path, reponseIsCorrect, reponseFeedback, questionID, reponseID))
                os.remove(image_path)
           
        else:
            # Update the answer information in the database
            cursor.execute(os.environ.get('update_answer_without_image_query'),(reponseIntitule, reponseIsCorrect, reponseFeedback, questionID, reponseID))
        
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "La reponse avec l'ID spécifié n'a pas été trouvé"}), 404

        return jsonify({"message": "Reponse mis à jour avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la mise à jour du joueur", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()

# Route pour la suppression d'une reponse (Delete)
@answer_route.route('/api/answer_route/<int:reponseID>/', methods=['DELETE'])
def delete_answer(reponseID):
    try:
        
        cursor = db.cursor()
        #Run SQL query to get answer image_path 
        cursor.execute(os.environ.get('answer_image_query'),(reponseID,))
        answer = cursor.fetchone()
        # Path of the image to delete
        image_path = answer[0]
        
        # Delete answer into DB
        cursor.execute(os.environ.get('delete_answer_query'), (reponseID,))
        db.commit()

        # Delete file if exist
        if os.path.exists(image_path):
            os.remove(image_path)
        
        if cursor.rowcount == 0:
            return jsonify({"error": "La reponse avec l'ID spécifié n'a pas été trouvé"}), 404

        # Renvoyer un message de confirmation
        return jsonify({"message": "Reponse supprimée avec succès"})
    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": "Erreur lors de la suppression du thème", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()