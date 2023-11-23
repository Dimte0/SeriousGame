/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

export default function TablePlayer({nbPlayer, UpdateNames}) {

//state
const [prednbP, setPrednbP] =  useState(0)
const caracLength = 10
const [PlayerNames, setPlayerNames] = useState([
]);

/*useEffect(() =>{
    Init()
},[])*/ 

useEffect(() =>{
    Modif()
},[nbPlayer])




//comportements
const Init = () =>{

    const pN = [...PlayerNames]
    for(let i = 1; i< nbPlayer+1; i++){
        pN.push({id: i,nom: "Player"+i});
    }
    setPlayerNames(pN)
    return pN
}
const Add = () =>{
    const pN = [...PlayerNames]
    const i = nbPlayer
    pN.push({id: i,nom: "Player"+i});
    setPlayerNames(pN)
    UpdateNames(pN)
}

const Sub = () =>{
    const pN = PlayerNames.filter(pn => pn.id !== nbPlayer+1)
    setPlayerNames(pN)
    UpdateNames(pN)
}

const Modif = () =>{
    if(prednbP < nbPlayer) Add()
    else Sub()
    setPrednbP(nbPlayer);
    
}

const ModifTexte = (event,id) =>{
    const pN = [...PlayerNames]
    const i = pN.findIndex(ele => ele.id === id)
    if((pN[i].nom).length <= caracLength){
        pN[i].nom = event.target.value
    }
    setPlayerNames(pN)
    UpdateNames(PlayerNames)
}

const GetListe = () =>{
    PlayerNames.forEach(PlayerN => {
        console.log(`ID: ${PlayerN.id}, Nom: ${PlayerN.nom}`);
    });
    console.log({nbPlayer})
}


//render
return (
    <div id="PlayerDisplay">
        <ul>
        {PlayerNames.map((PlayerN) => (
            <li key={PlayerN.id}>
                <textarea maxLength={caracLength} onChange={(e)=>ModifTexte(e, PlayerN.id)} value={PlayerN.nom}></textarea>
            </li>
        ))}
        </ul>
    </div>
  )
}
