/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import QuestionPanel from "./Part/QuestionPanel";
import UnityComp from "./Part/UnityComp";

export default function Game(/*{ListPlayers}*/) {
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
    const ListPlayers = [
        {id:1, nom:"Matheo"},
        {id:2, nom:"Dimitri"}
    ]
    const Players = []
    const [mouv, setMouv] = useState(0)
    const [ListButton, setListButton] = useState([])
    const [phrase, setPhrase] = useState("")
    const [feedback, setFeedbaack] = useState("")
    const [resolvePromise, setResolvePromise] = useState(null);
    const [isQuestion, setIsQuestion] = useState(false)
    
    const [turn, setTurn] = useState(0)
    const [nbPlayer, setNbPlayer] = useState(0)
    let isWin = false
    const plateau = [0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,1,2,3,4,5,6,
                    0,7];
    
    useEffect(() =>{
        startGame()
    },[])


    //comportement Composant

    //fonction qui setter le boolean isQuestion à son inverse
    const ChangeIsQuestion = () =>{
        setIsQuestion(!isQuestion)
    }

    //comportement Logique
    //fonction qui lance le jeu
    const startGame = async () =>{
        //init
        {ListPlayers.map((element, index) => (
            Players[index] = new Joueur(index, element.nom, 0)
        ))}
        setNbPlayer(Players.length)
        while(!isWin) await Loop()
    }
    //fonction qui increment Turn
    const AddTurn = ()=>{
        setTurn(turn +1)
    }
    //fonction qui Agit selon l'évenement de la case
    const TakeEpreuve = async (casePlayer) =>{
        switch(casePlayer){
            case 0:
                console.log("multi-choix");
                return multiChoose(3);
            case 1:
                console.log("EPREUVE1")
                return await SelectedData(1);
            case 2:
                console.log("EPREUVE2")
                return await SelectedData(2);
            case 3:
                console.log("EPREUVE3")
                return await SelectedData(3);
            case 4:
                console.log("EPREUVE4")
                return await SelectedData(4);
            case 5:
                console.log("EPREUVE5")
                return await SelectedData(5);
            case 6:
                console.log("EPREUVE6")
                return await SelectedData(6);
            case 7:
                console.log("EPREUVE7")
                return null
        }
    }

    //Fonction qui Returne les différents choix de thèmes
    const multiChoose = async (nb) =>{
        let val = [];
        let pos = [1,2,3,4,5,6];
        for(let i = 0; i < nb; i++){
            let randNumber = Math.floor(Math.random() * pos.length - 1) + 1;
            val[i] = {id:i+1, text:pos[randNumber]};
            pos = pos.filter(function(item) {
                return [pos[randNumber]].indexOf(item) === -1;
            });
        }

        let sd = await QuestionEpreuve(0, val, "Choisissez une Épreuve")
        return await SelectedData(sd)
    }
    //Fonction qui va déclenche QuestionEpreuve en fonction des éléments de la question id
    const SelectedData = async (id) =>{

        //Obtenir l'élément Question correspondant à l'ID

        //listChoose est une liste qui comprendra les différents éléments de la question
        //avec un iD et un text qui est attribué à un élément de réponse
        let listChoose = [{id:1, text:"la 1"},{id:2, text:"la 2"}]

        //la Question en elle même
        let text = "Quel est la question"

        //l'Identifiant de la Réponse (donc l'id de la réponse valide inscriste dans listChoose)
        let repId = 1

        //le texte du feedback (supposition qu'il y a un seul feedback)
        let feedback = "et OUI"

        let idrep = await QuestionEpreuve(id, listChoose, text);
        if(idrep == repId){
            setIsQuestion(false)
            return(2)
        }else{
            setFeedbaack(feedback)
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

    const QuestionEpreuve = async (id, list, text) =>{

        setIsQuestion(true);
        setPhrase(text)
        const repId = 1
        setListButton(list)

        return new Promise((resolve) => {
            // Créer la fonction qui sera utilisée pour résoudre la promesse
            const resolvePromise = (idrep) => {
              console.log("Bouton pressé !");
              console.log(repId)
              resolve(idrep)
            };
        
            // Passer la fonction resolvePromise à QuestionPanel
            setResolvePromise(() => resolvePromise);
        });
    };

    const Loop = async () =>{
        AddTurn()
        setMouv(0)
        let playerTurn = Players[0]/* turn % nbPlayer */
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
            setMouv(resEpreuve)
            
        }else{
            isWin = true
            alert(playerTurn.name)
        }
        
        
    }

    //render
    return (
        <div className="Game">

            <UnityComp mouv={mouv}/>


            <div id="bottom">
                {isQuestion && 
            <QuestionPanel  
            resolvePromise={resolvePromise}
            ChangeIsQuestion={ChangeIsQuestion}
            ListButton={ListButton}
            phrase={phrase}
            feedback={feedback}/>}
            </div>
        </div>
    )
}
