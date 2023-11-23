/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import QuestionPanel from "./Part/QuestionPanel";
import ImagePanel from "./Part/ImagePanel";

export default function Game({ListPlayers, UpdateMouv, PrintImage}) {

    const ehehe = false
    //class
    class Joueur {
        constructor(id, name, pos) {
          this.id = id;
          this.name = name;
          this._pos = pos;
        }
      
        mouvPlayer(deplacement) { 
          this._pos += deplacement;
        }
      
        get pos() {
          return this._pos;
        }
      
        set pos(position) {
          this._pos = position;
        }
      }


    //state

    let listNiveau = []
    let listTheme = []



    const Players = []
    
    const [ListButton, setListButton] = useState([])
    const [phrase, setPhrase] = useState("")
    const [feedback, setFeedbaack] = useState("")
    const [resolvePromise, setResolvePromise] = useState(null);
    const [isQuestion, setIsQuestion] = useState(false)
    
    let turn = 0
    const [nbPlayer, setNbPlayer] = useState(ListPlayers.length)
    let isWin = false
    const plateau = [0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,7];
    
    useEffect(() =>{
        startGame()
    },[])

    const ShowImage = () =>{
        PrintImage()
    }

    const attendreDeuxSecondes = () =>{
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
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

    //comportement Composant

    //fonction qui setter le boolean isQuestion à son inverse

    //comportement Logique
    //fonction qui lance le jeu
    const startGame = async () =>{
        //init
        alert(ListPlayers.length)
        listNiveau = await SetData('http://127.0.0.1:5000/api/level_route/')
        listTheme = await GetTheme('http://127.0.0.1:5000/api/theme_route/')
        console.log(ListPlayers)
        {ListPlayers.map((element, index) => (
            Players[index] = new Joueur(index, element.nom, 0)
        ))}
        setNbPlayer(Players.length)
        while(!isWin) await Loop()
    }
    

    //Fonction qui Returne les différents choix de thèmes
    //TODO : Identifier les données avec leur vrai nom lorsque la table sera mise à jour (Uniquement 1 et 2)
    const multiChoose = async (nb) =>{
        let val = [];
        /* let pos = [1,2,3,4,5,6]; */
        let pos = [1]
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
        return await EpreuveChoose(sd);
    }
    //Fonction qui Initalise la difficulté
    const EpreuveChoose = async (id) =>{
        let difficulty = await DrawPanelChoice(id, listNiveau, listTheme[id-1].themeIntitule+" : Selectionnez votre niveau de difficulté")
        //setIsQuestion(false)
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

        let idrep = await DrawPanelChoice(id, listChoice, textQuestion[0].text);

        let listReponse = await GetReponse('http://127.0.0.1:5000/api/answer_route/'+textQuestion[0].id+'/'+idrep+'/'+difficulty+'/8/')


        if(listReponse.reponseIsCorrect){
            setIsQuestion(false)
            return(2)
        }else{
            setFeedbaack(listReponse.reponseFeedback)
            return new Promise((resolve) => {
                // Créer la fonction qui sera utilisée pour résoudre la promesse
                const resolvePromise = () => {
                    setFeedbaack("")
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
        setPhrase(text)
        setListButton(list)

        return new Promise((resolve) => {
            // Créer la fonction qui sera utilisée pour résoudre la promesse
            const resolvePromise = (idrep) => {
              console.log("Bouton pressé !");
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
        let playerTurn = Players[(turn-1) % nbPlayer]/* turn % nbPlayer */
        //alert(playerTurn.name)
        console.log(turn)
        let casePlayer = plateau[playerTurn.pos]
        let resEpreuve = await TakeEpreuve(casePlayer)

        if(resEpreuve != null){
            if(playerTurn.pos +2 > plateau.length){
                resEpreuve = plateau.length - playerTurn.pos
            }
            playerTurn.mouvPlayer(resEpreuve)
            console.log(playerTurn.pos)
            UpdateMouv(resEpreuve, playerTurn.id +1)
            
        }else{
            isWin = true
            alert(playerTurn.name)
        }
        
        
    }

    //render
    return (
        <div id="TextPanel">
            {/* <UnityComp mouv={mouv}/> */}


            <div id="bottom">
                {isQuestion && 
            <QuestionPanel  
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
