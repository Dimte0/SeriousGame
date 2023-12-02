/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import QuestionPanel from "./Part/QuestionPanel";
import ImagePanel from "./Part/ImagePanel";
import MiddleAnimation from "./Part/MiddleAnimation";
import ProgressPlayerDropLeft from "./Part/ProgressPlayerDropLeft";
import MiddlePanel from "./Part/MiddlePanel";
import axios from 'axios'

export default function Game({ListPlayers, UpdateMouv, PrintImage, UpdateImage}) {


    //state

    let listNiveau = []
    let listTheme = []
    let idPlayers = []

    const [idP, setIdP] = useState([])
    const Q_PanelRef = useRef()
    const [isMiddleAnimation, setIsMiddleAnimation] = useState(false)
    const [ListButton, setListButton] = useState([])
    const [phrase, setPhrase] = useState("")
    const [feedback, setFeedbaack] = useState("")
    const [resolvePromise, setResolvePromise] = useState(null);
    const [isQuestion, setIsQuestion] = useState(false)
    const [isLa, setIsVisiblee] = useState(false)
    const [texte, setTexte] = useState("")
    const [isMiddlePanel, setIsMiddlePanel] = useState(false)
    let turn = 0
    const [nbPlayer, setNbPlayer] = useState(ListPlayers.length)
    let isWin = false
    const plateau = [0,1,3,2,1,4,5,3,
                    0,6,4,3,5,2,1,4,
                    0,5,6,2,1,3,4,2,
                    0,6,1,5,
                    0,6,2,7];
    
    useEffect(() =>{
        startGame()
    },[])

    const ShowImage = () =>{
        PrintImage()
    }

    const ChangeImage = (src) =>{
        console.log("Modification de l'image")
        UpdateImage(src)
        
    }

    const attendreDeuxSecondes = () =>{
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      }
    
    const PostData = async (src, data) =>{
        try{
            
            const response = await axios.post(src, data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            console.log("LA")
            console.log(response.data)
            return response.data
        }catch(error){
            console.log('Erreur de fou :', error)
        }
    }

    const PutData = async (src, data) =>{
        try{
            const response = await axios.put(src, data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            console.log("LA")
            console.log(response.data)
            return response.data
        }catch(error){
            console.log('Erreur de fou :', error)
        }
    }

    const SetData = async (src) =>{
        try{
            const response = await fetch(src)
            let data = await response.json()
            if(!Array.isArray(data)) data = [data]
            const modifiedData = data.map(item => {
                const { niveauID, niveauIntitule, ...rest } = item; // Destructuration pour extraire 'oldField'
                return { id: niveauID, text: niveauIntitule, ...rest }; // Renommer et reconstruire l'objet avec le nouveau champ
            })
            console.log(modifiedData)
            return modifiedData
        } catch(e){
            console.log("HAHAHA")
            return []
        }
    }

    const textQuestionDef = async (src) =>{
        try{
            const response = await fetch(src)
            const data = await response.json()
            const dataArray = [data]
            const modifiedData = dataArray.map(item => {
                const { questionID, questionIntitule, ...rest } = item; // Destructuration pour extraire 'oldField'
                return { id: questionID, text: questionIntitule, ...rest }; // Renommer et reconstruire l'objet avec le nouveau champ
            })
            console.log(modifiedData)
            return modifiedData
        } catch(e){
            console.log("HAHAHA")
            return []
        }
        
    };

    const ListChoiceDef = async (src) =>{
        try{
            const response = await fetch(src)
            const data = await response.json()
            //const dataArray = [data]
            console.log(data)
            const modifiedData = data.map(item => {
                const { reponseID, reponseIntitule, ...rest } = item; // Destructuration pour extraire 'oldField'
                return { id: reponseID, text: reponseIntitule, ...rest }; // Renommer et reconstruire l'objet avec le nouveau champ
            })
            console.log(modifiedData)
            return modifiedData
        } catch(e){
            console.log("HAHAHAB")
            return []
        }
    }

    const GetReponse = async (src) =>{
        try{
            const response = await fetch(src)
            const data = await response.json()
            console.log(data)
            //const dataArray = [data]
            /* const modifiedData = data.map(item => {
                const { reponseID, reponseIntitule, ...rest } = item; // Destructuration pour extraire 'oldField'
                return { id: reponseID, text: reponseIntitule, ...rest }; // Renommer et reconstruire l'objet avec le nouveau champ
            }) */
            console.log(data)
            return data
        } catch(e){
            console.log("HAHAHA")
            return []
        }
    }

    const GetTheme = async (src) =>{
        try{
            const response = await fetch(src)
            const data = await response.json()
            console.log(data)
            //const dataArray = [data]
            /* const modifiedData = data.map(item => {
                const { reponseID, reponseIntitule, ...rest } = item; // Destructuration pour extraire 'oldField'
                return { id: reponseID, text: reponseIntitule, ...rest }; // Renommer et reconstruire l'objet avec le nouveau champ
            }) */
            console.log(data)
            return data
        } catch(e){
            console.log("HAHAHADDDDD")
            return []
        }
    }

    const GetPlayer = async (src) =>{
        try{
            const response = await fetch(src)
            let data = await response.json()
            //if(!Array.isArray(data)) data = [data]
            console.log(data)
            return data
        } catch(e){
            console.log("HAHAHA")
            return []
        }
    }

    //comportement Composant

    //fonction qui setter le boolean isQuestion à son inverse

    //comportement Logique
    //fonction qui lance le jeu
    const startGame = async () =>{
        //init
        //alert(ListPlayers.length)
        let gameID = await PostData('http://127.0.0.1:5000/api/game_route/',{partieNom: 'Game2'})
        listNiveau = await SetData('http://127.0.0.1:5000/api/level_route/')
        listTheme = await GetTheme('http://127.0.0.1:5000/api/theme_route/')
        console.log(ListPlayers)

        //alert("gameID.Partie :"+gameID.PartieID)
        //alert("listNiveau :"+listNiveau)
        //alert("listThme :"+listTheme)

        {ListPlayers.map(async (element) => {
            
            let JoueurID = await PostData('http://127.0.0.1:5000/api/player_route/'+gameID.PartieID, {joueurPseudo: element.nom, joueurPoint:0})
            idPlayers.push(JoueurID.joueurID)
        })}
        setIdP(idPlayers)
        setNbPlayer(idPlayers.length/* Players.length */)
        while(!isWin) await Loop()
    }
    

    //Fonction qui Returne les différents choix de thèmes
    //TODO : Identifier les données avec leur vrai nom lorsque la table sera mise à jour (Uniquement 1 et 2)
    const multiChoose = async (nb) =>{
        let val = [];
        let pos = [1,2,3,4,5,6];
        //let pos = [1]
        for(let i = 0; i < nb; i++){
            let randNumber = Math.floor(Math.random() * (pos.length - 1)) + 1;
            console.log(randNumber)
            console.log()
            val[i] = {id:listTheme[randNumber-1].themeID, text:listTheme[randNumber-1].themeIntitule};
            pos = pos.filter(function(item) {
                return [pos[randNumber]].indexOf(item) === -1;
            });
        }

        let sd = await DrawPanelChoice(0, val, "Choisissez une Épreuve")
        Q_PanelRef.current.SettingVisible(false)
        setTexte("Épreuve :"+listTheme[sd-1].themeIntitule)
        setIsMiddleAnimation(true)
        await attendreDeuxSecondes()
        setIsMiddleAnimation(false)
        Q_PanelRef.current.SettingVisible(true)
        return await EpreuveChoose(sd);
    }
    //Fonction qui Initalise la difficulté
    const EpreuveChoose = async (id) =>{
        

        let difficulty = await DrawPanelChoice(id, listNiveau, listTheme[id-1].themeIntitule+" : Selectionnez votre niveau de difficulté")
        //setIsQuestion(false)
        Q_PanelRef.current.SettingVisible(false)
        setTexte("Difficulté :"+listNiveau[difficulty-1].text)
        setIsMiddleAnimation(true)
        await attendreDeuxSecondes()
        setIsMiddleAnimation(false)
        Q_PanelRef.current.SettingVisible(true)

        return await SelectedData(id, difficulty)
    }
    //Fonction qui récupére les données selon la difficulté et le thème chosit
    //Déclenche la fonction DrawPanelChoice
    const SelectedData = async (id, difficulty) =>{

        //Obtenir l'élément Question correspondant à l'ID

        //listChoice est une liste qui comprendra les différents éléments de la question
        //avec un iD et un text qui est attribué à un élément de réponse
        
        let textQuestion = []
        let listChoice = []     
        
        textQuestion = await textQuestionDef('http://127.0.0.1:5000/api/question_route/'+id+'/'+difficulty)
        listChoice = await ListChoiceDef('http://127.0.0.1:5000/api/answer_route/'+textQuestion[0].id)

        if(textQuestion[0].questionImage != null) ChangeImage(textQuestion[0].questionImage)
        else {
            console.log(textQuestion[0])
            //alert(textQuestion[0].questionImage)
        }

        let idrep = await DrawPanelChoice(id, listChoice, textQuestion[0].text);

        let listReponse = await GetReponse('http://127.0.0.1:5000/api/answer_route/'+textQuestion[0].id+'/'+idrep+'/'+difficulty+'/8/')


        if(listReponse.reponseIsCorrect){
            //setIsQuestion(false)
            Q_PanelRef.current.SettingVisibleTrue(idrep)
            return new Promise((resolve) => {
                // Créer la fonction qui sera utilisée pour résoudre la promesse
                const resolvePromise = () => {
                    Q_PanelRef.current.SettingVisible(false)
                    setIsQuestion(false)
                    resolve(difficulty)
                };
                
                // Passer la fonction resolvePromise à QuestionPanel
                setResolvePromise(() => resolvePromise);
            });
        }else{
            setTexte(listReponse.reponseFeedback)
            setIsMiddlePanel(true)
            Q_PanelRef.current.SettingVisibleFalse(idrep)
            //setFeedbaack(listReponse.reponseFeedback)
            return new Promise((resolve) => {
                // Créer la fonction qui sera utilisée pour résoudre la promesse
                const resolvePromise = () => {
                    setFeedbaack("")
                    setIsMiddlePanel(false)
                    Q_PanelRef.current.SettingVisible(false)
                    setIsQuestion(false)
                    resolve(0)
                };
                
                // Passer la fonction resolvePromise à QuestionPanel
                setResolvePromise(() => resolvePromise);
            });
        }
    }
    //fonction qui permet de déclencher le menu de Question
    const DrawPanelChoice = async (id, list, text) =>{

        setIsQuestion(true);
        setIsVisiblee(true)
        setPhrase(text)
        setListButton(list)

        return new Promise((resolve) => {
            // Créer la fonction qui sera utilisée pour résoudre la promesse
            const resolvePromise = async (idrep) => {
              console.log("Bouton pressé !");
              
              //setIsVisiblee(false)
              
              resolve(idrep)
            };
        
            // Passer la fonction resolvePromise à QuestionPanel
            setResolvePromise(() => resolvePromise);
        });
    };
    //fonction qui Agit selon l'évenement de la case
    const TakeEpreuve = async (casePlayer) =>{
        switch(casePlayer){
            case 0:
                console.log("multi-choix");
                return multiChoose(3);
            case 1:
                console.log("EPREUVE1")
                return await EpreuveChoose(1);
            case 2:
                console.log("EPREUVE2")
                return await EpreuveChoose(2);
            case 3:
                console.log("EPREUVE3")
                return await EpreuveChoose(3);
            case 4:
                console.log("EPREUVE4")
                return await EpreuveChoose(4);
            case 5:
                console.log("EPREUVE5")
                return await EpreuveChoose(5);
            case 6:
                console.log("EPREUVE6")
                return await EpreuveChoose(6);
            case 7:
                console.log("EPREUVE7")
                return null
        }
    }
    //fonction qui permet de gérer la boucle du jeu
    const Loop = async () =>{
        await attendreDeuxSecondes()
        turn +=1
        let id = idPlayers[(turn-1) % nbPlayer]
        //alert(id)
        let playerTurn = await GetPlayer('http://127.0.0.1:5000/api/player_route/'+id)//Players[(turn-1) % nbPlayer]/* turn % nbPlayer */
        //alert(playerTurn.joueurPseudo)
        console.log(turn)
        let casePlayer = plateau[playerTurn.joueurPoint]
        let resEpreuve = await TakeEpreuve(casePlayer)

        if(resEpreuve != null){
            if(playerTurn.joueurPoint +resEpreuve > plateau.length){
                resEpreuve = plateau.length - playerTurn.joueurPoint
            }
            //update les points
            await PutData('http://127.0.0.1:5000/api/player_route/'+id, {
                joueurPseudo: playerTurn.joueurPseudo,
                joueurPoint : playerTurn.joueurPoint +resEpreuve,
                PartieID: playerTurn.PartieID})

            console.log(playerTurn.joueurPoint)
            UpdateMouv(resEpreuve, ((turn-1) % nbPlayer) +1)
            
        }else{
            isWin = true
            //alert(playerTurn.joueurPseudo)
        }
        
        
    }

    //render
    return (
        <div id="TextPanel">

            {/* <div>
                {isQuestion &&
                <ProgressPlayerDropLeft
                idPlayers={idP}/>}
            </div> */}

            {/* <UnityComp mouv={mouv}/> */}

            <div id="middle">
                {isMiddleAnimation &&
            <MiddleAnimation
            texte={texte}/>}
            </div>

            <div id="middle">
                {isMiddlePanel &&
            <MiddlePanel
            texte={texte}/>}
            </div>

            <div id="bottom">
                {isQuestion && 
            <QuestionPanel
            ref={Q_PanelRef}
            isVisible={isLa}
            resolvePromise={resolvePromise}
            ListButton={ListButton}
            phrase={phrase}
            feedback={feedback}/>}
            </div>
            
            <div id="footer">
                {isQuestion &&
            <ImagePanel
            ShowImage={ShowImage}/>}
            </div>
        </div>
    )
}
