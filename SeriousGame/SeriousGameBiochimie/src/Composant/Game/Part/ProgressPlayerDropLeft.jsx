/* eslint-disable react/prop-types */

import { useEffect,useState } from "react"


export default function ProgressPlayerDropLeft({idPlayers}) {
  
//state
const [playersData, setPlayersData] = useState([]);
const [isOpen, setIsOpen] = useState(false);
//function

/* useEffect(()=>{
    alert(idPlayers[0])
    console.log(idPlayers)
},[idPlayers]) */

//'joueurID' 'joueurPseudo' 'joueurPoint' 'PartieID'
const GetPlayer = async (idPlayer) =>{
    try{
        const response = await fetch('http://127.0.0.1:5000/api/player_route/'+idPlayer)
        let data = await response.json()
        //if(!Array.isArray(data)) data = [data]
        console.log(data)
        return data
    } catch(e){
        console.log("HAHAHA")
        return []
    }
}
const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
    const fetchData = async () => {
        const playersPromises = idPlayers.map(async (idPlayer) => {
            return await GetPlayer(idPlayer);
        });

        const playersData = await Promise.all(playersPromises);
        setPlayersData(playersData.filter(Boolean)); // Filtrer les résultats null
    };

    fetchData();
}, [idPlayers]);
//render
return (
    <div className={`drop-left-container ${isOpen ? 'open' : ''}`}>
    <button onClick={toggleMenu}>Menu</button>
        <div id="absoluteProgressBar">
            <table border="1">
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {playersData.map((player) => (
                        <tr key={player.joueurID}>
                            <td>{player.joueurPseudo}</td>
                            <td>{player.joueurPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
