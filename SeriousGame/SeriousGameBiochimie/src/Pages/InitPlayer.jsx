import { useState, useEffect } from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import NameGame from '../Composant/NameGame'; 

export default function InitPlayer() {
  let PlayerData = [];
  const addData = (i,string)=>{
    PlayerData[i]= string;
    PlayerData.forEach(element => {
      console.log(element);
  });
  }
  
  function buildString(){
    let val = "dzzdzd";
    PlayerData.forEach(element => {
      console.log(element)
    });
    let link = "/page3?data="+ val
    return link;
  }

  useEffect(() => {
    // Start building the player list
    startBuild();
  }, []);
  
  const [index, EvolIndex] = useState(0);
  const IncreIndex = () =>{
    EvolIndex(index +1);
  }
  const DegremIndex = () =>{
    EvolIndex(index - 1);
  }
  //cachent les boutons, 
  function AddPlayer(){
    {InitAnPlayer()}
  }

  const InitAnPlayer = () =>{
    return(
      <div id="PlayersList">
        <div id="PlayerZone">
          <p className="Player_text">
            PLAYER {index}
          </p>
        </div>
        <button className="BM B">
            -
        </button>
        <button className="BP P" onClick={AddPlayer}>
            +
        </button>
      </div>
    )
  }

  function startBuild() {
    const PlayersListDiv = newData(0);
    document.getElementById('bottom').appendChild(PlayersListDiv);
  }

  function newData(index){
    //init
    let PlayersListDiv = document.createElement("div");
    PlayersListDiv.id = "PlayersList";
    let PlayerZone = document.createElement("div");
    PlayerZone.id = "Player";


    let par = document.createElement("textarea");
    par.className = "Player_text"; // Utilisez "className" pour attribuer des classes
    par.value = "PLAYER_" + (index + 1);
    addData(index, par.value);

    par.addEventListener("change", () => {
      addData(index, par.value);
    });
    PlayerZone.appendChild(par);

    // Init BoutonMoins
    
    let boutonMoins = document.createElement("button");
    boutonMoins.innerHTML = "-";
    boutonMoins.className = "BM B" + index; // Utilisez "className" pour attribuer des classes

    boutonMoins.addEventListener("click", () => {
        boutonMoins.remove();
        boutonPlus.remove();
        PlayerZone.remove();
        PlayerData.splice(index, 1);

        // Afficher les boutons "+" du joueur précédent (s'il existe)
        if (index > 0) {
            let previousBM = document.getElementsByClassName("BM B" + (index - 1));
            let previousBP = document.getElementsByClassName("BP P" + (index - 1));
            
            if(previousBP.length == 1) previousBP[0].style.display = "block";
            if(previousBM.length == 1) previousBM[0].style.display = "block";
        }
    });
        

    // Init BoutonPlus
    
    let boutonPlus = document.createElement("button");
    boutonPlus.innerHTML = "+";
    boutonPlus.className = "BP P" + index; // Utilisez "className" pour attribuer des classes

    boutonPlus.addEventListener("click", () => {
        boutonPlus.style.display = "none";
        boutonMoins.style.display = "none";
        let p = newData(PlayerData.length);
        let Bottom = document.getElementById("bottom");
        
        if (index === PlayerData.length - 1) {
            Bottom.appendChild(p);
        } else {
            Bottom.insertBefore(p, boutonPlus.parentElement.nextSibling);
        }
    });

    // Attribution
    PlayersListDiv.appendChild(PlayerZone);
    
    if(PlayerData.length < 8) PlayersListDiv.appendChild(boutonPlus);
    if(PlayerData.length > 1) PlayersListDiv.appendChild(boutonMoins);
    PlayerData.forEach(element => {
        console.log(element);
    });
    return PlayersListDiv;
}

  

  return (
    <div className="InitPlayers">
      <div id="MainDiv">
        <div id="top">
            <span id="img_game">
                <NameGame/>
            </span>
            <div id="RectTitle">
                <p>Ajouter Des Joueurs</p>
            </div>
        </div>
      
        <div id="bottom">

        </div>
        <footer id="foot">
          <Link to={buildString()}>
            <button id="ButtonSend">
              Send
            </button>
          </Link>
        </footer>
      </div>
    </div>
  )
}
