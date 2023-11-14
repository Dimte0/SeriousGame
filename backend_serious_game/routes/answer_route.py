from flask import Blueprint, jsonify, request
from database import db
import mysql.connector
import os

answer_route = Blueprint('answer', __name__)

# Route pour donner les reponses (Read)
@answer_route.route('/api/answer_route/<int:questionID>/', methods=['GET'])
def list_answers(questionID):
    try:
        cursor = db.cursor()
        
        cursor.execute(os.environ.get('list_answers_query'),(questionID))
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
        
        return jsonify(items_list)
    except mysql.connector.Error as e:
        return jsonify({"error": "Erreur lors de la récupération de la liste des reponses", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}), 500
    finally:
        cursor.close()  
 

#create
 
        
        
# Route pour la mise à jour d'une reponse (Update)
@answer_route.route('/api/answer_route/<int:reponseID>/', methods=['PUT'])
def update_answer(reponseID):
    try:
        
        cursor = db.cursor()
        data = request.json

        if not data:
            return jsonify({"error": "Aucune donnée JSON fournie"}), 400

        reponseIntitule = data.get('reponseIntitule')
        reponseIsCorrect = data.get('reponseIsCorrect')
        questionID = data.get('questionID')

        # Validate entry data 
        if reponseIntitule is None or reponseIsCorrect is None or questionID is None:
            return jsonify({"error": "Des champs obligatoires sont manquants dans la demande"}), 400
        
        if 'reponseImage' in request.files:
            reponseImage = request.files['reponseImage']
            
            cursor.execute(os.environ.get('answer_image_query'),(reponseID))
            answers = cursor.fetchall()
            # Path of the image to delete
            image_path = answers[0]
            # Delete file if exist
            if os.path.exists(image_path):
                os.remove(image_path)
           
            image_path = uploadImage(reponseImage)
            
            # Update answer informations in the DataBase
            cursor.execute(os.environ.get('update_answer_with_image_query'),(reponseIntitule, image_path, reponseIsCorrect, questionID, reponseID))
        else:
            # Update answer informations in the DataBase
            cursor.execute(os.environ.get('update_answer_without_image_query'),(reponseIntitule, reponseIsCorrect, questionID, reponseID))
        
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
        
     
#Upload files or image (image = request.files['image'])
def uploadImage(image):
    upload_folder = os.path.join("C:", "Projet")
    #Create folder if not exist
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    image_path = os.path.join(upload_folder, image.filename)
    try:
        image.save(image_path)
    except PermissionError as pe:
        print(f"Erreur de permission lors de l'enregistrement de l'image : {pe}")
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)})
    
    #use the image path when insert or update the image in the database
    return image_path


# Route pour la suppression d'une reponse (Delete)
@answer_route.route('/api/player_route/<int:reponseID>/', methods=['DELETE'])
def delete_answer(reponseID):
    try:
        
        cursor = db.cursor()
        
        # Delete answer into DB
        cursor.execute(os.environ.get('delete_answer_query'), (reponseID))
        db.commit()

        cursor.execute(os.environ.get('answer_image_query'),(reponseID))
        answers = cursor.fetchall()
        # Path of the image to delete
        image_path = answers[0]
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