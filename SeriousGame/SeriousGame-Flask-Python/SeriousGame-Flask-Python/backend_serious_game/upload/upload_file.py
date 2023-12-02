from flask import jsonify
import os

def allowed_file(filename):
    # Vérifier si l'extension du fichier est autorisée (ajustez selon vos besoins)
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions   
  
#Upload files or image (image = request.files['image'])
def uploadImage(image):
        
    try:
        # "F:\ProjetSeriousGame\SeriousGame\backend_serious_game\upload"
        # upload_folder = os.path.join("C:", "Projet_Serious_Game_Files")
        
        # Obtenez le chemin du répertoire parent du script Python actuel
        script_directory = os.path.dirname(os.path.abspath(__file__))

        # Ajoutez le reste du chemin du dossier que vous souhaitez créer
        upload_folder = os.path.join(script_directory, "Projet_Serious_Game_Files")
        
        if image and allowed_file(image.filename):
            #Create folder if not exist
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            image_path = os.path.join(upload_folder, image.filename)
            image.save(image_path) #replace the image if it exists
            #use the image_path when insert or update the image in the database
            return image_path
    except PermissionError as pe:
        print(f"Erreur de permission lors de l'enregistrement de l'image : {pe}")
    except Exception as e:
        return jsonify({"error": "Une erreur inattendue s'est produite", "details": str(e)}) 
