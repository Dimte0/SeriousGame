import { useState, useEffect } from 'react';
import '../index.css'
import InitBottom from '../Composant/InitBottom';

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
let mainDiv;
export default function game({Bouge}) {
  let isBottom = false;
  let question = "";
  useEffect(() => {
    //const LP = document.currentScript.getAttribute('param1').split(',');
    startGame(["PL1"]);
  }, []);

  const MovePl = () =>{
    console.log("GRANMERE");
    Bouge();
  }

  const InitBottomOn = () =>{
    isBottom = !isBottom
  }

  const InitQuestion = (val) =>{
    question = val;
  }

  //On suppose qu'il y a uniquement 1 joueur
    async function startGame(LP){
        //init player
        let players = [];
        for(let i = 0; i < LP.length; i++){
            players[i] = new Joueur(i,LP[i],0);
        }
        let isWin = false;
        //créer le plateau

        let plateau = 
        [0,1,2,3,4,5,6,
        0,1,2,3,4,5,6,
        0,1,2,3,4,5,6,
        0,1,2,3,4,5,6,
        0,7];

        console.log("BIENVENUE sur Serious");
        

        let ine = -1;
        while(!isWin){
            ine += 1; 
            let playerTurn = ine % players.length; 
            //alert("C'est le tour de "+players[playerTurn].name);

            let casePlayer = plateau[players[playerTurn].pos];
            console.log("Le joueur est sur la case" + players[playerTurn].pos);

            let resEpreuve = await caseEvent(casePlayer); //récupére le résultat d'une épreuve (ARRAY)
            //action en cas de victoire de l'épreuve
            if(resEpreuve != null && resEpreuve[1] > 0){//VICTOIRE
                players[playerTurn].mouvPlayer(resEpreuve[1]); //BOUGE
                MovePl();
                if(players[playerTurn].pos > plateau.length - 1){
                    players[playerTurn].pos = plateau.length - 1;
                }
            }
            //retour à la case départ
            if(resEpreuve == null){
                isWin = true;
                alert("Félicitation à "+ players[playerTurn].name);
            }
            console.log(resEpreuve)
        }
    }

    async function FinalPhase(frogArray){
        let val = [1,2,3,4,5,6]
        val = val.filter(function(item) {
            return frogArray.indexOf(item) === -1;
        });

        return await CreateChoose(val);
    }

//Fonction pour définir l'épreuve choist selon l'événement de la case
    async function caseEvent(casePlayer){
        switch(casePlayer){
            case 0:
                console.log("multi-choix");
                return await multiChoose(3);
            case 1:
                console.log("EPREUVE1")
                return await questionEpreuve(1);
            case 2:
                console.log("EPREUVE2")
                return await questionEpreuve(2);
            case 3:
                console.log("EPREUVE3")
                return await questionEpreuve(3);
            case 4:
                console.log("EPREUVE4")
                return await questionEpreuve(4);
            case 5:
                console.log("EPREUVE5")
                return await questionEpreuve(5);
            case 6:
                console.log("EPREUVE6")
                return await questionEpreuve(6);
            case 7:
                console.log("EPREUVE7")
                return null;
        }
    }
//fonction qui définie la case 0 :  multi-choix
//
    async function multiChoose(numRan){
        console.log("Vous êtes sur un choix multiple");
        
        let val = [];
        let pos = [1,2,3,4,5,6];
        for(let i = 0; i < numRan; i++){
            let randNumber = Math.floor(Math.random() * pos.length - 1) + 1;
            val[i] = pos[randNumber];
            pos = pos.filter(function(item) {
                return [pos[randNumber]].indexOf(item) === -1;
            });
        }
        return await CreateChoose(val);
    }

    async function CreateChoose(val){
        //init element
        let boutonClique = initBottom(val,"Choisissez un thème parmis les TROIS");
        
        let result = await ClickButton(boutonClique);
        mainDiv.remove();
        return await questionEpreuve(result);

    }


//fonction qui va demander la difficulté choisit + afficher la question
    //Retourne l'épreuve + la réussite OU complete le joueur
    //TODO : SQL
    async function questionEpreuve(epreuve){
        console.log(epreuve);
        
        //init
        let boutonClique = initBottom(["Paris", "Moscou", "Tokyo"], "Quel est la capitale de France ?");
        let reponse = "Paris";
        let result = await ClickButton(boutonClique);
        let res = [];
        
        if(result == reponse) res = [epreuve, 2];
        else {
            let FrameClick = FeedBack("ET NON, La capitale de la France est bien Paris");
            await ClickButton(FrameClick);
            res = [epreuve, 0];
        }
        mainDiv.remove();
        return res;
    }
    
    //async function FeedBack()

    function initBottom(val, phrase){
        //init
        mainDiv = document.createElement("div");
        mainDiv.id="bottom";
        let ChooseDiv = document.createElement("div");
        ChooseDiv.id = "bottom-response-panel"
        let SentenceDiv = document.createElement("div");
        SentenceDiv.id = "bottom-question-panel";

        //init bouton
        let boutonClique = [];
        for(let i = 0; i < val.length; i++){
            let index = i;
            let bouton = document.createElement("button");
            bouton.innerText = val[i];

            //Promise
            boutonClique[i] = new Promise((resolve) => {
                bouton.addEventListener("click", () => {
                    resolve(val[index]);
                    console.log("LALALA");
                    
                    
                });
            });

            ChooseDiv.appendChild(bouton);
        }

        let par = document.createElement("p");
        par.id = "question-zone";
        par.innerText = phrase;
        SentenceDiv.appendChild(par);

        mainDiv.appendChild(ChooseDiv);
        mainDiv.appendChild(SentenceDiv);

        let body = document.getElementById("main");
        body.appendChild(mainDiv);

        return boutonClique;
    }

    function FeedBack(phrase){
        let par = document.getElementById("question-zone");
        par.innerText = par.innerHTML + "\n\n" + phrase;
        console.log("alal");
        let a = []
        a[0] = new Promise((resolve) => {
            par.addEventListener("click", () => {
                resolve(0);
            });
        });

        return a;
    }

    async function ClickButton(boutonClique){
        console.log("JATTENDS")
        try {
            const resultat = await Promise.race(boutonClique);
            console.log(resultat);
            return resultat;
        } catch (error) {
            console.error("RIP");
            return null;
        }
    }


  return (
    <div className="Game">

        <div id="main">
                  
        </div> 
    </div>
  );
}
