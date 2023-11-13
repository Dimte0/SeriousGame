import React, { useEffect, useState } from 'react'

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

export default function gameRJS() {

    let LP = ["PL1"]
    let players = [];
    for(let i = 0; i < LP.length; i++){
        players[i] = new Joueur(i,LP[i],0);
    }
    let isWin = false;
    let ine = -1
    let plateau = initPlateau()
    startGame()
    
    const initPlateau = () =>{
        return [0,1,2,3,4,5,6,
            0,1,2,3,4,5,6,
            0,1,2,3,4,5,6,
            0,1,2,3,4,5,6,
            0,7];
    }

    const DoLoop = () =>{
        ine += 1
        let playerTurn = ine % players.length; 

        let casePlayer = plateau[players[playerTurn].pos];

        let resEpreuve = caseEvent(casePlayer);
    }
    const handleEvent = () => {
      const event = new CustomEvent('mon-evenement', { detail: 'Résultat de l\'événement' });
      window.dispatchEvent(event);
    };
    
    // Écoute de l'événement dans un autre composant
    window.addEventListener('mon-evenement', (event) => {
      const resultat = event.detail;
      // Traitez le résultat ici
    });

    const caseEvent = (casePlayer) =>{
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

    const startGame = () =>{
        while(!isWin) DoLoop()
    }


    return (
        startGame()
    );
}
